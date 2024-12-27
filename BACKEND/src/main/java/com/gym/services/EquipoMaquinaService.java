package com.gym.services;

import com.gym.models.EquipoMaquina;
import com.gym.repositories.EquipoMaquinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoMaquinaService {

    @Autowired
    private EquipoMaquinaRepository equipoMaquinaRepository;

    public List<EquipoMaquina> getAllEquipos() {
        return equipoMaquinaRepository.findAll();
    }

    public Optional<EquipoMaquina> getEquipoById(Long id) {
        return equipoMaquinaRepository.findById(id);
    }

    public EquipoMaquina createEquipo(EquipoMaquina equipo) {
        return equipoMaquinaRepository.save(equipo);
    }

    public EquipoMaquina updateEquipo(Long id, EquipoMaquina updatedEquipo) {
        return equipoMaquinaRepository.findById(id).map(equipo -> {
            equipo.setNombre(updatedEquipo.getNombre());
            equipo.setDescripcion(updatedEquipo.getDescripcion());
            equipo.setEstado(updatedEquipo.getEstado());
            equipo.setUpdatedAt(updatedEquipo.getUpdatedAt());
            return equipoMaquinaRepository.save(equipo);
        }).orElseThrow(() -> new RuntimeException("Equipo no encontrado"));
    }

    public void deleteEquipo(Long id) {
        equipoMaquinaRepository.deleteById(id);
    }
}