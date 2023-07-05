import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCr37zkky2URXBqfnlAyuj_p2SXTp1W8sk",
  authDomain: "reportando-a0852.firebaseapp.com",
  projectId: "reportando-a0852",
  storageBucket: "reportando-a0852.appspot.com",
  messagingSenderId: "550907488638",
  appId: "1:550907488638:web:d492618bea3e7ba4e7eb2f",
  measurementId: "G-PYHFHRB717"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)