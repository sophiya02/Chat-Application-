// Create a new channel
// Select a channel and get added as a member of the channel
// See all the members of the Channel
// Send a message
// See other people messages
const SocketIo = require("socket.io");

const jwt = require("jsonwebtoken");

const io_conn = (server) => {
  const io = SocketIo(server, {
    cors: {
      origin: "http://localhost:4200",
    },
  });

  // console.log("io")
  // the Socket however, deals with the connection of single client
  // the actions can be performed for this specific client only

  // io.on("connection", (socket) => {
  //   console.log("socket created", socket.id);
  //   const token = socket.handshake.query.token; // jwt token passed from client

  //   // authenticate
  //   try {
  //     if (!token) throw new Error("Token not found");
  //     jwt.verify(token, process.env.JWT_SECRET);
  //   } catch (err) {
  //     // jwt verification failed
  //     console.log(err);
  //     socket.emit("authFailed"); // emits event to client to let client know authentication failed, optional.
  //     socket.disconnect(); // disconnect client
  //   }

  //   socket.on("disconnect", () => {
  //     console.log("A client disconnected");
  //   });
  // });

  io.on("connection", (socket) => {
    // console.log("socket created", socket);
    console.log("socket created", socket.id);
    // console.log("socket created", socket.handshake.query);
    socket.on("sendMsg", (data) => {
      console.log("data", data);
      emitMsg(data);
    });

  ///////////////////////
  // no of online users
  ////////////////////////
    noOnlineUsers = io.engine.clientsCount;
    console.log("no of online Users:", noOnlineUsers);
  });

  const emitMsg = (data) => {
    io.emit("receiveMsg", data);
  };
};

module.exports = io_conn;
