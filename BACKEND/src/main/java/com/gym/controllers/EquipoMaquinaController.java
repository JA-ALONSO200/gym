package com.gym.controllers;

import com.gym.models.EquipoMaquina;
import com.gym.services.EquipoMaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin(origins = "http://192.168.30.187:3000")
public class EquipoMaquinaController {

    @Autowired
    private EquipoMaquinaService equipoMaquinaService;

    @GetMapping
    public List<EquipoMaquina> getAllEquipos() {
        return equipoMaquinaService.getAllEquipos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipoMaquina> getEquipoById(@PathVariable Long id) {
        return equipoMaquinaService.getEquipoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EquipoMaquina createEquipo(@RequestBody EquipoMaquina equipo) {
        return equipoMaquinaService.createEquipo(equipo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipoMaquina> updateEquipo(@PathVariable Long id, @RequestBody EquipoMaquina equipo) {
        try {
            return ResponseEntity.ok(equipoMaquinaService.updateEquipo(id, equipo));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable Long id) {
        equipoMaquinaService.deleteEquipo(id);
        return ResponseEntity.noContent().build();
    }
}
