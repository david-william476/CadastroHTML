// =======================================
// FIREBASE
// =======================================

// Importa o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =======================================
// CONFIGURAÇÃO DO FIREBASE
// =======================================

const firebaseConfig = {

    apiKey: "AIzaSyAm9-wyYhDt9D51iaoBop2Z8EbFTQVOauw",

    authDomain: "cadastrohtml-2a75e.firebaseapp.com",

    projectId: "cadastrohtml-2a75e",

    storageBucket: "cadastrohtml-2a75e.firebasestorage.app",

    messagingSenderId: "321289848446",

    appId: "1:321289848446:web:719b8f8e60463785123a2f"

};


// =======================================
// INICIALIZA O FIREBASE
// =======================================

const app = initializeApp(firebaseConfig);


// =======================================
// BANCO DE DADOS
// =======================================

const db = getFirestore(app);


// =======================================
// EXPORTA TUDO
// =======================================

export {

    db,

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    doc,

    updateDoc,

    getDoc,

    query,

    where

};