import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/clientes';

export const getClients = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes', error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(apiUrl, clientData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente', error);
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axios.put(`${apiUrl}/${clientId}`, clientData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente', error);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    await axios.delete(`${apiUrl}/${clientId}`);
  } catch (error) {
    console.error('Error al eliminar el cliente', error);
    throw error;
  }
};
