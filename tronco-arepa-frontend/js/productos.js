/* =========================================
   CONFIGURACIÓN
========================================= */

const API_URL =
    "http://localhost:8081/api/productos";

const PEDIDOS_URL =
    "http://localhost:8081/api/pedidos";

const DETALLE_PEDIDOS_URL =
    "http://localhost:8081/api/detalle-pedidos";

const FRONTEND_HEADER = {
    "X-Frontend-App": "tronco-arepa"
};


/* =========================================
   CARRITO
========================================= */

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


/* =========================================
   CARGAR PRODUCTOS
========================================= */

async function cargarProductos() {

    try {

        const respuesta =
            await fetch(API_URL, {

                method: "GET",

                headers: {
                    ...FRONTEND_HEADER
                }

            });


        if (!respuesta.ok) {

            throw new Error(
                "Error al obtener productos"
            );

        }


        const productos =
            await respuesta.json();


        mostrarProductos(productos);


    } catch (error) {

        console.error(error);


        document.getElementById(
            "productos-container"
        ).innerHTML = `

            <div class="cargando">

                <h2>
                    ⚠️ No se pudo cargar el menú
                </h2>

                <p>
                    Verifica que el backend esté
                    ejecutándose en el puerto 8081.
                </p>

            </div>

        `;

    }

}


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(productos) {

    const contenedor =
        document.getElementById(
            "productos-container"
        );


    contenedor.innerHTML = "";


    productos.forEach(producto => {

        /*
         * Solo mostrar productos activos
         */

        if (producto.estado !== "ACTIVO") {

            return;

        }


        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "producto-card"
        );


        tarjeta.innerHTML = `

            <div class="producto-imagen">

                🍔

            </div>


            <div class="producto-info">

                <h3>

                    ${producto.nombre}

                </h3>


                <p>

                    ${
                        producto.descripcion ||
                        "Delicioso producto de la casa"
                    }

                </p>


                <div class="precio">

                    $${Number(producto.precio)
                        .toLocaleString("es-CO")}

                </div>


                <span class="estado">

                    ● ${producto.estado}

                </span>


                <button
                    onclick="agregarAlCarrito(
                        ${producto.productoId},
                        '${producto.nombre.replace(
                            /'/g,
                            "\\'"
                        )}',
                        ${producto.precio}
                    )">

                    🛒 AGREGAR AL PEDIDO

                </button>

            </div>

        `;


        contenedor.appendChild(
            tarjeta
        );

    });

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(
    id,
    nombre,
    precio
) {

    const productoExistente =
        carrito.find(
            producto =>
                producto.id === id
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            id: id,

            nombre: nombre,

            precio: Number(precio),

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();

    abrirCarrito();

}


/* =========================================
   AUMENTAR CANTIDAD
========================================= */

function aumentarCantidad(id) {

    const producto =
        carrito.find(
            producto =>
                producto.id === id
        );


    if (producto) {

        producto.cantidad++;

    }


    guardarCarrito();

    actualizarCarrito();

}


/* =========================================
   DISMINUIR CANTIDAD
========================================= */

function disminuirCantidad(id) {

    const producto =
        carrito.find(
            producto =>
                producto.id === id
        );


    if (!producto) {

        return;

    }


    producto.cantidad--;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                producto =>
                    producto.id !== id
            );

    }


    guardarCarrito();

    actualizarCarrito();

}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            producto =>
                producto.id !== id
        );


    guardarCarrito();

    actualizarCarrito();

}


/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function actualizarCarrito() {

    const cantidad =
        carrito.reduce(

            (total, producto) =>

                total + producto.cantidad,

            0

        );


    const contador =
        document.getElementById(
            "contador-carrito"
        );


    const contadorFlotante =
        document.getElementById(
            "contador-flotante"
        );


    if (contador) {

        contador.textContent =
            cantidad;

    }


    if (contadorFlotante) {

        contadorFlotante.textContent =
            cantidad;

    }


    mostrarCarrito();

}


/* =========================================
   MOSTRAR CARRITO
========================================= */

