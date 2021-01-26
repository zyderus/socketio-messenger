// Make connection
const socket = io.connect('http://localhost:3000');
// Query DOM
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");
const handle = document.querySelector("#handle");
const message = document.querySelector("#message");
const btn = document.querySelector("#send");

// Emit Events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
});

socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});