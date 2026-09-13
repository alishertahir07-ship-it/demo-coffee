const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {

    let filePath = "." + req.url;

    if (filePath === "./") {
        filePath = "./index.html";
    }

    const extname =
        path.extname(filePath).toLowerCase();

    const contentTypes = {

        ".html": "text/html",

        ".css": "text/css",

        ".js": "text/javascript",

        ".jpg": "image/jpeg",

        ".jpeg": "image/jpeg",

        ".png": "image/png",

        ".webp": "image/webp",

        ".svg": "image/svg+xml"

    };

    const contentType =
        contentTypes[extname] ||
        "application/octet-stream";


    fs.readFile(filePath, (error, content) => {

        if (error) {

            if (error.code === "ENOENT") {

                res.writeHead(404, {
                    "Content-Type": "text/html"
                });

                res.end("404 - Page not found");

            } else {

                res.writeHead(500);

                res.end(
                    "Server error"
                );

            }

            return;

        }


        res.writeHead(200, {

            "Content-Type":
                contentType

        });


        res.end(content);

    });

});


server.listen(PORT, () => {

    console.log(
        `Coffee&Co running at http://localhost:${PORT}`
    );

});