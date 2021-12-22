import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,


    // apiKey: "AIzaSyBhVxz-C3Gv_dDEc2psrpbCLkc_jHu7V_Q",
    // authDomain: "super-car-lambo.firebaseapp.com",
    // projectId: "super-car-lambo",
    // storageBucket: "super-car-lambo.appspot.com",
    // messagingSenderId: "507086435551",
    // appId: "1:507086435551:web:09d5d5927ade4b0f1aa56a"
};

// Initialize Firebase
const initAuthentication = () => {
    return initializeApp(firebaseConfig);
}
export default initAuthentication;