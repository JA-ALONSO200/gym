import Login from './components/Login';
import Register from './components/Register'
import NotFound from './components/NotFound';
import Clientes from './components/Clientes';
import ClienteView from './views/ClienteView';
import './styles/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  
  const token = localStorage.getItem('authToken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return (
    <div className="App">
      <Router> 
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/Registrar" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Clientes" element={<Clientes />} />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
