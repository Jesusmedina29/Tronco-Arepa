package com.troncoarepa.tronco_arepa_backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApiAccessFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        /*
         * Permitir las peticiones OPTIONS.
         * Son utilizadas por el navegador para CORS.
         */
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {

            filterChain.doFilter(request, response);

            return;
        }

        /*
         * Revisar solamente las rutas de la API.
         */
        if (uri.startsWith("/api/")) {

            String frontend =
                    request.getHeader("X-Frontend-App");

            /*
             * Si la petición no viene de nuestro frontend,
             * no permitimos visualizar la API.
             */
            if (!"tronco-arepa".equals(frontend)) {

                response.setStatus(
                        HttpServletResponse.SC_FORBIDDEN
                );

                response.setContentType(
                        "text/html;charset=UTF-8"
                );

                response.getWriter().write("""
                        
                        <!DOCTYPE html>
                        <html lang="es">
                        
                        <head>
                            <meta charset="UTF-8">
                            <title>Acceso no permitido</title>
                        </head>
                        
                        <body style="
                            font-family: Arial, sans-serif;
                            text-align: center;
                            margin-top: 100px;
                            background-color: #f5f5f5;
                        ">
                        
                            <div style="
                                background: white;
                                max-width: 500px;
                                margin: auto;
                                padding: 40px;
                                border-radius: 15px;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                            ">
                        
                                <div style="
                                    font-size: 60px;
                                    margin-bottom: 20px;
                                ">
                                    🚫
                                </div>
                        
                                <h1>
                                    Acceso no permitido
                                </h1>
                        
                                <p style="
                                    color: #666;
                                    font-size: 17px;
                                ">
                                    No se puede acceder directamente
                                    a la API de TRONCO E AREPA.
                                </p>
                        
                                <p style="
                                    color: #888;
                                ">
                                    Utilice el sitio web para continuar.
                                </p>
                        
                            </div>
                        
                        </body>
                        
                        </html>
                        """);

                return;
            }
        }

        /*
         * Si todo está correcto,
         * continuar normalmente con Spring Boot.
         */
        filterChain.doFilter(request, response);
    }
}