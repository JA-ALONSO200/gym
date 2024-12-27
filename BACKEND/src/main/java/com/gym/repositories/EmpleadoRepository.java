package com.gym.repositories;

import com.gym.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    // Puedes agregar métodos de consulta personalizados si es necesario
    Empleado findByCedula(String cedula);
}