package com.gym.services;

import com.gym.models.Empleado;
import com.gym.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    // Listar todos los empleados
    public List<Empleado> obtenerTodos() {
        return empleadoRepository.findAll();
    }

    // Buscar un empleado por ID
    public Optional<Empleado> obtenerPorId(Long id) {
        return empleadoRepository.findById(id);
    }

    // Guardar un nuevo empleado
    public Empleado guardarEmpleado(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    // Actualizar un empleado existente
    public Empleado actualizarEmpleado(Long id, Empleado detallesEmpleado) {
        return empleadoRepository.findById(id).map(empleado -> {
            empleado.setNombre(detallesEmpleado.getNombre());
            empleado.setCedula(detallesEmpleado.getCedula());
            empleado.setTelefono(detallesEmpleado.getTelefono());
            empleado.setCorreoElectronico(detallesEmpleado.getCorreoElectronico());
            empleado.setTipoEmpleado(detallesEmpleado.getTipoEmpleado());
            empleado.setHorarioLaboral(detallesEmpleado.getHorarioLaboral());
            empleado.setUpdatedAt(java.time.LocalDateTime.now());
            return empleadoRepository.save(empleado);
        }).orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + id));
    }

    // Eliminar un empleado
    public void eliminarEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }
}