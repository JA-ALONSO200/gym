package com.gym.controllers;

import com.gym.models.RequisitoAcceso;
import com.gym.services.RequisitoAccesoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requisitos")
public class RequisitoAccesoController {

    @Autowired
    private RequisitoAccesoService requisitoAccesoService;

    @GetMapping
    public List<RequisitoAcceso> getAllRequisitos() {
        return requisitoAccesoService.getAllRequisitos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequisitoAcceso> getRequisitoById(@PathVariable Long id) {
        return requisitoAccesoService.getRequisitoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RequisitoAcceso createRequisito(@RequestBody RequisitoAcceso requisito) {
        return requisitoAccesoService.createRequisito(requisito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequisitoAcceso> updateRequisito(@PathVariable Long id, @RequestBody RequisitoAcceso requisito) {
        try {
            return ResponseEntity.ok(requisitoAccesoService.updateRequisito(id, requisito));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequisito(@PathVariable Long id) {
        requisitoAccesoService.deleteRequisito(id);
        return ResponseEntity.noContent().build();
    }
}