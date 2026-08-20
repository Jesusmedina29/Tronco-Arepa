package com.troncoarepa.tronco_arepa_backend.controller;

import com.troncoarepa.tronco_arepa_backend.model.DetallePedido;
import com.troncoarepa.tronco_arepa_backend.service.DetallePedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-pedidos")
@CrossOrigin(origins = "*")
public class DetallePedidoController {

    private final DetallePedidoService detallePedidoService;

    public DetallePedidoController(
            DetallePedidoService detallePedidoService) {

        this.detallePedidoService =
                detallePedidoService;
    }

    // Listar todos los detalles
    @GetMapping
    public List<DetallePedido> listarDetalles() {

        return detallePedidoService.listarTodos();
    }

    // Buscar detalle por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> buscarDetalle(
            @PathVariable Integer id) {

        return detallePedidoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Buscar detalles de un pedido
    @GetMapping("/pedido/{pedidoId}")
    public List<DetallePedido> buscarPorPedido(
            @PathVariable Integer pedidoId) {

        return detallePedidoService
                .buscarPorPedido(pedidoId);
    }

    // Crear detalle
    @PostMapping
    public DetallePedido crearDetalle(
            @RequestBody DetallePedido detallePedido) {

        return detallePedidoService.guardar(
                detallePedido
        );
    }

    // Eliminar detalle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDetalle(
            @PathVariable Integer id) {

        if (detallePedidoService
                .buscarPorId(id)
                .isEmpty()) {

            return ResponseEntity.notFound().build();
        }

        detallePedidoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}