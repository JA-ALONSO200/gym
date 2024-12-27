 package com.gym.controllers;

import com.gym.models.Responsable;
import com.gym.services.ResponsableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responsables")
@CrossOrigin(origins = "http://192.168.30.187:3000")
public class ResponsableController {

    private final ResponsableService responsableService;

    @Autowired
    public ResponsableController(ResponsableService responsableService) {
        this.responsableService = responsableService;
    }

    // Crear un nuevo responsable
    @PostMapping
    public ResponseEntity<Responsable> createResponsable(@RequestBody Responsable responsable) {
        Responsable savedResponsable = responsableService.saveResponsable(responsable);
        return ResponseEntity.ok(savedResponsable);
    }

    // Obtener todos los responsables
    @GetMapping
    public ResponseEntity<List<Responsable>> getAllResponsables() {
        List<Responsable> responsables = responsableService.getAllResponsables();
        return ResponseEntity.ok(responsables);
    }

    // Obtener un responsable por ID
    @GetMapping("/{id}")
    public ResponseEntity<Responsable> getResponsableById(@PathVariable Long id) {
        return responsableService.getResponsableById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar un responsable existente
    @PutMapping("/{id}")
    public ResponseEntity<Responsable> updateResponsable(
            @PathVariable Long id,
            @RequestBody Responsable responsable) {
        return responsableService.getResponsableById(id).map(existingResponsable -> {
            responsable.setIdResponsable(id); // Aseguramos el ID
            Responsable updatedResponsable = responsableService.saveResponsable(responsable);
            return ResponseEntity.ok(updatedResponsable);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un responsable
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponsable(@PathVariable Long id) {
        responsableService.deleteResponsable(id);
        return ResponseEntity.noContent().build();
    }
}