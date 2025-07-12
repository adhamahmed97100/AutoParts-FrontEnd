importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAtxBlXbktsYinFT-ubAAHdH8pX0xotzHU",
  authDomain: "chat-3afa0.firebaseapp.com",
  projectId: "chat-3afa0",
  storageBucket: "chat-3afa0.firebasestorage.app",
  messagingSenderId: "213036366957",
  appId: "1:213036366957:web:7163e1647998532cd11364",
  measurementId: "G-GM49HM2W8V",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );
  const notificationTitle = payload.notificationTitle || "Default Title";
  const notificationOptions = {
    body: payload.data?.message || "Default Message",
    icon: payload.data?.imageUrl || "/default-icon.png",
    badge: payload.data?.imageUrl || "/default-badge.png",
    data: { url: payload.data?.url || "/" },
    requireInteraction: true,
    silent: false,
    tag: "notification",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
