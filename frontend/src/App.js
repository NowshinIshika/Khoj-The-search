import {BrowserRouter, Routes, Route} from 'react-router-dom'


//components:
import Home from './Pages/home'
// import Navbar from "./components/Navbar"
import Landing from "./Pages/Landing"
import Signup from "./Pages/signup"
import Login from "./Pages/login"
import Profile from "./Pages/profile"
function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <div className="Pages">
        <Routes>
          <Route  path = "/" 
          element={<Landing />} 
            />
            <Route path="/auth/signup"
            element ={<Signup />} />
            <Route path='/auth/login'
            element ={<Login />} />
            <Route path ='/home'
            element ={<Home />} />
            <Route path ='/userprofile/:id'
            element ={<Profile />} />
            <Route path='/auth/change-password'
            element ={<Profile />}/>

        </Routes>

      </div>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
