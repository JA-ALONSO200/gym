import Logo from "../assets/logo.png";
import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
function Register() {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        console.log('Elemento que disparó el evento:', e.target); 

        setFormData({
            ...formData,
            [name]: value 
        });
    };
    async function createUser (data) {
        const { name, password } = data;
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { username : name, password: password });
            console.log('Respuesta del servidor:', response);
            alert('Usuario creado exitosamente');
            navigate('/'); 
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            if (error.response) {
                console.error(error.response.data || 'Error en el servidor');
            } else {
                console.error('No se pudo conectar con el servidor');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (formData.name === "" || formData.password === "") {
            alert("El Campo Nombre o Contraseña Estan Vacios.");
        } else {
            createUser (formData); 
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
                <h1 className="title text-center mt-3">Registrase </h1> <br />
                <p className="text-black text-center">Ingrese los Datos que le Pedimos.</p>
                {/* <div className="col-10 mt-3 ms-3">
                    <label htmlFor="nombreCompleto" className="subtitle">Nombre Completo:<strong className="requiered">*</strong></label>
                    <input 
                        type="text"name="nombreCompleto" id="nombreCompleto" placeholder="Ingrese su Nombre Completo" className="form-control" value={formData.nombreCompleto} onChange={handleInputChange} required />
                </div> */}
                <div className="col-10 mt-3 ms-3">
                    <label htmlFor="usuario" className="subtitle">Usuario:<strong className="requiered">*</strong></label>
                    <input 
                        type="text" name="name" id="usuario" placeholder="Ingrese su Usuario" className="form-control" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-10 mb-2 ms-3">
                    <label htmlFor="contraseña" className="subtitle">Contraseña:<strong className="requiered">*</strong></label>
                    <input 
                        type="password" name="password" id="contraseña" placeholder="Ingrese su Contraseña" className="form-control" value={formData.password} onChange={handleInputChange} required />
                </div>
                <p class="ms-3 subtitle">Ya tienes Cuenta?</p>
                <Link to="/" className="text-dark nav registrar ms-3">Login</Link>
                <center><button className="btn btn-dark mb-3">Registrarse</button></center>
            </form>
        </div>
    </div>
</div>
  )
}

export default Register