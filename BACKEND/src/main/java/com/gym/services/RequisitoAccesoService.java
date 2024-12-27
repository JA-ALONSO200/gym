package com.gym.services;

import com.gym.models.RequisitoAcceso;
import com.gym.repositories.RequisitoAccesoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequisitoAccesoService {

    @Autowired
    private RequisitoAccesoRepository requisitoAccesoRepository;

    public List<RequisitoAcceso> getAllRequisitos() {
        return requisitoAccesoRepository.findAll();
    }

    public Optional<RequisitoAcceso> getRequisitoById(Long id) {
        return requisitoAccesoRepository.findById(id);
    }

    public RequisitoAcceso createRequisito(RequisitoAcceso requisito) {
        return requisitoAccesoRepository.save(requisito);
    }

    public RequisitoAcceso updateRequisito(Long id, RequisitoAcceso updatedRequisito) {
        return requisitoAccesoRepository.findById(id).map(requisito -> {
            requisito.setTipoRequisito(updatedRequisito.getTipoRequisito());
            requisito.setValorRequisito(updatedRequisito.getValorRequisito());
            requisito.setClaseServicio(updatedRequisito.getClaseServicio());
            requisito.setUpdatedAt(updatedRequisito.getUpdatedAt());
            return requisitoAccesoRepository.save(requisito);
        }).orElseThrow(() -> new RuntimeException("Requisito no encontrado"));
    }

    public void deleteRequisito(Long id) {
        requisitoAccesoRepository.deleteById(id);
    }
}