import axios from 'axios';
import Equipos from '../models/Equipos.ts';  

const API_URL = 'http://localhost:8080/api/equipos'; 

const getEquipos = async () => {
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
        return response.data.map((equiposData) => Equipos.fromApiResponse(equiposData));
    } catch (error) {
        console.error('Error completo al obtener Equipos:', error); 
        throw new Error('Error al obtener Equipos');
    }
};

const createEquipo = async (equipo) => {
    try {
        const response = await axios.post(API_URL, equipo);
        return Equipos.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al crear el Equipo');
    }
};

const deleteEquipo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return Equipos.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al actualizar el Equipo')
    }
}
const updateEquipo = async (id, equipo) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, equipo);
        return Equipos.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al actualizar el Equipo');
    }
};


export default {
    getEquipos,
    createEquipo,
    deleteEquipo,
    updateEquipo
}