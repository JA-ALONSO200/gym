import "../styles/Login.css";
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container d-flex justify-content-center">
        <div className="col-12">
            <p class="title-nofound text-center mt-200">404</p>
            <p class="title text-center mt-5">Lo Siento no Pudimos Encontrar La Direccion que nos dio.</p>

            <center><button class="btn btn-dark mt-5"> <center><Link to="/" className="nav-link registrar">Regresar</Link></center> </button></center>
        </div>
    </div>
  )
}

export default NotFound