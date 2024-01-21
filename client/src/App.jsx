import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Siginup from './pages/Siginup'
import Login from './pages/Login'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<Siginup/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  )
}