function mostrarCarrito() {

    const contenedor =
        document.getElementById(
            "carrito-items"
        );


    if (!contenedor) {

        return;

    }


    /*
     * CARRITO VACÍO
     */

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <div style="font-size:50px;">
                    🛒
                </div>

                <p>
                    Tu carrito está vacío.
                </p>

                <small>
                    Agrega algunos productos
                    del menú.
                </small>

            </div>

        `;


        const total =
            document.getElementById(
                "total-carrito"
            );


        if (total) {

            total.textContent =
                "$0";

        }


        return;

    }


    /*
     * MOSTRAR PRODUCTOS
     */

    contenedor.innerHTML = "";


    let total = 0;


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        const item =
            document.createElement(
                "div"
            );


        item.classList.add(
            "carrito-item"
        );


        item.innerHTML = `

            <div class="carrito-item-info">

                <h3>
                    ${producto.nombre}
                </h3>


                <p>

                    $${producto.precio
                        .toLocaleString("es-CO")}

                    cada uno

                </p>

            </div>


            <div class="cantidad-control">

                <button
                    onclick="disminuirCantidad(
                        ${producto.id}
                    )">

                    −

                </button>


                <span>

                    ${producto.cantidad}

                </span>


                <button
                    onclick="aumentarCantidad(
                        ${producto.id}
                    )">

                    +

                </button>

            </div>


            <div class="carrito-item-precio">

                <strong>

                    $${subtotal
                        .toLocaleString("es-CO")}

                </strong>


                <button
                    class="eliminar"
                    onclick="eliminarProducto(
                        ${producto.id}
                    )">

                    🗑️

                </button>

            </div>

        `;


        contenedor.appendChild(
            item
        );

    });


    /*
     * MOSTRAR TOTAL
     */

    const totalElemento =
        document.getElementById(
            "total-carrito"
        );


    if (totalElemento) {

        totalElemento.textContent =
            "$" +
            total.toLocaleString("es-CO");

    }

}


/* =========================================
   ABRIR CARRITO
========================================= */

function abrirCarrito() {

    document
        .getElementById(
            "carrito-panel"
        )
        .classList.add(
            "abierto"
        );

}


/* =========================================
   CERRAR CARRITO
========================================= */

function cerrarCarrito() {

    document
        .getElementById(
            "carrito-panel"
        )
        .classList.remove(
            "abierto"
        );

}


/* =========================================
   CALCULAR TOTAL
========================================= */

function calcularTotal() {

    return carrito.reduce(

        (total, producto) =>

            total +
            (
                producto.precio *
                producto.cantidad
            ),

        0

    );

}


/* =========================================
   OBTENER CLIENTE
========================================= */

function obtenerCliente() {

    const clienteGuardado =
        localStorage.getItem("cliente");


    if (!clienteGuardado) {

        return null;

    }


    try {

        return JSON.parse(
            clienteGuardado
        );

    } catch (error) {

        console.error(
            "Error leyendo cliente:",
            error
        );

        return null;

    }

}


/* =========================================
   FINALIZAR PEDIDO
========================================= */

async function finalizarPedido() {

    /*
     * VERIFICAR CARRITO
     */

    if (carrito.length === 0) {

        alert(
            "🛒 Tu carrito está vacío."
        );

        return;

    }


    /*
     * OBTENER CLIENTE LOGUEADO
     */

    const cliente =
        obtenerCliente();


    /*
     * SI NO HAY CLIENTE
     */

    if (!cliente) {

        alert(
            "⚠️ Debes iniciar sesión antes de realizar un pedido."
        );


        window.location.href =
            "login.html";


        return;

    }


    /*
     * CALCULAR TOTAL
     */

    const total =
        calcularTotal();


    /*
     * CONFIRMAR PEDIDO
     */

    const confirmar =
        confirm(

            "¿Deseas finalizar tu pedido?\n\n" +

            "Cliente: " +
            cliente.nombre +

            "\n" +

            "Total: $" +

            total.toLocaleString(
                "es-CO"
            )

        );


    if (!confirmar) {

        return;

    }


    try {

        /* =====================================
           CREAR PEDIDO
        ====================================== */

        const respuestaPedido =
            await fetch(
                PEDIDOS_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        ...FRONTEND_HEADER

                    },


                    body: JSON.stringify({

                        /*
                         * CLIENTE REAL
                         */

                        clienteId:
                            cliente.clienteId,


                        /*
                         * DOMICILIARIO
                         *
                         * Por ahora utilizamos 1.
                         * Lo cambiaremos cuando
                         * creemos el módulo.
                         */

                        domiciliarioId: 1,


                        /*
                         * FECHA
                         */

                        fechaPedido:
                            new Date()
                                .toISOString()
                                .split("T")[0],


                        /*
                         * TOTAL
                         */

                        valor: total,


                        /*
                         * ESTADO
                         */

                        estado:
                            "PENDIENTE"

                    })

                }

            );


        /*
         * VERIFICAR PEDIDO
         */

        if (!respuestaPedido.ok) {

            const textoError =
                await respuestaPedido.text();


            console.error(
                "Error del servidor:",
                textoError
            );


            throw new Error(
                "No se pudo crear el pedido"
            );

        }


        /*
         * RESPUESTA DEL BACKEND
         */

        const pedido =
            await respuestaPedido.json();


        console.log(
            "Pedido creado:",
            pedido
        );


        /* =====================================
           CREAR DETALLES
        ====================================== */

        for (
            const producto
            of carrito
        ) {

            const respuestaDetalle =
                await fetch(
                    DETALLE_PEDIDOS_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            ...FRONTEND_HEADER

                        },


                        body: JSON.stringify({

                            pedidoId:
                                pedido.pedidoId,

                            productoId:
                                producto.id,

                            cantidad:
                                producto.cantidad,

                            valorUnitario:
                                producto.precio,

                            estado:
                                "ACTIVO"

                        })

                    }

                );


            /*
             * VERIFICAR DETALLE
             */

            if (!respuestaDetalle.ok) {

                const textoError =
                    await respuestaDetalle.text();


                console.error(
                    "Error guardando detalle:",
                    textoError
                );


                throw new Error(
                    "No se pudo guardar uno de los productos del pedido"
                );

            }


            const detalle =
                await respuestaDetalle.json();


            console.log(
                "Detalle creado:",
                detalle
            );

        }


        /* =====================================
           PEDIDO COMPLETADO
        ====================================== */

        alert(

            "🎉 ¡PEDIDO REALIZADO CON ÉXITO!\n\n" +

            "Número de pedido: #" +

            pedido.pedidoId +

            "\n\n" +

            "Cliente: " +

            cliente.nombre +

            "\n\n" +

            "Total: $" +

            total.toLocaleString(
                "es-CO"
            )

        );


        /* =====================================
           VACIAR CARRITO
        ====================================== */

        carrito = [];


        guardarCarrito();


        actualizarCarrito();


        cerrarCarrito();


    } catch (error) {

        console.error(
            "Error al finalizar pedido:",
            error
        );


        alert(

            "❌ No se pudo finalizar el pedido.\n\n" +

            error.message

        );

    }

}


/* =========================================
   INICIAR APLICACIÓN
========================================= */

cargarProductos();

actualizarCarrito();