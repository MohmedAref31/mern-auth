import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between p-3 bg-slate-500 text-slate-100">
      <h3 className="text-2xl capitalize font-bold"><Link to={'/'}>mern auth</Link></h3>

      <ul className="flex gap-3 flex-1 justify-center text-lg font-semibold capitalize">
        <li><Link to={'/'}>home</Link></li>
        <li><Link to={'/about'}>about</Link></li>
        <li><Link to={'/login'}>login</Link></li>
      </ul>
    </div>
  );
}
