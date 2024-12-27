package com.gym.repositories;

import com.gym.models.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    // Métodos personalizados si los necesitas
}
