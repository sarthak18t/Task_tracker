import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
