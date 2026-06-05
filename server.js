const http = require("http");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");
const fs = require('fs/promises');
const { handlerCom } = require('./commands');

const PORT = 3000;
const getLocalIp = () => {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }

    return 'localhost';
}

const sendFile = async (filePath, res, contentType) => {
    try {
        const data = await fs.readFile(filePath);
        res.setHeader("Content-Type", contentType);
        res.statusCode = 200;
        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.end('Server-side error');
    }
}
const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === 'GET' && req.url === '/') {
        await sendFile(
            path.join(__dirname, "public", "index.html"),
            res,
            'text/html; charset=utf-8'
        );
    } else if (req.method === 'POST' && req.url === '/api/command') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {

            const parsedData = JSON.parse(body);
            console.log(parsedData)
            handlerCom(parsedData.command);

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true}));

            } catch(err) {

            res.statusCode = 404;
            res.end("Ошибка")

            }
        });

    }
});

server.listen(PORT, "0.0.0.0")
console.log(`Сервер был запущен на адресе http://${getLocalIp()}:${PORT}`);