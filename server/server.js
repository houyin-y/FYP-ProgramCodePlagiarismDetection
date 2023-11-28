const express = require('express')
const cors = require('cors');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const { spawn } = require('child_process')


// create Express application
const app = express()

// immplement cors and json on the app
app.use(cors())
app.use(express.json())

// Function to delete all files in a directory
const deleteFilesInDirectory = (directory) => {
	fs.readdirSync(directory).forEach((file) => {
		const filePath = path.join(directory, file)

		// Check if it is a file (not a directory)
		if (fs.statSync(filePath).isFile()) {
			// Delete the file
			fs.unlinkSync(filePath)
		}
	});
};

// Function to check if the directory contains any files
const directoryHasFiles = (directory) => {
	const files = fs.readdirSync(directory);
	return files.length > 0;
};


// multer config for .py files
let zipFileName = ''

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(__dirname, 'uploads')

		// ensure 'uploads' directory exists
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir)
		}

		// Check if the directory has any files before attempting to delete
		if (directoryHasFiles(uploadDir)) {
			deleteFilesInDirectory(uploadDir);
		}


		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		zipFileName = Date.now() + '-' + file.originalname			// Rename to avoid duplicates

		cb(null, zipFileName)
	},
});

const upload = multer({ storage: storage })


// handle file upload for .py files
app.post('/upload', upload.single('file'), (req, res) => {

	// checks if file is uploaded 
	if (!req.file) {
		return res.status(400).json({ success: false, error: 'No file uploaded' })
	}

	// check content of the .zip file
	const zip = new AdmZip(req.file.path)

	// check each file for .py extension
	const hasNonPythonFile = zip.getEntries().some((entry) => {
		const fileExtension = entry.entryName.split('.').pop();

		if (fileExtension !== 'py') {
			// Return a JSON response and indicate that a non-Python file was found
			res.status(400).json({ success: false, error: 'Hey.... that\'s not python!' });
			return true; // Stop iterating
		} else {
			// This will be executed only for Python files
			console.log('Python found! AAAAAA');
			return false; // Continue iterating
		}
	});


	if (!hasNonPythonFile) {
		// run Python script using a child process (spawn)
		const zipFilePath = './uploads/' + zipFileName
		const algoPath = '../algorithm/main.py'

		const pythonProcess = spawn('python', [algoPath, zipFilePath])

		// collect the output (results and corpus) of the script into a variable 
		let pythonOutput = ''
		let corpus = ''

		pythonProcess.stdout.on('data', (data) => {
			// split the output into lines, where lines = (pythonOutput | corpus )
			const lines = data.toString().split('corpus: ')
			pythonOutput = lines[0]

			corpus = lines[lines.length - 1]

			console.log(`\nPython script output (pythonOutput): ... \n${pythonOutput}`)
			console.log(`Python script output (corpus): ... ${corpus}`)
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		pythonProcess.on('error', (err) => {
			console.error(`Failed to start subprocess: ${err}`);
		});

		// close the python process
		pythonProcess.on('close', (code) => {
			console.log(`Python script exited with code ${code}`)

			if (code === 0) {
				res.json({ success: true, pythonOutput, corpus })
			} else {
				res.json({ success: false, pythonOutput: null, corpus: null })
			}
		});
	}

})


// multer config for code exclusion

const storageExcl = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(__dirname, 'uploads/code_exclusion/')

		// ensure 'uploads' directory exists
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir)
		}

		// Check if the directory has any files before attempting to delete
		if (directoryHasFiles(uploadDir)) {
			deleteFilesInDirectory(uploadDir);
		}

		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		zipFileName = Date.now() + '-' + file.originalname			// Rename to avoid duplicates

		cb(null, zipFileName)
	},
});

// handle file upload for code exclusion
const uploadExcl = multer({ storage: storageExcl })


// handle file submission for code exclusion
app.post('/uploadExcl', uploadExcl.single('file'), (req, res) => {

	// checks if file is uploaded 
	if (!req.file) {
		return res.status(400).json({ success: false, error: 'No file uploaded' })
	}

	// check content of the .zip file
	const zip = new AdmZip(req.file.path)

	// check each file for .py extension
	zip.getEntries().forEach((entry) => {
		const fileExtension = entry.entryName.split('.').pop()

		if (fileExtension !== 'py') {
			return res.status(400).json({ success: false, error: 'Hey.... that\'s not python!' })
		} else {
			// hehe I'll keep this as an easter egg! :D
			console.log('Python found! AAAAAA')
		}
	})

	// run Python script using a child process (spawn)
	const zipFilePath = './uploads/code_exclusion/' + zipFileName
	const algoPath = '../algorithm/codeExclusion.py'

	const pythonProcess = spawn('python', [algoPath, zipFilePath])

	pythonProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	pythonProcess.on('error', (err) => {
		console.error(`Failed to start subprocess: ${err}`);
	});

	// close the python process
	pythonProcess.on('close', (code) => {
		console.log(`Python script exited with code ${code}`)

		if (code === 0) {
			res.json({ success: true })
		} else {
			res.json({ success: false })
		}
	});
})


app.listen(8000, () => {
	console.log('Server is running on port 8000 at http://localhost:8000');
});