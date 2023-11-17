const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const { spawn } = require('child_process')


// create Express application
const app = express();

// immplement cors and json on the app
app.use(cors());
app.use(express.json());

// multer configurations
let zipFileName = ''

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(__dirname, 'uploads');

		// ensure 'uploads' directory exists
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}

		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		zipFileName = Date.now() + '-' + file.originalname			// Rename to avoid duplicates

		cb(null, zipFileName); 	
	},
});

const upload = multer({ storage: storage })

// handle file upload
app.post('/upload', upload.single('file'), (req, res) => {

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
	const zipFilePath = './uploads/' + zipFileName
	const algoPath = '../algorithm/main.py'

	const pythonProcess = spawn('python', [algoPath, zipFilePath]);

	
	// collect the output of the script into a variable (dataToSend)
	/*
		THIS PART, NEED TO ACCEPT MORE OUTPUT
		AS OF NOW I THINK IT ONLY ACCEPTS ONE LINE OF OUTPUT
		
	*/
	pythonProcess.stdout.on('data', (data) => {
		console.log(`Python script output: ${data}`);
		dataToSend = data.toString()
	});

	// error handling
	pythonProcess.stderr.on('data', (data) => {
		console.error(`Python script error: ${data}`);
	});

	// close the python process
	pythonProcess.on('close', (code) => {
		console.log(`Python script exited with code ${code}`);
		
		// Respond to the client, indicating success or failure
		res.json({ success: true });
		//res.send(dataToSend)

		// can either res.json or res.send only; error given is Cannot set headers after they are sent to the client
	});
	
})


app.listen(8000, () => {
	console.log('Server is running on port 8000 at http://localhost:8000');
});