import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Algún campo está vacío.");
      return;
    }

    const { name, password } = formData;

    try {
      console.log('Enviando datos de inicio de sesión:', formData);
      const response = await axios.post('http://localhost:8080/api/auth/login', { username: name, password: password });

      localStorage.setItem('authToken', response.data);

      alert('Login exitoso');
      navigate('/Clientes'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response) {
        setError(error.response.data || 'Error en el servidor');
      } else {
        setError('No se pudo conectar con el servidor');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-xs-12 col-12 col-sm-12 col-md-8 col-lg-10 col-xl-8 d-flex justify-content-center card-primary mt-200">
        <div className="col-6">
          <img src={Logo} alt="Logo" width={"100%"} className="mt-5" />
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1 className="title text-center mt-3">Login</h1> <br />
            <p className="text-black text-center">Inicie sesión con su cuenta.</p>

            {error && <div className="alert alert-danger text-center me-3">{error}</div>}

            <div className="col-10 mt-3 ms-3">
              <label htmlFor="usuario_correo" className="subtitle">
                Usuario:<strong className="requiered">*</strong>
              </label>
              <input
                type="text"
                name="name"
                id="usuario_correo"
                placeholder="Ingrese su Usuario"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-10 mb-2 ms-3">
              <label htmlFor="contraseña" className="subtitle">
                Contraseña:<strong className="requiered">*</strong>
              </label>
              <input
                type="password"
                name="password"
                id="contraseña"
                placeholder="Ingrese su Contraseña"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="ms-3 subtitle">¿No tienes cuenta?</p>
            <Link to="/Registrar" className="text-dark nav-link registrar ms-3">
              Registrarse
            </Link>
            <center>
              <button type="submit" className="btn btn-dark mb-3">
                Iniciar sesión
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
