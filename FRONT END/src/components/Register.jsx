import Logo from "../assets/logo.png";
import { useState } from "react";
import "../styles/Login.css";
import { Link } from 'react-router-dom';
function Register() {
    
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        nombreCompleto: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        console.log('Elemento que disparó el evento:', e.target); 

        setFormData({
            ...formData,
            [name]: value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(formData.name == "" || formData.name == null && formData.password == "" || formData.password == null ||  formData.nombreCompleto == "" || formData.nombreCompleto == null){
            alert("El Campo Nombre o Contraseña Estan Vacios.");
        }else{
            
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
                <div className="col-10 mt-3 ms-3">
                    <label htmlFor="nombreCompleto" className="subtitle">Nombre Completo:<strong className="requiered">*</strong></label>
                    <input 
                        type="text"name="nombreCompleto" id="nombreCompleto" placeholder="Ingrese su Nombre Completo" className="form-control" value={formData.nombreCompleto} onChange={handleInputChange} required />
                </div>
                <div className="col-10 mt-3 ms-3">
                    <label htmlFor="usuario" className="subtitle">Usuario:<strong className="requiered">*</strong></label>
                    <input 
                        type="text"name="name" id="usuario" placeholder="Ingrese su Usuario" className="form-control" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="col-10 mb-2 ms-3">
                    <label htmlFor="contraseña" className="subtitle">Contraseña:<strong className="requiered">*</strong></label>
                    <input 
                        type="password" name="password" id="contraseña" placeholder="Ingrese su Contraseña" className="form-control" value={formData.password} onChange={handleInputChange} required />
                </div>
                <p class="ms-3 subtitle">Ya tienes Cuenta?</p>
                <Link to="/" className="text-dark nav-link registrar ms-3">Login</Link>
                <center><button className="btn btn-dark mb-3">Registrarse</button></center>
            </form>
        </div>
    </div>
</div>
  )
}

export default Register