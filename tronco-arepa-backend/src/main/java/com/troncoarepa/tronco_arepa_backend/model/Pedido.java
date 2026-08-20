package com.troncoarepa.tronco_arepa_backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pedido_id")
    private Integer pedidoId;

    @Column(name = "cliente_id")
    private Integer clienteId;

    @Column(name = "fecha_pedido", nullable = false)
    private LocalDate fechaPedido;

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Column(name = "domiciliario_id")
    private Integer domiciliarioId;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado;

    public Pedido() {
    }

    public Integer getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Integer pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getDomiciliarioId() {
        return domiciliarioId;
    }

    public void setDomiciliarioId(Integer domiciliarioId) {
        this.domiciliarioId = domiciliarioId;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}