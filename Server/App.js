const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();
const cors = require("cors");
const expressValidator = require("express-validator");  
const passport = require("passport");
require("dotenv").config();
const path = require("path");

const connectToDB = require("./config/dbConnection");

//App
const App = express();
const http = require("http").createServer(App); 


//debugger  
connectToDB(); 

//middleware  
App.use(morgan("dev"));   
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// App.use(upload.array("photo" || "avatar", 5));

App.use(express.static("public"));
App.use(cookieParser());
App.use(expressValidator());
App.use(cors("*"));

// view engine setup
App.set("views", path.join(__dirname, "views"));
App.set("view engine", "ejs");

//routes middleware

App.get("/", (req, res) =>
  res.json({ message: "Welcome to LenX! - By Victor Alvarez" })
);
App.use("/api", require("./routes/auth"));
App.use("/api", require("./routes/user"));
App.use("/api", require("./routes/category"));
App.use("/api", require("./routes/product"));  
App.use("/api", require("./routes/braintree"));
App.use("/api", require("./routes/order"));
App.use("/api", require("./routes/chat"));
App.use("/api", require("./routes/manufacturer"));
App.use("/api", require("./routes/skills"));
App.use("/api", require("./routes/review"));
App.use("/api", require("./routes/message"));
App.use("/api", require("./routes/conversation"));
App.use("/api", require("./routes/blog"));
App.use("/api", require("./routes/subCategory"));
App.use("/api", require("./routes/question"));
App.use("/api", require("./routes/productReview"));
App.use("/api", require("./routes/applyToBecomeSeller"));
App.use("/api", require("./routes/location"));

App.get('/api/config/paypal', (req, res) => {
  console.log(process.env.PAYPAL_CLIENT_ID)
  res.send(process.env.PAYPAL_CLIENT_ID);
});
  
  
// Initialise passport middleware
App.use(passport.initialize());
require("./middlewares/jwt")(passport);

const port = process.env.PORT || 4000;

const server = http.listen(port, () => {
  console.log(`Server hosted on: http://localhost:${port}`);
});


const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
} );


const { setSocket } = require("./config/socketConfig");

// Sets the configuration for socket io
setSocket(io);  

   