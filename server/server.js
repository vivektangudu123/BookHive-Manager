const express = require("express");
const cors = require("cors");
const corsOptions = {
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5002;

const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const issuesRoute = require("./routes/issuesRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/reports", reportsRoute);
app.get('/', (req, res) => {
  logger.info('Transaction Home OK');
  res.send("hello it/s running")
})

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => console.log(`Node server started at ${port}`));
