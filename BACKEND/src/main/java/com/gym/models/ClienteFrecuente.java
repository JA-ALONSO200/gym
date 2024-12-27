package com.gym.models;

import jakarta.persistence.*;
import java.time.*;

@Entity
public class ClienteFrecuente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClienteFrecuente;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    private LocalDate fechaUltimoIngreso;
    private Integer cantidadIngresos;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Getters and setters
}