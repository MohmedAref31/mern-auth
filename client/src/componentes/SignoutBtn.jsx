import { useDispatch, useSelector } from "react-redux";
import {  signoutStart, signoutSuccess } from "../redux/slices/userSlice";
export default function SignoutBtn() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      console.log(res);
      if (res.ok === true) dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignout}
      className="bg-red-700 py-1 px-3 text-slate-50 font-semibold rounded-md flex items-center gap-1"
    >
      sign out
      {loading && (
        <span className=" animate-spin w-4 h-4  inline-block border-2 border-b-transparent border-slate-50 rounded-full"></span>
      )}
    </button>
  );
}
