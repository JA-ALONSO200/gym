import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Login.css";
import Navbar from './Navbar';

function TableUser() {
    const [Datos, setDatos] = useState([]);
    const [responsable, setResponsable] = useState([]);
    const [currentClient, setCurrentClient] = useState(null); 
    const [currentCliente, setCurrentCliente] = useState({
      nombre: '',
      cedula: '',
      telefono: '',
      correoElectronico: '',
      idResponsable: '',
      edad: '',
      estatura: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
  
    useEffect(() => {
      async function buscarDatos() {
        setIsLoading(true);
        try {
          const response = await axios.get("http://localhost:8080/api/clientes");
          const data = response.data;
          setDatos(data || []);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
          console.error("Error al obtener los datos:", error);
        } finally {
          setIsLoading(false);
        }
      }
      const buscarResponsable = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/responsables");
          const data = response.data;
          setResponsable(data || []);
          console.log(data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } finally {
          setIsLoading(false); 
        }
      };
      buscarDatos();
      buscarResponsable();
    }, []);
  
    const formatearFecha = (Fecha) => {
      const FechaF = new Date(Fecha);
      const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      
      const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(FechaF);
      const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(FechaF);
  
      return `${fechaFormateada} - Hora: ${horaFormateada}`;
    };
  
    const eliminarCliente = async (e) => {
      const clienteId = e.currentTarget.value;
    
      if (window.confirm(`Desea Eliminar el Cliente No. ${clienteId}`)) {
        try {
          await axios.delete(`http://localhost:8080/api/clientes/${clienteId}`);
          alert(`Cliente No. ${clienteId} Eliminado con Exito.`);
          const response = await axios.get("http://localhost:8080/api/clientes");
          setDatos(response.data || []);
        } catch (error) {
          alert("Hubo un error al eliminar el cliente.");
          console.error(error);
        }
      }
    };
  
    const abrirModal = (cliente) => {
      setCurrentClient(cliente); 
      setIsModalOpen(true); 
    };
  
    const cerrarModal = () => {
      setIsModalOpen(false);
      setCurrentClient(null);
    };
  
    const abrirModal2 = () => {
      setIsModalOpenTwo(true); 
      setCurrentCliente({ 
        nombre: '',
        cedula: '',
        telefono: '',
        correoElectronico: '',
        responsable: '',
        edad: '',
        estatura: '',
      });
    };
  
    const cerrarModal2 = () => {
      setIsModalOpenTwo(false); 
      setCurrentCliente(null); 
    };
  
    const actualizarCliente = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:8080/api/clientes/${currentClient.idCliente}`, currentClient);
        setDatos(prevDatos => prevDatos.map(cliente =>
          cliente.idCliente === currentClient.idCliente ? {
            ...cliente,
            ...currentClient, 
          } : cliente
        ));
        alert(`Cliente No. ${currentClient.idCliente} actualizado con éxito.`);
        cerrarModal(); 
      } catch (error) {
        alert("Hubo un error al actualizar el cliente.");
        console.error(error);
      }
    };
  
    const agregarCliente = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/clientes", currentCliente); 
        alert(`Nuevo Cliente agregado con éxito.`);
        setIsModalOpenTwo(false);
        const response = await axios.get("http://localhost:8080/api/clientes");
        setDatos(response.data || []); 
      } catch (error) {
        alert("Hubo un error al agregar el cliente.");
        console.log(error.response ? error.response.data : error);
      }
    };
  
    const manejarCambio = (e) => {
      const { name, value } = e.target;
      setCurrentClient({
        ...currentClient,
        [name]: value,
      });
    };
  
    const manejarCambios = (e) => {
      const { name, value } = e.target;
      setCurrentCliente({
        ...currentCliente,
        [name]: value,
      });
    };
  
    return (
      <div className="container-fluid">
        <Navbar />
        <center><p className="title">Lista de Clientes</p></center>
        <h1 className="title fs-4 text-center">Bienvenido {localStorage.getItem("User")}, Al Modulo de Clientes</h1>
        <div className="d-flex justify-content-end">
          <button className="btn-lg btn btn-success me-5 mb-3" name="añadir_usuario" onClick={abrirModal2}><i className="bi bi-person-add"></i></button>
        </div>
  
        {isLoading ? (
          <div className="loading-indicator text-center subtitle">Cargando...</div> 
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-info">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Cedula</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Estatura</th>
                  <th scope="col">Responsable</th>
                  <th scope="col">Fecha de Creacion</th>
                  <th scope="col">Fecha de Actualizacion</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Datos && Datos.length > 0 ? (
                  Datos.map((cliente) => (
                    <tr key={cliente.idCliente}>
                      <td className="text-center">{cliente.idCliente}</td>
                      <td className="text-center">{cliente.nombre}</td>
                      <td className="text-center">{cliente.cedula}</td>
                      <td className="text-center">{cliente.telefono}</td>
                      <td className="text-center">{cliente.correoElectronico}</td>
                      <td className="text-center">{cliente.edad}</td>
                      <td className="text-center">{cliente.estatura}</td>
                      <td className="text-center">{cliente.responsable?.idResponsable || 'No asignado'}</td>
                      <td className="text-center">{formatearFecha(cliente.createdAt)}</td>
                      <td className="text-center">{formatearFecha(cliente.updatedAt)}</td>
                      <td>
                        <center>
                          <button
                            className="btn btn-danger me-xl-3 me-lg-3 me-xxl-3 mb-xs-2 mb-me-2 mb-sm-2 mb-md-0 mb-lg-0 mb-0"
                            value={cliente.idCliente}
                            onClick={eliminarCliente}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <button
                            className="btn btn-warning"
                            value={cliente.idCliente}
                            onClick={() => abrirModal(cliente)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        </center>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
  
        {isModalOpen && currentClient && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Editar Cliente</h5>
                </div>
                <form onSubmit={actualizarCliente}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentClient.nombre || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentClient.cedula || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentClient.telefono || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentClient.correoElectronico || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Edad</label>
                      <input
                        type="number"
                        className="form-control"
                        name="edad"
                        value={currentClient.edad || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                    <label className="subtitle">Responsable</label>
                      {responsable && responsable.length > 0 && (
                        <select
                          className="form-control"
                          name="responsable"
                          value={currentCliente.responsable || ''}
                          onChange={manejarCambios}
                        >
                          <option value="">Seleccionar...</option>
                          {responsable.map((responsable) => (
                            <option key={responsable.idResponsable} value={responsable.idResponsable}>
                              {`${responsable.nombre} - ${responsable.idResponsable}`}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Estatura</label>
                      <input
                        type="text"
                        className="form-control"
                        name="estatura"
                        value={currentClient.estatura || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={cerrarModal}>Cerrar</button>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {isModalOpenTwo && currentCliente && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Añadir Cliente</h5>
                </div>
                <form onSubmit={agregarCliente}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentCliente.nombre || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentCliente.cedula || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentCliente.telefono || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentCliente.correoElectronico || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Edad</label>
                      <input
                        type="number"
                        className="form-control"
                        name="edad"
                        value={currentCliente.edad || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Responsable</label>
                      {responsable && responsable.length > 0 && (
                        <select
                          className="form-control"
                          name="responsable"
                          value={currentCliente.responsable || ''}
                          onChange={manejarCambios}
                        >
                          <option value="">Seleccionar...</option>
                          {responsable.map((responsable) => (
                            <option key={responsable.idResponsable} value={responsable.idResponsable}>
                              {`${responsable.nombre} - ${responsable.idResponsable}`}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Estatura</label>
                      <input
                        type="text"
                        className="form-control"
                        name="estatura"
                        value={currentCliente.estatura || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={cerrarModal2}>Cerrar</button>
                    <button type="submit" className="btn btn-primary">Añadir Cliente</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default TableUser;
  