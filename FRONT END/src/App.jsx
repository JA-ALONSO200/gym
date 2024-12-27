import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Clientes from './components/Clientes';
import Empleados from './components/Empleados';
import Dashboard from './components/Dashboard';
import './styles/bootstrap.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Responsable from './components/Responsable';
import ProtectedRoute from './components/common/ProtectedRoute';
import Equipos from './components/Equipos';

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
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Empleados"
          element={
            <ProtectedRoute>
              <Empleados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Responsable"
          element={
            <ProtectedRoute>
              <Responsable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Equipos"
          element={
            <ProtectedRoute>
              <Equipos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
