import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { startSignin, signinFaild, signinSuccess } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../componentes/OAuth";


export default function Login() {
  const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
const {loading, error} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleChanges = (e) => {

    e = e.target;
    setFormData({ ...formData, [e.name]: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startSignin())
    try {
      let res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.success) {
        notify("login successfully", "success");
        dispatch(signinSuccess(data.data))
        navigate('/')
      }else{
        dispatch(signinFaild(data.data.message))
      }
      console.log(data);
    } catch (e) {
        dispatch(signinFaild(e))
    } 
  };

  const notify = (msg, title) =>
  Swal.fire({
    title: title,
    text: msg,
    icon: title
  });
  return (
    <div>
      <h3 className="text-center text-3xl capitalize font-semibold my-5">
        login
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg my-3 mx-auto"
      >
      
        <input
          type="email"
          name="email"
          placeholder="email"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
        />
        <p className="capitalize text-sm text-red-700 font-bold">{error ? error || "something went wrong" : ""}</p> 
        <button
          type="submit"
          className="bg-slate-800 rounded-md p-2 text-slate-100 capitalize text-lg font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "loading..." : "login"}
        </button>
        <OAuth/>
      </form>
      <p className="max-w-lg mx-auto capitalize">
        dont have an acount.{" "}
        <span className="text-blue-600 underline">
          <Link to={'/sign-up'}>sign up</Link>
        </span>
      </p>
    </div>
  );
}
