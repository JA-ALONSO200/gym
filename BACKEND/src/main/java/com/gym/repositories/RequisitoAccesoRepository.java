package com.gym.repositories;

import com.gym.models.RequisitoAcceso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequisitoAccesoRepository extends JpaRepository<RequisitoAcceso, Long> {
    // Métodos adicionales personalizados si los necesitas
}