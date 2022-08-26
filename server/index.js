require("dotenv").config();

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const ImageModel = require("./models/Image");
const { uploadFile, getFileStream } = require("./s3");
const bodyParser = require('body-parser');
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const vehicleRouter = require("./routes/vehicles");
var fileupload = require("express-fileupload");

const connectDB = async () => {
  // console.log('accesskey',process.env.AWS_SECRET_KEY )
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mz3bo.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Mongoose Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

// Storage

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path)
  console.log(result);
  res.send({ imagePath: `/images/${result.Key}` });
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/vehicles", vehicleRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});


