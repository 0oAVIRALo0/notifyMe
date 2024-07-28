const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { sendNotification } = require("./utils/sendNotification");
const admin = require("./utils/firebaseAdminInitialisation");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.post("/notifyAndroid", (req, res) => {
  const { registrationToken, title, body } = req.body;
  sendNotification(registrationToken, title, body, res);
});

app.post("/notifyWeb", (req, res) => {
  const { registrationToken, title, body } = req.body;
  sendNotification(registrationToken, title, body, res);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
