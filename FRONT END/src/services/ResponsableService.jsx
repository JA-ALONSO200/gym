import axios from 'axios';
import Responsable from '../models/Responsable.ts';  

const API_URL = 'http://localhost:8080/api/responsables'; 

const getResponsables = async () => {
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
    
        return response.data.map((responsableData) => Responsable.fromApiResponse(responsableData));
    } catch (error) {
        console.error('Error completo al obtener Responsables:', error); 
        throw new Error('Error al obtener Responsables');
    }
};

const createResponsable = async (responsable) => {
    try {
        const response = await axios.post(API_URL, responsable);
        return Responsable.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al crear el Responsable');
    }
};

const deleteResponsable = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return Responsable.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al actualizar el Responsable')
    }
}
const updateResponsable = async (id, responsable) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, responsable);
        return Responsable.fromApiResponse(response.data); 
    } catch (error) {
        throw new Error('Error al actualizar el Responsable');
    }
};


export default {
    getResponsables,
    createResponsable,
    deleteResponsable,
    updateResponsable
}