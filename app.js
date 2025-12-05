const http = require("http");
const { url } = require("inspector");
const WebSocketServer = require("websocket").server;

const connections = {};

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


wsServer.on('request', (request) => {
    console.log("request recieved", request.resource.replace("/", ""));
    const connection = request.accept(null);
    console.log("request accepted");

    connection.on("message", (message) => {
        console.log("message", message);
        switch (message.type) {
            case "utf8":
                const jsonMessage = JSON.parse(message.utf8Data);
                console.log(`message to ${connections[jsonMessage.userId]}`);
                
                if(connections[jsonMessage.userId] && connections[jsonMessage.userId].connected) {
                    console.log(`message from ${connections[jsonMessage.userId].connected}`);
                    connections[jsonMessage.userId].send(jsonMessage.content);
                }

                break;
            case "binary":
                connection.send(message.binaryData);
                break;
        
            default:
                break;
        }
    });

    connections[request.resource.replace("/", "")] = connection;
    console.log(Object.keys(connections));
    
})




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