package com.troncoarepa.tronco_arepa_backend.repository;

import com.troncoarepa.tronco_arepa_backend.model.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetallePedidoRepository
        extends JpaRepository<DetallePedido, Integer> {

    List<DetallePedido> findByPedidoId(Integer pedidoId);
}