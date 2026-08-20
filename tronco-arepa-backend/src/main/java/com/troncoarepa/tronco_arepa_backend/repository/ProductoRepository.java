package com.troncoarepa.tronco_arepa_backend.repository;

import com.troncoarepa.tronco_arepa_backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductoRepository extends JpaRepository<Producto, Integer> {

}