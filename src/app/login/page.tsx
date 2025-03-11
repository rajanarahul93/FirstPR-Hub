"use client";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../lib/firebase";

export default function Login() {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <button
        onClick={handleLogin}
        className="bg-blue-500 px-6 py-3 rounded shadow-md"
      >
        Sign in with Google
      </button>
    </div>
  );
}
