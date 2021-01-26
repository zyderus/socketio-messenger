const express = require("express");
const socket = require("socket.io");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const server = app.listen(3000, () => { console.log("server running on port 3000") });

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log(`made socket: ${socket.id} connection`);

  // Handle chat events
  socket.on('chat', data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

});