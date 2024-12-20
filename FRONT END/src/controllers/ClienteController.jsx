import axios from "axios";

const API_URL = "http://localhost:8080/api/clientes";

const ClienteController = {
  obtenerClientes: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data || [];
    } catch (error) {
      throw error;
    }
  },

  eliminarCliente: async (clienteId) => {
    try {
      await axios.delete(`${API_URL}/${clienteId}`);
    } catch (error) {
      throw error;
    }
  },

  actualizarCliente: async (clienteId, datosActualizados) => {
    try {
      await axios.put(`${API_URL}/${clienteId}`, datosActualizados);
    } catch (error) {
      throw error;
    }
  },

  agregarCliente: async (nuevoCliente) => {
    try {
      await axios.post(API_URL, nuevoCliente);
    } catch (error) {
      throw error;
    }
  },
};

export default ClienteController;
