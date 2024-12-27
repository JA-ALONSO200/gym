import { useEffect, useState } from 'react';
import ResponsableService from '../../services/ResponsableService';
import "../../styles/bootstrap.css";
import Navbar from './Navbar';

function TableResponsable() {
    const [responsable, setResponsable] = useState([]);
      const [currentResponsable, setcurrentResponsable] = useState({
        nombre: '',
        cedula: '',
        telefono: '',
        correoElectronico: '',
      });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const data = await ResponsableService.getResponsables();
        setResponsable(data);
      } catch (error) {
         console.error('Error al obtener Responsables:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponsable();
  }, []);
  
    const formatearFecha = (Fecha) => {
    const FechaF = new Date(Fecha);
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(FechaF);
    const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(FechaF);

    return `${fechaFormateada} - Hora: ${horaFormateada}`;
    };

    const abrirModal = (responsableSeleccionado) => {
        setcurrentResponsable(responsableSeleccionado); 
        console.log(responsableSeleccionado);
        setIsModalOpen(true); 
    };
    

    const cerrarModal = () => {
        setIsModalOpen(false);
        setcurrentResponsable(null);
      };
      const abrirModal2 = () => {
        setIsModalOpenTwo(true); 
        setcurrentResponsable({ 
          nombre: '',
          cedula: '',
          telefono: '',
          correoElectronico: '',
        });
      };
    
      const cerrarModal2 = () => {
        setIsModalOpenTwo(false); 
        setcurrentResponsable(null); 
      };

      const manejarCambio = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setcurrentResponsable({
          ...currentResponsable,
          [name]: value,
        });
      };

      const manejarCambios = (e) => {
        const { name, value } = e.target;
        console.log(e);
        setcurrentResponsable({
          ...currentResponsable,
          [name]: value,
        });
      };

        const agregarResponsable = async (e) => {
          e.preventDefault();
          try {
            await ResponsableService.createResponsable(currentResponsable);
            alert('Responsable agregado correctamente');
            setIsModalOpenTwo(false);
            setResponsable(await ResponsableService.getResponsables());
          } catch (error) {
            alert("Hubo un error al agregar el responsable.");
            console.error(error.response ? error.response.data : error);
          }
        };

        const actualizarResponsable= async (e) => {
            e.preventDefault();
            try {
              await ResponsableService.updateResponsable(currentResponsable.idResponsable, currentResponsable);
              alert('Responsable actualizado correctamente');
              setIsModalOpen(false);
              setResponsable(await ResponsableService.getResponsables());
            } catch (error) {
              alert("Hubo un error al actualizar el Responsable.");
              console.error(error);
            }
          };

          const eliminarResponsable = async (e) => {
            const responsableId = e.currentTarget.value; 
          
            if (window.confirm(`Desea Eliminar el responsable No. ${responsableId}`)) {
              try {
                await ResponsableService.deleteResponsable(responsableId);
                alert('Empleado eliminado correctamente');
                setResponsable(await ResponsableService.getResponsables());
              } catch (error) {
                alert("Hubo un error al eliminar el responsable.");
                console.log(error);
              }
            }
          };
    if (loading) return <div>Cargando...</div>;
    return (
    <div>
        <Navbar />
        <div className="table-responsive">
          <h2 className='title text-center'>Lista de Responsables</h2>
          <h1 className="title fs-4 text-center">Bienvenido {localStorage.getItem("User")}, Al Modulo de Responsables</h1>
          <div className="d-flex justify-content-end"><button className="btn btn-lg btn-success mb-3 me-5" onClick={abrirModal2}><i className="bi bi-person-add"></i></button></div>
          <table className="table table-bordered">
            <thead className="table-info">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cedula</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th scope="col">Fecha de Creacion</th>
                <th scope="col">Fecha de Actualizacion</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {responsable && responsable.length > 0 ? (
                responsable.map((responsable) => (
                  <tr key={responsable.idResponsable}>
                    <td className="text-center">{responsable.idResponsable}</td>
                    <td className="text-center">{responsable.nombre}</td>
                    <td className="text-center">{responsable.cedula}</td>
                    <td className="text-center">{responsable.telefono}</td>
                    <td className="text-center">{responsable.correoElectronico}</td>
                    <td className="text-center">{formatearFecha(responsable.createdAt)}</td>
                    <td className="text-center">{formatearFecha(responsable.updatedAt)}</td>
                    <td> 
                      <center>
                      <button
                        className="btn btn-danger me-xl-3 me-lg-3 me-xxl-3 mb-xs-2 mb-me-2 mb-sm-2 mb-md-0 mb-lg-0 mb-0"
                        value={responsable.idResponsable}
                        onClick={eliminarResponsable}
                        >
                        <i className="bi bi-trash"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          value={responsable.idResponsable}
                          onClick={ () => abrirModal(responsable)}
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
        {isModalOpen && responsable && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Editar Responsble</h5>
                </div>
                <form onSubmit={actualizarResponsable}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentResponsable.nombre || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentResponsable.cedula || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentResponsable.telefono || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentResponsable.correoElectronico || ''}
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

        {isModalOpenTwo && responsable && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Añadir Responsable</h5>
                </div>
                <form onSubmit={agregarResponsable}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentResponsable.nombre || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Cédula</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cedula"
                        value={currentResponsable.cedula || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={currentResponsable.telefono || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        name="correoElectronico"
                        value={currentResponsable.correoElectronico || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={cerrarModal2}>Cerrar</button>
                    <button type="submit" className="btn btn-primary">Añadir responsable</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default TableResponsable