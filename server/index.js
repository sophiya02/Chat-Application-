const express = require("express");
require('dotenv').config()
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connect = require('./db/db')
const Route = require("./router/route");
const GoogleRoute = require("./router/google-route");
const TwitterRoute = require("./router/twitter-route");
const GithubRoute = require("./router/github-route");
const ChannelRoute = require("./router/channel");
const SearchRoute = require("./router/search");
const passport = require("passport");
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const io_conn = require("./controller/socket-connection")
const AuthenticationMiddleware = require('./middleware/authentication')
const ErrorHandlerMiddleware = require("./middleware/errorHandler");
const {createAdapter} = require('@socket.io/mongo-adapter');
const  mongoose = require("mongoose");
const COLLECTION = "socket.io-adapter-events";

const port = 3000;
const app = express();
const server = createServer(app);
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   res.append('Access-Control-Allow-Credentials', true);
//   next();
// });


// app.use('/api/v1/auth', router)


//The IO is our server instance
//The server instance deals with all the connections of client and server; consider it as an instance of the complete connection
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:4200",
//   }
// });


const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
// app.use(cookieParser());
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 60*60*1000*3,
    },
  })
);
// app.get('/log-session', (req, res) => {
//   // Access session details
//   const sessionId = req.sessionID;
//   const sessionCookie = req.headers.cookie;
//   const sessionData = req.session;

//   // Log details
//   console.log('Session ID:', sessionId);
//   console.log('Session Cookie:', sessionCookie);
//   console.log('Session Data:', sessionData);

//   res.send('Session details logged. Check the console.');
// });
// const logSessionCount = (req, res, next) => {
//   console.log('Number of active sessions:', Object.keys(req.sessionStore.sessions).length);
//   next();
// };

// Use the middleware for all routes
// app.use(logSessionCount);

// app.use(passport.initialize());
// app.use(passport.session());
io_conn(server);
app.get('/', (req, res) =>{
  res.send('welcome to chat app')
})

app.use((req, res, next)=>{
  if(req.user){
    io_conn(server);
  }
  next()
})

app.use("/api/v1/auth", Route);




// app.use("/api/v1/auth/google", GoogleRoute);
// app.use("/api/v1/auth/github", GithubRoute);
// app.use("/api/v1/auth/twitter", TwitterRoute);


// Use the middleware for all routes
// app.use(logSessionCount);

app.use("/api/v1/channel", AuthenticationMiddleware, ChannelRoute )
app.use("/api/v1/search", SearchRoute)


app.use(ErrorHandlerMiddleware);


start= async ()=>{
  try{
    await connect(process.env.MONGO_URI);
    // const mongoCollection = mongoose.connection.collection(COLLECTION)
    // mongoCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600, background: true  });
    // io.adapter(createAdapter(mongoCollection))
    server.listen(port, ()=> {
      console.log(`server is listening on port ${port}`);
    })
    // app.listen(port,()=>{
    //   console.log(`server is listening on port ${port}`);
    // })
  }
  catch(err){
    console.log(err)
  }

}
start();
