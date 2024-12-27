import React, { useEffect, useState } from 'react';
import EquiposService from '../../services/EquiposService';
import "../../styles/bootstrap.css";
import "../../styles/Status.css"
import Navbar from './Navbar';

function TableEquipos() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEquipo, setCurrentEquipo] = useState({
      nombre: '',
      estado: '',
      descripcion: '',
    });
   const [isModalOpen, setIsModalOpen] = useState(false); 
   const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
    

   const abrirModal = (empleados) => {
    setCurrentEquipo(empleados); 
    setIsModalOpen(true); 
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setCurrentEquipo(null);
  };

    useEffect(() => {
       const fetchEquipos = async () => {
         try {
           const data = await EquiposService.getEquipos();
           setEquipos(data);
         } catch (error) {
            console.error('Error al obtener Equipos:', error);
         } finally {
           setLoading(false);
         }
       };
       fetchEquipos();
     }, []);

     const formatearFecha = (Fecha) => {
        const FechaF = new Date(Fecha);
        const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        
        const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(FechaF);
        const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(FechaF);
    
        return `${fechaFormateada} - Hora: ${horaFormateada}`;
      };

      const getEstadoClass = (estado) => {
        const estadoNormalizado = estado.trim().toUpperCase();
        
        switch (estadoNormalizado) {
          case 'OPERATIVA':
            return 'estado-operativa';
          case 'INHABILITADA':
            return 'estado-inhabilitada';
          default:
            return 'estado-default';
        }
      };

      const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCurrentEquipo({
          ...currentEquipo,
          [name]: value,
        });
      };
      const abrirModal2 = () => {
        setIsModalOpenTwo(true); 
        setCurrentEquipo({ 
          nombre: '',
          estado: '',
          descripcion: '',
        });
      };
    
      const cerrarModal2 = () => {
        setIsModalOpenTwo(false); 
        setCurrentEquipo(null); 
      };
    
      const manejarCambios = (e) => {
        const { name, value } = e.target;
        console.log(e);
        setCurrentEquipo({
          ...currentEquipo,
          [name]: value,
        });
      };

        const actualizarEquipo= async (e) => {
          e.preventDefault();
          try {
            await EquiposService.updateEquipo(currentEquipo.idEquipoMaquina, currentEquipo);
            alert('Equipo actualizado correctamente');
            setIsModalOpen(false);
            setEquipos(await EquiposService.getEquipos());
          } catch (error) {
            alert("Hubo un error al actualizar el Equipo.");
            console.error(error);
          }
        };

          const eliminarEquipo = async (e) => {
            const equipoId = e.currentTarget.value;
          
            if (window.confirm(`Desea Eliminar el Equipo No. ${equipoId}`)) {
              try {
                await EquiposService.deleteEquipo(equipoId);
                alert('Equipo eliminado correctamente');
                setEquipos(await EquiposService.getEquipos());
              } catch (error) {
                alert("Hubo un error al eliminar el Equipo.");
                console.error(error);
              }
            }
          };

          const agregarEquipo = async (e) => {
            e.preventDefault();
            try {
              await EquiposService.createEquipo(currentEquipo);
              alert('Equipo agregado correctamente');
              setIsModalOpenTwo(false);
              setEquipos(await EquiposService.getEquipos());
            } catch (error) {
              alert("Hubo un error al agregar el Equipo.");
              console.error(error.response ? error.response.data : error);
            }
          };

      if (loading) return <div>Cargando...</div>;

    return (
    <div className='container-fluid'>
        <Navbar />
        <ul>
          <div className="table-responsive">
          <h2 className='title text-center'>Lista de Equipos</h2>
          <h1 className="title fs-4 text-center">Bienvenido {localStorage.getItem("User")}, Al Modulo de Equipos</h1>
          <div className="d-flex justify-content-end">
            <button className="btn btn-lg btn-success mb-3 me-5" onClick={abrirModal2}><i className="bi bi-person-add"></i></button>
          </div>
          <table className="table table-bordered">
            <thead className="table-info">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Fecha de Creacion</th>
                <th scope="col">Fecha de Actualizacion</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipos && equipos.length > 0 ? (
                equipos.map((equipo) => (
                  <tr key={equipo.idEquipoMaquina}>
                    <td className="text-center">{equipo.idEquipoMaquina}</td>
                    <td className="text-center">{equipo.nombre}</td>
                    <td className={`text-center ${getEstadoClass(equipo.estado)}`}>{equipo.estado}</td>
                    <td className="text-center">{equipo.descripcion}</td>
                    <td className="text-center">{formatearFecha(equipo.createdAt)}</td>
                    <td className="text-center">{formatearFecha(equipo.updatedAt)}</td>
                    <td>
                      <center>
                        <button
                          className="btn btn-danger me-xl-3 me-lg-3 me-xxl-3 mb-xs-2 mb-me-2 mb-sm-2 mb-md-0 mb-lg-0 mb-0"
                          value={equipo.idEquipoMaquina}
                          onClick={eliminarEquipo}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          value={equipo.idEquipoMaquina}
                          onClick={() => abrirModal(equipo)}
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
      
      {isModalOpen && currentEquipo && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Editar Equipo</h5>
                </div>
                <form onSubmit={actualizarEquipo}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentEquipo.nombre || ''}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Descripcion</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="descripcion"
                        value={currentEquipo.descripcion || ''}
                        onChange={manejarCambio}
                        cols={"20"}
                        rows={"6"}
                        style={{ resize: 'none' }}
                      > </textarea>
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Estado</label>
                      <select
                        className="form-control"
                        name="estado"
                        value={currentEquipo.estado || ''}
                        onChange={manejarCambio}> 
                        <option value="OPERATIVA">Operativa</option>
                        <option value="INHABILITADA">Inhabilitada</option>
                      </select>
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

    {isModalOpenTwo && currentEquipo && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="title">Añadir Equipo</h5>
                </div>
                <form onSubmit={agregarEquipo}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="subtitle">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={currentEquipo.nombre || ''}
                        onChange={manejarCambios}
                      />
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Descripcion</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="descripcion"
                        value={currentEquipo.descripcion || ''}
                        onChange={manejarCambios}
                        cols={"20"}
                        rows={"6"}
                        style={{ resize: 'none' }}
                      > </textarea>
                    </div>
                    <div className="form-group">
                      <label className="subtitle">Estado</label>
                      <select
                        className="form-control"
                        name="estado"
                        value={currentEquipo.estado || ''}
                        onChange={manejarCambios}> 
                        <option value="">Seleccionar...</option>
                        <option value="OPERATIVA">Operativa</option>
                        <option value="INHABILITADA">Inhabilitada</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={cerrarModal2}>Cerrar</button>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default TableEquipos;
