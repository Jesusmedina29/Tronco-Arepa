package com.troncoarepa.tronco_arepa_backend.controller;

import com.troncoarepa.tronco_arepa_backend.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    // =========================================
    // LOGIN ADMINISTRADOR
    // =========================================

    @PostMapping("/login-admin")
    public ResponseEntity<?> loginAdmin(
            @RequestBody Map<String, String> datos) {

        String correo = datos.get("correo");
        String password = datos.get("password");


        if (correo == null || password == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Correo y contraseña son obligatorios");

        }


        return usuarioService
                .buscarPorCorreo(correo)
                .map(usuario -> {

                    if (!usuario.getPassword().equals(password)) {

                        return ResponseEntity
                                .status(401)
                                .body("Contraseña incorrecta");

                    }


                    if (!usuario.getRol().equals("ADMIN")) {

                        return ResponseEntity
                                .status(403)
                                .body("No tienes permisos de administrador");

                    }


                    if (!usuario.getEstado().equals("ACTIVO")) {

                        return ResponseEntity
                                .status(403)
                                .body("Usuario inactivo");

                    }


                    Map<String, Object> respuesta =
                            new HashMap<>();

                    respuesta.put(
                            "mensaje",
                            "Login administrador exitoso"
                    );

                    respuesta.put(
                            "usuarioId",
                            usuario.getUsuarioId()
                    );

                    respuesta.put(
                            "nombre",
                            usuario.getNombre()
                    );

                    respuesta.put(
                            "correo",
                            usuario.getCorreo()
                    );

                    respuesta.put(
                            "rol",
                            usuario.getRol()
                    );


                    return ResponseEntity.ok(respuesta);

                })
                .orElse(

                        ResponseEntity
                                .status(401)
                                .body("Administrador no encontrado")

                );

    }


    // =========================================
    // LOGIN CLIENTE
    // =========================================

    @PostMapping("/login-cliente")
    public ResponseEntity<?> loginCliente(
            @RequestBody Map<String, String> datos) {

        String correo = datos.get("correo");
        String password = datos.get("password");


        if (correo == null || password == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Correo y contraseña son obligatorios");

        }


        return usuarioService
                .buscarPorCorreo(correo)
                .map(usuario -> {

                    if (!usuario.getPassword().equals(password)) {

                        return ResponseEntity
                                .status(401)
                                .body("Contraseña incorrecta");

                    }


                    if (!usuario.getRol().equals("CLIENTE")) {

                        return ResponseEntity
                                .status(403)
                                .body("Este acceso es solamente para clientes");

                    }


                    if (!usuario.getEstado().equals("ACTIVO")) {

                        return ResponseEntity
                                .status(403)
                                .body("Usuario inactivo");

                    }


                    Map<String, Object> respuesta =
                            new HashMap<>();

                    respuesta.put(
                            "mensaje",
                            "Login cliente exitoso"
                    );

                    respuesta.put(
                            "usuarioId",
                            usuario.getUsuarioId()
                    );

                    respuesta.put(
                            "nombre",
                            usuario.getNombre()
                    );

                    respuesta.put(
                            "correo",
                            usuario.getCorreo()
                    );

                    respuesta.put(
                            "rol",
                            usuario.getRol()
                    );


                    return ResponseEntity.ok(respuesta);

                })
                .orElse(

                        ResponseEntity
                                .status(401)
                                .body("Cliente no encontrado")

                );

    }

}