package com.troncoarepa.tronco_arepa_backend.repository;

import com.troncoarepa.tronco_arepa_backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}