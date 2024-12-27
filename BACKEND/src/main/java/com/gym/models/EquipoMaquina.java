package com.gym.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipo_maquina")
public class EquipoMaquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEquipoMaquina;

    private String nombre;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private EstadoEquipo estado;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum EstadoEquipo {
        OPERATIVA,
        INHABILITADA
    }

    // Getters and setters

    public Long getIdEquipoMaquina() {
        return idEquipoMaquina;
    }

    public void setIdEquipoMaquina(Long idEquipoMaquina) {
        this.idEquipoMaquina = idEquipoMaquina;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public EstadoEquipo getEstado() {
        return estado;
    }

    public void setEstado(EstadoEquipo estado) {
        this.estado = estado;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
