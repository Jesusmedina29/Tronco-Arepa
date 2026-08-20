package com.troncoarepa.tronco_arepa_backend.service;

import com.troncoarepa.tronco_arepa_backend.model.Pedido;
import com.troncoarepa.tronco_arepa_backend.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    // Listar todos los pedidos
    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    // Buscar pedido por ID
    public Optional<Pedido> buscarPorId(Integer id) {
        return pedidoRepository.findById(id);
    }

    // Guardar pedido
    public Pedido guardar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    // Eliminar pedido
    public void eliminar(Integer id) {
        pedidoRepository.deleteById(id);
    }
}