const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.send("Welcome to file uploader...");
});

// enable enviromental vars
require("dotenv").config();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use("/images", express.static(__dirname + "/public"));

// Uploading...
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("new-image"), (req, res) => {
  console.log("REQ : ", req.file.path);
  res.send({ path: req.file.filename});
});

let port = process.env.PORT || 3005;
server.listen(port, function() {
  console.log("DB Server has started on port no : " + port);
});
module.exports = app;
