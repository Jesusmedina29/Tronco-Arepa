package com.troncoarepa.tronco_arepa_backend.controller;

import com.troncoarepa.tronco_arepa_backend.model.Pedido;
import com.troncoarepa.tronco_arepa_backend.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // Obtener todos los pedidos
    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoService.listarTodos();
    }

    // Obtener pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedido(
            @PathVariable Integer id) {

        return pedidoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear pedido
    @PostMapping
    public Pedido crearPedido(
            @RequestBody Pedido pedido) {

        return pedidoService.guardar(pedido);
    }

    // Actualizar pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizarPedido(
            @PathVariable Integer id,
            @RequestBody Pedido pedido) {

        return pedidoService.buscarPorId(id)
                .map(pedidoExistente -> {

                    pedidoExistente.setClienteId(
                            pedido.getClienteId()
                    );

                    pedidoExistente.setFechaPedido(
                            pedido.getFechaPedido()
                    );

                    pedidoExistente.setValor(
                            pedido.getValor()
                    );

                    pedidoExistente.setDomiciliarioId(
                            pedido.getDomiciliarioId()
                    );

                    pedidoExistente.setEstado(
                            pedido.getEstado()
                    );

                    return ResponseEntity.ok(
                            pedidoService.guardar(
                                    pedidoExistente
                            )
                    );
                })
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // Eliminar pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(
            @PathVariable Integer id) {

        if (pedidoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        pedidoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}