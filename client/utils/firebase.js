import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebaseInitialisation";

const messaging = getMessaging(app);

const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_WEB_VAPID_KEY_PAIR,
      });
      if (token) {
        console.log("Current token for client: ", token);
        return token; // or send it to your server if needed
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { requestForToken, onMessageListener, app };
