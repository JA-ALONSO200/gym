package com.gym.services;

import com.gym.models.Usuario;
import com.gym.repositories.UsuarioRepository;
import com.gym.security.JwtUtil; // Importa la clase JwtUtil
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil; // Inyectar la clase que genera el token

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario != null) {
            System.out.println("Contraseña almacenada: " + usuario.getPassword()); // Depuración
            if (passwordEncoder.matches(password, usuario.getPassword())) {
                return jwtUtil.generateToken(username);
            } else {
                System.out.println("La contraseña no coincide");
            }
        } else {
            System.out.println("El usuario no existe");
        }
        return ""; // Devuelve una cadena vacía si las credenciales son incorrectas
    }


    public void registerUser(Usuario usuario) {
        // Hashear la contraseña antes de guardarla
        String hashedPassword = passwordEncoder.encode(usuario.getPassword());
        System.out.println("Contraseña Hasheada: " + hashedPassword); // Depuración
        usuario.setPassword(hashedPassword);
        usuarioRepository.save(usuario);
    }

}