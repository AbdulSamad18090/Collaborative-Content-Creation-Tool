import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update } from "firebase/database"; // Import Realtime DB functions

const firebaseConfig = {
  apiKey: "AIzaSyAzC0ErRP_3qGX7GLsAaSnn54yd2UCzvaE",
  authDomain: "contentcollab-4ab98.firebaseapp.com",
  projectId: "contentcollab-4ab98",
  databaseURL: "https://contentcollab-4ab98-default-rtdb.firebaseio.com",
  storageBucket: "contentcollab-4ab98.firebasestorage.app",
  messagingSenderId: "172788792685",
  appId: "1:172788792685:web:cd7479aa0b6267d0c66e64",
  measurementId: "G-WGR2LT3PL2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // Get the database reference

export { database };
