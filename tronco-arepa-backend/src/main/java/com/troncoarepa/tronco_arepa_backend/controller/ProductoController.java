package com.troncoarepa.tronco_arepa_backend.controller;

import com.troncoarepa.tronco_arepa_backend.model.Producto;
import com.troncoarepa.tronco_arepa_backend.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Obtener todos los productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarTodos();
    }

    // Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProducto(@PathVariable Integer id) {

        return productoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear producto
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Integer id,
            @RequestBody Producto producto) {

        return productoService.buscarPorId(id)
                .map(productoExistente -> {

                    productoExistente.setNombre(producto.getNombre());
                    productoExistente.setDescripcion(producto.getDescripcion());
                    productoExistente.setPrecio(producto.getPrecio());
                    productoExistente.setEstado(producto.getEstado());

                    return ResponseEntity.ok(
                            productoService.guardar(productoExistente)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {

        if (productoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}