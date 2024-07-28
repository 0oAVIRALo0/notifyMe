const admin = require("./firebaseAdminInitialisation");

const sendNotification = (registrationToken, title, body, res) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.status(200).send({ success: true, messageId: response });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(500).send({ success: false, error: error.message });
    });
};

module.exports = { sendNotification };
