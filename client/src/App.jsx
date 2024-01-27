import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Siginup from "./pages/Siginup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./componentes/Header";
import { useSelector } from "react-redux";

export default function App() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={currentUser?<Navigate to ={'/'}/>:<Outlet/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Siginup />} />
        </Route>
       
        <Route element={currentUser?<Outlet/>:<Navigate to={'/login'}/>}>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
