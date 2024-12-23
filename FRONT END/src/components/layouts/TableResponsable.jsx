import { useEffect, useState } from 'react';
import ResponsableService from '../../services/ResponsableService';
import "../../styles/bootstrap.css";
import Navbar from './Navbar';

function TableResponsable() {
  const [responsable, setResponsable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const data = await ResponsableService.getResponsables();
        setResponsable(data);
      } catch (error) {
         console.error('Error al obtener empleados:', error);
        setError('No se pudo obtener la lista de empleados');
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
    if (loading) return <div>Cargando...</div>;
    return (
    <div>
        <Navbar />
        <div className="table-responsive">
          <h2 className='title text-center'>Lista de Responsables</h2>
          <h1 className="title fs-4 text-center">Bienvenido {localStorage.getItem("User")}, Al Modulo de Responsables</h1>
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
                          className="btn btn-danger me-3"
                          value={responsable.idResponsable}
                          onClick={""}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          value={responsable.idResponsable}
                          onClick={/** () => abrirModal(empleado) **/""}
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
    </div>
  )
}

export default TableResponsable