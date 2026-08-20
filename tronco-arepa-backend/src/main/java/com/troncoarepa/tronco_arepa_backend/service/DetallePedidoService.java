package com.troncoarepa.tronco_arepa_backend.service;

import com.troncoarepa.tronco_arepa_backend.model.DetallePedido;
import com.troncoarepa.tronco_arepa_backend.repository.DetallePedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetallePedidoService {

    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoService(
            DetallePedidoRepository detallePedidoRepository) {

        this.detallePedidoRepository =
                detallePedidoRepository;
    }

    public List<DetallePedido> listarTodos() {
        return detallePedidoRepository.findAll();
    }

    public Optional<DetallePedido> buscarPorId(Integer id) {
        return detallePedidoRepository.findById(id);
    }

    public List<DetallePedido> buscarPorPedido(Integer pedidoId) {
        return detallePedidoRepository.findByPedidoId(pedidoId);
    }

    public DetallePedido guardar(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }

    public void eliminar(Integer id) {
        detallePedidoRepository.deleteById(id);
    }
}