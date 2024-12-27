package com.gym.repositories;

import com.gym.models.EquipoMaquina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipoMaquinaRepository extends JpaRepository<EquipoMaquina, Long> {
    // Métodos adicionales personalizados si los necesitas
}