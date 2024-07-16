const express = require('express');

const path = require('path');
const { connectToMongoDb } = require('./connect');
const URL = require('./models/url');
const cokkieParser = require('cookie-parser')
const { checkForAuthentication, restrictTo } = require('./middleware/auth')

// routs 

const urlRoute = require('./routes/url')
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 8001;

app.set("view engine", 'ejs')
app.set("views", path.resolve("./views"))


// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   })
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication)


// app.get("/test", (req, res) => {
//   return res.end('<h1> Hello from Server </h1>')
// })

connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("MongoDB connected"))

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));