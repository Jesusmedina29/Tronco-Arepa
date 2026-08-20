package com.troncoarepa.tronco_arepa_backend.controller;

import com.troncoarepa.tronco_arepa_backend.model.Cliente;
import com.troncoarepa.tronco_arepa_backend.service.ClienteService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }


    // =========================================
    // LISTAR CLIENTES
    // =========================================

    @GetMapping
    public List<Cliente> listarClientes() {

        return clienteService.listarTodos();

    }


    // =========================================
    // BUSCAR CLIENTE
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarCliente(
            @PathVariable Integer id) {

        return clienteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }


    // =========================================
    // CREAR CLIENTE
    // =========================================

    @PostMapping
    public Cliente crearCliente(
            @RequestBody Cliente cliente) {

        return clienteService.guardar(cliente);

    }


    // =========================================
    // ACTUALIZAR CLIENTE
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Integer id,
            @RequestBody Cliente cliente) {

        return clienteService.buscarPorId(id)
                .map(clienteExistente -> {

                    clienteExistente.setNombre(
                            cliente.getNombre()
                    );

                    clienteExistente.setTelefono(
                            cliente.getTelefono()
                    );

                    clienteExistente.setDireccion(
                            cliente.getDireccion()
                    );

                    clienteExistente.setCorreo(
                            cliente.getCorreo()
                    );

                    clienteExistente.setEstado(
                            cliente.getEstado()
                    );

                    return ResponseEntity.ok(
                            clienteService.guardar(
                                    clienteExistente
                            )
                    );

                })
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }


    // =========================================
    // ELIMINAR CLIENTE
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(
            @PathVariable Integer id) {

        if (clienteService.buscarPorId(id).isEmpty()) {

            return ResponseEntity.notFound().build();

        }

        clienteService.eliminar(id);

        return ResponseEntity.noContent().build();

    }

}