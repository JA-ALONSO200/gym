import React, { useEffect, useState } from 'react';
import EmpleadoService from '../../services/EmpleadoService';
import "../../styles/bootstrap.css";
import Navbar from './Navbar';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentEmpleado, setCurrentEmpleado] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    correoElectronico: '',
    tipoEmpleado: '',
    horarioLaboral: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);


  const abrirModal = (empleados) => {
    setCurrentEmpleado(empleados); 
    console.log(empleados);
    setIsModalOpen(true); 
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setCurrentEmpleado(null);
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data = await EmpleadoService.getEmpleados();
        setEmpleados(data);
      } catch (error) {
         console.error('Error al obtener empleados:', error);
        setError('No se pudo obtener la lista de empleados');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  const eliminarEmpleado = async (e) => {
    const clienteId = e.target.value;
  
    if (window.confirm(`Desea Eliminar el Cliente No. ${clienteId}`)) {
      try {
        await EmpleadoService.deleteEmpleado(clienteId);
        alert('Empleado eliminado correctamente');
        setEmpleados(await EmpleadoService.getEmpleados());
      } catch (error) {
        alert("Hubo un error al eliminar el cliente.");
        console.error(error);
      }
    }
  };

  const actualizarEmpleado= async (e) => {
    e.preventDefault();
    try {
      await EmpleadoService.updateEmpleado(currentEmpleado.idEmpleado, currentEmpleado);
      alert('Empleado actualizado correctamente');
      setIsModalOpen(false);
      setEmpleados(await EmpleadoService.getEmpleados());
    } catch (error) {
      alert("Hubo un error al actualizar el cliente.");
      console.error(error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  
  const formatearFecha = (Fecha) => {
    const FechaF = new Date(Fecha);
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(FechaF);
    const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(FechaF);

    return `${fechaFormateada} - Hora: ${horaFormateada}`;
  };

  const manejarCambio = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setCurrentEmpleado({
      ...currentEmpleado,
      [name]: value,
    });
  };
  const abrirModal2 = () => {
    setIsModalOpenTwo(true); 
    setCurrentEmpleado({ 
      nombre: '',
      cedula: '',
      telefono: '',
      correoElectronico: '',
      tipoEmpleado: '',
      horarioLaboral: ''
    });
  };

  const cerrarModal2 = () => {
    setIsModalOpenTwo(false); 
    setCurrentEmpleado(null); 
  };

  const manejarCambios = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setCurrentEmpleado({
      ...currentEmpleado,
      [name]: value,
    });
  };

  const agregarCliente = async (e) => {
    e.preventDefault();
    try {
      await EmpleadoService.createEmpleado(currentEmpleado);
      alert('Empleado agregado correctamente');
      setIsModalOpenTwo(false);
      setEmpleados(await EmpleadoService.getEmpleados());
    } catch (error) {
      alert("Hubo un error al agregar el cliente.");
      console.error(error.response ? error.response.data : error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="title fs-4 text-center">Bienvenido {localStorage.getItem("User")}, Al Modulo de Empleados</h1>
      <ul>
          <div className="table-responsive">
          <h2 className='title text-center'>Lista de Empleados</h2>
          <div class="d-flex justify-content-end"><button className="btn btn-success mb-3 me-5" onClick={abrirModal2}>Añadir Empleado</button></div>
          <table className="table table-bordered">
            <thead className="table-info">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cedula</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th scope="col">Tipo de Empleado</th>
                <th scope="col">Horario Laboral</th>
                <th scope="col">Fecha de Creacion</th>
                <th scope="col">Fecha de Actualizacion</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados && empleados.length > 0 ? (
                empleados.map((empleado) => (
                  <tr key={empleado.idEmpleado}>
                    <td className="text-center">{empleado.idEmpleado}</td>
                    <td className="text-center">{empleado.nombre}</td>
                    <td className="text-center">{empleado.cedula}</td>
                    <td className="text-center">{empleado.telefono}</td>
                    <td className="text-center">{empleado.correoElectronico}</td>
                    <td className="text-center">{empleado.tipoEmpleado}</td>
                    <td className="text-center">{empleado.horarioLaboral}</td>
                    <td className="text-center">{formatearFecha(empleado.createdAt)}</td>
                    <td className="text-center">{formatearFecha(empleado.updatedAt)}</td>
                    <td>
                      <center>
                        <button
                          className="btn btn-danger me-3"
                          value={empleado.idEmpleado}
                          onClick={eliminarEmpleado}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          value={empleado.idEmpleado}
                          onClick={() => abrirModal(empleado)}
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
        
      </ul>

      {isModalOpen && currentEmpleado && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Editar Cliente</h5>
                </div>
                <form onSubmit={actualizarEmpleado}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentEmpleado.nombre || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentEmpleado.cedula || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentEmpleado.telefono || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentEmpleado.correoElectronico || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Tipo de Empleado</label>
                      <select
                        className="form-control"
                        name="tipoEmpleado"
                        value={currentEmpleado.tipoEmpleado || ''}
                        onChange={manejarCambio}> 
                        <option value="ADMINISTRATIVO">Administrativo</option>
                        <option value="INSTRUCTOR">Instructor</option>
                        <option value="LIMPIEZA">Limpieza</option>
                        <option value="MANTENIMIENTO">Mantenimiento</option>
                        <option value="ATENCION_AL_CLIENTE">Atencion al Cliente</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Horario</label>
                      <input
                        type="text"
                        className="form-control"
                        name="horarioLaboral"
                        value={currentEmpleado.horarioLaboral || ''}
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

        {isModalOpenTwo && currentEmpleado && (
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
                        value={currentEmpleado.nombre || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentEmpleado.cedula || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentEmpleado.telefono || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentEmpleado.correoElectronico || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Tipo de Empleado</label>
                      <select
                        className="form-control"
                        name="tipoEmpleado"
                        value={currentEmpleado.tipoEmpleado || ''}
                        onChange={manejarCambios}> 
                        <option value="ADMINISTRATIVO">Administrativo</option>
                        <option value="INSTRUCTOR">Instructor</option>
                        <option value="LIMPIEZA">Limpieza</option>
                        <option value="MANTENIMIENTO">Mantenimiento</option>
                        <option value="ATENCION_AL_CLIENTE">Atencion al Cliente</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Horario Laboral</label>
                      <input
                        type="text"
                        className="form-control"
                        name="horarioLaboral"
                        value={currentEmpleado.horarioLaboral || ''}
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
};

export default EmpleadoList;
