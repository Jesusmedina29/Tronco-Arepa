package com.troncoarepa.tronco_arepa_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_pedidos")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detalle_id")
    private Integer detalleId;

    @Column(name = "pedido_id", nullable = false)
    private Integer pedidoId;

    @Column(name = "producto_id", nullable = false)
    private Integer productoId;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "valor_unitario", nullable = false)
    private Double valorUnitario;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado;

    public DetallePedido() {
    }

    public Integer getDetalleId() {
        return detalleId;
    }

    public void setDetalleId(Integer detalleId) {
        this.detalleId = detalleId;
    }

    public Integer getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Integer pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Integer getProductoId() {
        return productoId;
    }

    public void setProductoId(Integer productoId) {
        this.productoId = productoId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}