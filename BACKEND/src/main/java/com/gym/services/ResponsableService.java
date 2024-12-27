package com.gym.services;

import com.gym.models.Responsable;
import com.gym.repositories.ResponsableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponsableService {

    private final ResponsableRepository responsableRepository;

    @Autowired
    public ResponsableService(ResponsableRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    // Crear o actualizar un responsable
    public Responsable saveResponsable(Responsable responsable) {
        return responsableRepository.save(responsable);
    }

    // Obtener todos los responsables
    public List<Responsable> getAllResponsables() {
        return responsableRepository.findAll();
    }

    // Obtener un responsable por su ID
    public Optional<Responsable> getResponsableById(Long id) {
        return responsableRepository.findById(id);
    }

    // Eliminar un responsable
    public void deleteResponsable(Long id) {
        responsableRepository.deleteById(id);
    }
}