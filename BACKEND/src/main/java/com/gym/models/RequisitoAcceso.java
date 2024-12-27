package com.gym.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requisitos_acceso")
public class RequisitoAcceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRequisito;

    @ManyToOne
    @JoinColumn(name = "id_clase_servicio")
    private ClaseServicio claseServicio;

    private String tipoRequisito;
    private String valorRequisito;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Getters and setters

    public Long getIdRequisito() {
        return idRequisito;
    }

    public void setIdRequisito(Long idRequisito) {
        this.idRequisito = idRequisito;
    }

    public ClaseServicio getClaseServicio() {
        return claseServicio;
    }

    public void setClaseServicio(ClaseServicio claseServicio) {
        this.claseServicio = claseServicio;
    }

    public String getTipoRequisito() {
        return tipoRequisito;
    }

    public void setTipoRequisito(String tipoRequisito) {
        this.tipoRequisito = tipoRequisito;
    }

    public String getValorRequisito() {
        return valorRequisito;
    }

    public void setValorRequisito(String valorRequisito) {
        this.valorRequisito = valorRequisito;
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