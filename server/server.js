const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

// create Express application
const app = express();

app.use(cors());
app.use(express.json());

// multer configurations
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
		cb(null, Date.now() + '-' + file.originalname); // Rename to avoid duplicates
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
	const zipFilePath = req.file.path
	const zip = new AdmZip(zipFilePath)

	// check each file for .py extension
	zip.getEntries().forEach((entry) => {
		const fileExtension = entry.entryName.split('.').pop()

		if (fileExtension !== 'py') {
			return res.status(400).json({ success: false, error: 'Hey.... that\'s not python!' })
		} else {
			console.log('Python found! AAAAAA')
		}
	})


	res.json({ success: true })

	/*
	// Run Python script using a child process
	const pythonProcess = spawn('python', ['path/to/your/script.py', arg1, arg2]);

	pythonProcess.stdout.on('data', (data) => {
		console.log(`Python script output: ${data}`);
	});

	pythonProcess.stderr.on('data', (data) => {
		console.error(`Python script error: ${data}`);
	});

	pythonProcess.on('close', (code) => {
		console.log(`Python script exited with code ${code}`);
		// Respond to the client, indicating success or failure
		res.json({ success: true });
	});
	*/
})


app.listen(8000, () => {
	console.log('Server is running on port 8000 at http://localhost:8000');
});