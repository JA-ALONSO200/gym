import { Dropdown } from 'react-bootstrap';
import { useEffect } from 'react';
import Logo from "../../assets/logo.png";

function Navbar() {
  useEffect(() => {
    const toggleButton = document.getElementById('button-hide');
    const menu = document.getElementById('menu');

    if (toggleButton && menu) {
      const handleClick = () => {
        menu.classList.toggle('d-none');
        if (menu.classList.contains('d-none')) {
        } else {
          menu.classList.remove('d-none');

        }
      };

      toggleButton.addEventListener('click', handleClick);

      return () => {
        toggleButton.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between justify-content-sm-center justify-content-xs-center justify-content-md-center justify-content-lg-between justify-content-xl-between"> 
        <ul className="navbar nav justify-content-start">
          <li className="nav-item">
            <img src={Logo} alt="" width="70px" />
          </li>
        </ul>
        <button id="button-hide" className="bg-transparent border border-light d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-block"> <i class="bi bi-list fs-1"></i> </button>
        <ul className="nav-bar nav d-xxl-flex d-xl-flex d-lg-flex d-md-none d-sm-none d-none justify-content-center">
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Clientes">Clientes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Empleados">Empleados</a>
          </li>
          <li className="nav-item">
            <a className="nav-link subtitle text-dark" href="/Responsables">Responsables</a>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-circle"></i> {localStorage.getItem('User')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
      <div>
        <ul id="menu" className="hidden nav-bar nav d-flex justify-content-center flex-column d-none">
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Clientes">Clientes</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <a className="nav-link subtitle text-dark" href="/Empleados">Empleados</a>
          </li>
          <li className="nav-item text-center bg-body-secondary">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-circle"></i> {localStorage.getItem('User')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
