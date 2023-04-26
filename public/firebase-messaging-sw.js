importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyDh637XzsNHu2v5RPwlxwznenM74EOu73U",
    authDomain: "push-app-be4be.firebaseapp.com",
    projectId: "push-app-be4be",
    storageBucket: "push-app-be4be.appspot.com",
    messagingSenderId: "294321336790",
    appId: "1:294321336790:web:9e5deccf2cd9a4a15c3477",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

console.log("init sw");
