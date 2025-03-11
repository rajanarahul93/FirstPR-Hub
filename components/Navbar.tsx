import { signInWithGoogle, logOut, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-3xl">FirstPR Hub 🛠️</h1>
      {user ? (
        <button onClick={logOut} className="bg-red-500 px-4 py-2 rounded cursor-pointer">
          Logout
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
