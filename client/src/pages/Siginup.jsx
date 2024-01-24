import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'



export default function Siginup() {
  const [formData, setFormData] = useState({});
//   const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChanges = (e) => {
    e = e.target;
    setFormData({ ...formData, [e.name]: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.success) {
        notify("user created successfully", "success");
        navigate('/login')
      }else{
        notify(data.data.message,"error")
      }
      console.log(data);
    } catch (e) {
    //   setError(e);
      notify(e.message, "error");
    } finally {
      setLoading(false);
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
        sign up
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg my-3 mx-auto"
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
        />
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
        <button
          type="submit"
          className="bg-slate-800 rounded-md p-2 text-slate-100 capitalize text-lg font-semibold active:opacity-90 disabled:opacity-50"
        >
          {loading ? "loading..." : "join us"}
        </button>

      </form>
      <p className="max-w-lg mx-auto capitalize">
        already have an acount.{" "}
        <span className="text-blue-600 underline">
          <Link to={'/login'}>signin</Link>
        </span>
      </p>
    </div>
  );
}
