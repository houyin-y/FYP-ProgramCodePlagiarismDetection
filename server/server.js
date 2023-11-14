const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

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
app.post('/upload', upload.array('files'), (req, res) => {

	// checks if file is uploaded 
	if (!req.files || req.files.length === 0) {
		return res.status(400).json({ success: false, error: 'No file uploaded' })
	}

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