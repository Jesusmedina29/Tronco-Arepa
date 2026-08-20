package com.troncoarepa.tronco_arepa_backend.config;

import com.troncoarepa.tronco_arepa_backend.model.Usuario;
import com.troncoarepa.tronco_arepa_backend.repository.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner crearAdministrador(
            UsuarioRepository usuarioRepository) {

        return args -> {

            String correoAdmin =
                    "admin@troncoarepa.com";


            if (usuarioRepository
                    .findByCorreo(correoAdmin)
                    .isEmpty()) {

                Usuario admin =
                        new Usuario();

                admin.setNombre(
                        "Administrador"
                );

                admin.setCorreo(
                        correoAdmin
                );

                admin.setPassword(
                        "Admin123"
                );

                admin.setRol(
                        "ADMIN"
                );

                admin.setEstado(
                        "ACTIVO"
                );


                usuarioRepository.save(admin);


                System.out.println(
                        "===================================="
                );

                System.out.println(
                        " ADMINISTRADOR CREADO"
                );

                System.out.println(
                        " Correo: "
                                + correoAdmin
                );

                System.out.println(
                        " Contraseña: Admin123"
                );

                System.out.println(
                        "===================================="
                );

            }

        };

    }

}