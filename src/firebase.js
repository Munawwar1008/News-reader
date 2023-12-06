
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBncm_ZQ49Jgk_2dzUx2GPUf1n6x5LX5AY",
    authDomain: "news-reader-2dbf9.firebaseapp.com",
    projectId: "news-reader-2dbf9",
    storageBucket: "news-reader-2dbf9.appspot.com",
    messagingSenderId: "926667563104",
    appId: "1:926667563104:web:e7391ea3d748d2f9a9a305",
    measurementId: "G-QZ1EVC16GK",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
