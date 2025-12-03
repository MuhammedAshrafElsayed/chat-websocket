const http = require("http");
const WebSocketServer = require("websocket").server;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});

server.listen(3000, () => {
    console.log('HTTP server is running on port 3000');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});







// const wsServer = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
//     // Put logic here to detect whether the specified origin is allowed
//     return true;
// }

// wsServer.on('request', (request) => {
//     if (!originIsAllowed(request.origin)) {
//         request.reject();
//         console.log(`Connection from origin ${request.origin} rejected.`);
//         return;
//     }
    
//     const connection = request.accept(null, request.origin);
//     console.log(`Connection accepted from ${request.origin}`);
    
//     connection.on('message', (message) => {
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
//             // Echo the message back to the client
//             connection.sendUTF(message.utf8Data);
//         } else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             // Echo the binary message back to the client
//             connection.sendBytes(message.binaryData);
//         }
//     });
    
//     connection.on('close', (reasonCode, description) => {
//         console.log(`Peer ${connection.remoteAddress} disconnected.`);
//     });
    
//     connection.on('error', (error) => {
//         console.log('Connection error: ' + error.toString());
//     });
// });