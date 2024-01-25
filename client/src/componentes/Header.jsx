import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between p-3 bg-slate-500 text-slate-100">
      <h3 className="text-2xl capitalize font-bold">
        <Link to={"/"}>mern auth</Link>
      </h3>

      <ul className="flex gap-3 flex-1 justify-end items-center text-sm font-semibold capitalize">
        <li>
          <Link to={"/"}>home</Link>
        </li>
        <li>
          <Link to={"/about"}>about</Link>
        </li>
        <li>
          {currentUser ? (
            <Link to={"/profile"} className="flex items-center gap-1">
              <img
                src={currentUser.profilePicture}
                className="w-7 h-7 rounded-full"
              />
              <span>{currentUser.username}</span>
            </Link>
          ) : (
            <Link to={"/login"}>login</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
