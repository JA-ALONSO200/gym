import { Dropdown } from 'react-bootstrap';
import { useEffect } from 'react';
import Logo from "../../assets/logo.png";
import "../../styles/Navbar.css";
import "../../styles/Login.css";

function Navbar() {
  useEffect(() => {
    const toggleButton = document.getElementById('button-hide');
    const menu = document.getElementById('menu');

    if (toggleButton && menu) {
      const handleClick = () => {
        menu.classList.toggle('d-none');
      };

      toggleButton.addEventListener('click', handleClick);

      return () => {
        toggleButton.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a href="/Dashboard">
              <img src={Logo} alt="Dashboard Logo" width="70px" />
            </a>
          </li>
        </ul>
        <button id="button-hide" className="bg-transparent border border-light d-lg-none"> 
          <i className="bi bi-list fs-1"></i> 
        </button>
        <ul className="navbar-nav d-lg-flex d-none justify-content-center">
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Clientes">Clientes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Empleados">Empleados</a>
          </li>
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Responsable">Responsables</a>
          </li>
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Equipos">Equipos</a>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-circle"></i> {localStorage.getItem('User')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="/">Cerrar Sesion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>

      <div>
        <ul id="menu" className="nav d-flex justify-content-center flex-column d-none">
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Clientes">Clientes</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Empleados">Empleados</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Responsable">Responsables</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Equipos">Equipos</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-circle"></i> {localStorage.getItem('User')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="/">Cerrar Sesion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Navbar;
