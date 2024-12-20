import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cliente from '../models/Cliente';
import ClienteController from '../controllers/ClienteController';
import '../styles/bootstrap.css';

Modal.setAppElement('#root'); // Ajusta el selector al elemento raíz de tu app

const ClienteView = () => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [estatura, setEstatura] = useState('');
  const [responsable, setResponsable] = useState('');
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false); // Modal de agregar cliente
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false); // Modal de editar cliente
  const [editingCliente, setEditingCliente] = useState(null);

  // Cargar clientes al montar el componente
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await ClienteController.obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  // Abrir modal para agregar cliente
  const openAddModal = () => {
    setModalAddIsOpen(true);
    setNombre('');
    setCedula('');
    setEmail('');
    setTelefono('');
    setEdad('');
    setEstatura('');
    setResponsable('');
  };

  // Abrir modal para editar cliente
  const openEditModal = (cliente) => {
    setModalEditIsOpen(true);
    setEditingCliente(cliente);
    setNombre(cliente.nombre);
    setCedula(cliente.cedula);
    setEmail(cliente.correoElectronico);
    setTelefono(cliente.telefono);
    setEdad(cliente.edad);
    setEstatura(cliente.estatura);
    setResponsable(cliente.responsable ? cliente.responsable.nombre : '');
  };

  const closeModal = () => {
    setModalAddIsOpen(false);
    setModalEditIsOpen(false);
    setEditingCliente(null);
    setNombre('');
    setCedula('');
    setEmail('');
    setTelefono('');
    setEdad('');
    setEstatura('');
    setResponsable('');
  };

  // Guardar cliente (agregar o actualizar)
  const handleSaveCliente = async () => {
    try {
      const nuevoCliente = new Cliente({
        idCliente: editingCliente ? editingCliente.idCliente : null,
        nombre,
        cedula,
        correoElectronico: email,
        telefono,
        edad,
        estatura,
        responsable,
      });
  
      if (editingCliente) {
        // Actualizar cliente
        await ClienteController.actualizarCliente(editingCliente.idCliente, nuevoCliente);
      } else {
        // Agregar nuevo cliente
        await ClienteController.agregarCliente(nuevoCliente);
      }
  
      await cargarClientes(); // Volver a cargar la lista de clientes
      closeModal();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  const handleDeleteCliente = async (id) => {
    // Mostrar el cuadro de confirmación con el ID del cliente y su nombre
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al cliente ${id} ?`);
  
    if (confirmDelete) {
      try {
        // Si el usuario confirma, proceder con la eliminación
        await ClienteController.eliminarCliente(id);
        await cargarClientes(); // Recargar la lista de clientes
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
      }
    }
  };
  

  return (
    <div className="container-fluid">
      <h4>Gestión de Clientes</h4>

      {/* Botón para abrir el modal de agregar cliente */}
      <div className="d-flex justify-content-end">
        <button className="btn-lg btn btn-success me-5 mb-3" onClick={openAddModal}>
          <i className="bi bi-person-add"></i> Agregar Cliente
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-info">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Cédula</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Correo Electrónico</th>
              <th scope="col">Edad</th>
              <th scope="col">Estatura</th>
              <th scope="col">Responsable</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.idCliente}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.correoElectronico}</td>
                  <td>{cliente.edad}</td>
                  <td>{cliente.estatura}</td>
                  <td>{cliente.responsable ? cliente.responsable.nombre : ''}</td>
                  <td className="text-center">
                    <button className="btn btn-warning me-2" onClick={() => openEditModal(cliente)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteCliente(cliente.idCliente)}>
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No hay clientes disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar cliente */}
      <Modal isOpen={modalAddIsOpen} onRequestClose={closeModal} contentLabel="Agregar Cliente">
  <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
    <div className="modal-content">
      <div className="modal-header d-grid justify-content-center">
        <h5 className="modal-title">Añadir Cliente</h5>
      </div>
      <form>
        <div className="modal-body">
          <div className="form-group">
            <label class="subtitle">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Cédula:</label>
            <input
              type="text"
              className="form-control"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Teléfono:</label>
            <input
              type="tel"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Edad:</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Estatura:</label>
            <input
              type="number"
              className="form-control"
              value={estatura}
              onChange={(e) => setEstatura(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label class="subtitle">Responsable:</label>
            <input
              type="text"
              className="form-control"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button type="button" className="btn btn-danger mt-4 me-3" onClick={closeModal}>Cerrar</button>
          <button type="button" className="btn btn-success mt-4" onClick={handleSaveCliente}>Añadir Cliente</button>
        </div>
      </form>
    </div>
  </div>
    </Modal>


    <Modal isOpen={modalEditIsOpen} onRequestClose={closeModal} contentLabel="Editar Cliente">
  <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
    <div className="modal-content">
      <div className="modal-header d-grid justify-content-center">
        <h5 className="modal-title">Editar Cliente</h5>
      </div>
      <form>
        <div className="modal-body">
          <div className="form-group">
            <label className="subtitle">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Cédula</label>
            <input
              type="text"
              className="form-control"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Edad</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Estatura</label>
            <input
              type="number"
              className="form-control"
              value={estatura}
              onChange={(e) => setEstatura(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="subtitle">Responsable</label>
            <input
              type="text"
              className="form-control"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button type="button" className="btn btn-danger me-3 mt-5" onClick={closeModal}>Cerrar</button>
          <button type="button" className="btn btn-success mt-5" onClick={handleSaveCliente}>Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>
    </Modal>

    </div>
  );
};

export default ClienteView;
