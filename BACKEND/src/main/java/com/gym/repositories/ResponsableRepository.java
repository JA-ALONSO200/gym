package com.gym.repositories;

import com.gym.models.Responsable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsableRepository extends JpaRepository<Responsable, Long> {
    // Métodos de consulta adicionales si es necesario
}