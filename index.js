const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);

app.get("/",(req,res)=>{
    res.send("Welcome to file uploader...")
})

// enable enviromental vars
require("dotenv").config();

app.use(cors());

app.use("/upload", express.static(__dirname + "/public/images"));

// Uploading...
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("new-image"), (req, res) => {
  console.log("REQ : ", __dirname, req.file.path);
  res.send({ path: req.file.path });
});

let port = process.env.PORT || 3005;
server.listen(port, function() {
  console.log("DB Server has started on port no : " + port);
});
module.exports = app;
