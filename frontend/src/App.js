import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import AddTask from './pages/AddTask'
import Navbar from './components/Navbar';
import { useState } from 'react';
function App() {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("auth")!== null);
  return (
    <div className="App">
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated}/>
     <Router>
      <Routes>
        <Route path='/' element={<DashBoard authenticated={authenticated} setAuthenticated={setAuthenticated}/>}/>
        <Route path='/login' element={<HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
        <Route path='/addTask' element = {<AddTask/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
