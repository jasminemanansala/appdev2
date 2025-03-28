const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const EventEmitter = require("events");

class FileEvent extends EventEmitter {}
const fileEvent = new FileEvent();

const PORT = 3000;
const DIRECTORY = path.join(__dirname, "files");

// Ensure the directory exists
if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
}

// Event Listeners
fileEvent.on("fileCreated", (filename) => console.log(`File created: ${filename}`));
fileEvent.on("fileDeleted", (filename) => console.log(`File deleted: ${filename}`));

const handleFileOperations = http.createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const filePath = path.join(DIRECTORY, query.filename || "");

    if (pathname === "/create" && query.filename) {
        fs.writeFile(filePath, "New file created!", (err) => {
            if (err) return res.end("Error creating file.");
            fileEvent.emit("fileCreated", query.filename);
            res.end(`File ${query.filename} created.`);
        });
    } else if (pathname === "/read" && query.filename) {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return res.end("Error reading file.");
            res.end(`Content of ${query.filename}: ${data}`);
        });
    } else if (pathname === "/update" && query.filename && query.content) {
        fs.appendFile(filePath, `\n${query.content}`, (err) => {
            if (err) return res.end("Error updating file.");
            res.end(`File ${query.filename} updated.`);
        });
    } else if (pathname === "/delete" && query.filename) {
        fs.unlink(filePath, (err) => {
            if (err) return res.end("Error deleting file.");
            fileEvent.emit("fileDeleted", query.filename);
            res.end(`File ${query.filename} deleted.`);
        });
    } else {
        res.end("Invalid request.");
    }
});

const server = http.createServer(handleFileOperations);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
