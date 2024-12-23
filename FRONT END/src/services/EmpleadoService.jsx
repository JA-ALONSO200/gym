import axios from 'axios';
import Empleado from '../models/Empleado.ts';  

const API_URL = 'http://localhost:8080/api/empleados'; 


const getEmpleados = async () => {
  try {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data.map((empleadoData) => Empleado.fromApiResponse(empleadoData));
  } catch (error) {
    console.error('Error completo al obtener empleados:', error); 
    throw new Error('Error al obtener empleados');
  }
};


// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return Empleado.fromApiResponse(response.data);
  } catch (error) {
    throw new Error('Error al obtener el empleado');
  }
};

// Crear un nuevo empleado
const createEmpleado = async (empleado) => {
  try {
    const response = await axios.post(API_URL, empleado);
    return Empleado.fromApiResponse(response.data); 
  } catch (error) {
    throw new Error('Error al crear el empleado');
  }
};

// Actualizar un empleado
const updateEmpleado = async (id, empleado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empleado);
    return Empleado.fromApiResponse(response.data); 
  } catch (error) {
    throw new Error('Error al actualizar el empleado');
  }
};

// Eliminar un empleado
const deleteEmpleado = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Error al eliminar el empleado');
  }
};

export default {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
