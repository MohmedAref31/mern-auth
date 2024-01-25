import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {signinSuccess} from '../redux/slices/userSlice.js'

export default function OAuth() {
    const dispatch = useDispatch()

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const google = await signInWithPopup(auth, provider);
      console.log(google);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: google.user.displayName,
          email: google.user.email,
          profilePicture: google.user.photoURL,
        }),
      });
      const data = await res.json()
      console.log(data)
      dispatch(signinSuccess(data.data))
      
    } catch (error) {
      console.log("googel auth error : " + error.message);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      type="button"
      className="p-3 bg-red-700 rounded-lg capitalize text-slate-50 font-bold hover:opacity-90"
    >
      continue with google
    </button>
  );
}
