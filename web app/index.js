/* // Importing express
const express = require('express')

// Creating instance of express
const app = express();

// Handling GET / Request
app.get('/', function (req, res) {
	res.send("Hello World! I am server created by express :D");
})

// Listening to server at port 3000
app.listen(3000, function () {
	console.log("server started");
})  */

// printing tests (7th minute)
//const { readFile, readFileSync } = require('fs');
//const txt = readFileSync('./hello.txt', 'utf8');
/* 1- uses sync to read file
 * sync === blocking; finish all of the work, before the other codes can run 
console.log(txt)

console.log('do this ASAP')
*/

/* 2- uses callback function to read file
 * prints 'do this ASAP' first, then only read txt file

readFile('./hello.txt', 'utf8', (err, text) => {
	console.log(txt)
})

console.log('do this ASAP')
*/

/* 3- promise based solution to read file (asynchronous and non-blocking)
const { readFile } = require('fs').promises;

async function hello(){
	const file = await readFile('./hello.txt', 'utf8');
}
*/

const express = require('express');

const app = express();

const { readFile } = require('fs').promises;



app.get('/', async (request, response) => {
	response.send(await readFile('./home.html', 'utf8'));
});


app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))