import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axiosInstance from "../../scripts/axiosInstance";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tomagotcchi.firebaseapp.com",
    projectId: "tomagotcchi",
    storageBucket: "tomagotcchi.firebasestorage.app",
    messagingSenderId: "872351739464",
    appId: "1:872351739464:web:750f0de1c757cab986327d",
    measurementId: "G-FJEJTZSJ7J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tomagotchi, setTomagotchi] = useState()

    const getTomagotchi = (user) => {
        axiosInstance.get(`/tomagotchi/${user.uid}`)
        .then((res) => {
            setTomagotchi(res.data)
        })
    }

    const newTomagotchi = (user) => {
        axiosInstance.put(`/tomagotchi/${user.uid}`)
        .then((res) => {
            setTomagotchi(res.data)
        })
    }

    const feedTomagotchi = () => {
        const time = Date.now() / 1000

        axiosInstance.put(`/tomagotchi/${user.uid}/${time}`)
        .then((res) => {
            setTomagotchi(res.data)
        })
    }

    useEffect(() => {
        if (user) {
            axiosInstance.get(`/user/${user.uid}/${user.email}`)
            .then((res)  => {
                console.log(res.data)
            })
            getTomagotchi(user)
        }
    }, [user])

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user); 
        } catch (error) {
            console.error("Google Sign-In Error", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout, tomagotchi, feedTomagotchi, newTomagotchi }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}