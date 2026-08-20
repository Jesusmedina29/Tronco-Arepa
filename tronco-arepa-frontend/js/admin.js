const API_PRODUCTOS =
    "http://localhost:8081/api/productos";

const API_PEDIDOS =
    "http://localhost:8081/api/pedidos";

const API_CLIENTES =
    "http://localhost:8081/api/clientes";

const API_DETALLES =
    "http://localhost:8081/api/detalle-pedidos";


/* =========================================
   INICIAR
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarProductosAdmin();

    }
);


/* =========================================
   MOSTRAR MODULO
========================================= */

function mostrarModulo(
    nombre,
    boton = null
) {

    const modulos =
        document.querySelectorAll(
            ".modulo-admin"
        );

    modulos.forEach(
        modulo => {

            modulo.style.display =
                "none";

        }
    );


    const modulo =
        document.getElementById(
            "modulo-" + nombre
        );


    if (modulo) {

        modulo.style.display =
            "block";

    }


    const botones =
        document.querySelectorAll(
            ".menu-admin"
        );


    botones.forEach(
        b => {

            b.classList.remove(
                "activo"
            );

        }
    );


    if (boton) {

        boton.classList.add(
            "activo"
        );

    }


    if (nombre === "productos") {

        cargarProductosAdmin();

    }


    if (nombre === "pedidos") {

        cargarPedidosAdmin();

    }


    if (nombre === "clientes") {

        cargarClientesAdmin();

    }

}


/* =========================================
   MOSTRAR DESDE TARJETA
========================================= */

function mostrarModuloPorId(
    nombre
) {

    const botones =
        document.querySelectorAll(
            ".menu-admin"
        );


    let botonEncontrado = null;


    botones.forEach(
        boton => {

            if (
                boton
                    .getAttribute("onclick")
                    ?.includes(
                        "'" + nombre + "'"
                    )
            ) {

                botonEncontrado =
                    boton;

            }

        }
    );


    mostrarModulo(
        nombre,
        botonEncontrado
    );

}


/* =========================================
   PRODUCTOS
========================================= */

async function cargarProductosAdmin() {

    const tabla =
        document.getElementById(
            "tabla-productos-body"
        );


    if (!tabla) {

        return;

    }


    tabla.innerHTML = `

        <tr>

            <td
                colspan="6"
                class="cargando-tabla">

                🔄 Cargando productos...

            </td>

        </tr>

    `;


    try {

        const respuesta =
            await fetch(
                API_PRODUCTOS,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Error al cargar productos"
            );

        }


        const productos =
            await respuesta.json();


        tabla.innerHTML = "";


        if (
            productos.length === 0
        ) {

            tabla.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="cargando-tabla">

                        📦 No hay productos.

                    </td>

                </tr>

            `;

            return;

        }


        productos.forEach(
            producto => {

                const fila =
                    document.createElement(
                        "tr"
                    );


                const estadoClase =
                    producto.estado ===
                    "ACTIVO"
                        ? "estado-activo"
                        : "estado-agotado";


                fila.innerHTML = `

                    <td>
                        ${producto.productoId}
                    </td>

                    <td>
                        <strong>
                            ${producto.nombre}
                        </strong>
                    </td>

                    <td>
                        ${producto.descripcion || ""}
                    </td>

                    <td>
                        $${Number(
                            producto.precio
                        ).toLocaleString(
                            "es-CO"
                        )}
                    </td>

                    <td>

                        <span
                            class="${estadoClase}">

                            ● ${producto.estado}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn-editar"
                            onclick="editarProducto(
                                ${producto.productoId}
                            )">

                            ✏️ Editar

                        </button>


                        <button
                            class="btn-eliminar"
                            onclick="eliminarProducto(
                                ${producto.productoId}
                            )">

                            🗑️

                        </button>

                    </td>

                `;


                tabla.appendChild(
                    fila
                );

            }
        );

    }

    catch (error) {

        console.error(error);


        tabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="error-tabla">

                    ⚠️ No se pudieron
                    cargar los productos.

                </td>

            </tr>

        `;

    }

}


/* =========================================
   FORMULARIO PRODUCTO
========================================= */

function abrirFormularioProducto() {

    document.getElementById(
        "formulario-producto"
    ).style.display =
        "block";


    document.getElementById(
        "titulo-formulario"
    ).textContent =
        "➕ Nuevo producto";


    document.getElementById(
        "producto-id"
    ).value = "";


    document.getElementById(
        "producto-nombre"
    ).value = "";


    document.getElementById(
        "producto-precio"
    ).value = "";


    document.getElementById(
        "producto-descripcion"
    ).value = "";


    document.getElementById(
        "producto-estado"
    ).value = "ACTIVO";

}


/* =========================================
   CERRAR FORMULARIO
========================================= */

function cerrarFormularioProducto() {

    document.getElementById(
        "formulario-producto"
    ).style.display =
        "none";

}


/* =========================================
   GUARDAR PRODUCTO
========================================= */

async function guardarProducto() {

    const id =
        document.getElementById(
            "producto-id"
        ).value;


    const nombre =
        document.getElementById(
            "producto-nombre"
        ).value.trim();


    const descripcion =
        document.getElementById(
            "producto-descripcion"
        ).value.trim();


    const precio =
        Number(
            document.getElementById(
                "producto-precio"
            ).value
        );


    const estado =
        document.getElementById(
            "producto-estado"
        ).value;


    if (
        !nombre ||
        !precio ||
        precio <= 0
    ) {

        alert(
            "⚠️ Ingresa un nombre y un precio válido."
        );

        return;

    }


    const producto = {

        nombre: nombre,

        descripcion: descripcion,

        precio: precio,

        estado: estado

    };


    try {

        let url =
            API_PRODUCTOS;

        let metodo =
            "POST";


        if (id) {

            url =
                `${API_PRODUCTOS}/${id}`;

            metodo =
                "PUT";

            producto.productoId =
                Number(id);

        }


        const respuesta =
            await fetch(
                url,
                {

                    method: metodo,

                    headers: {

                        "Content-Type":
                            "application/json",

                        "X-Frontend-App":
                            "tronco-arepa"

                    },

                    body:
                        JSON.stringify(
                            producto
                        )

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo guardar el producto"
            );

        }


        alert(
            id
                ? "✅ Producto actualizado."
                : "✅ Producto creado."
        );


        cerrarFormularioProducto();

        cargarProductosAdmin();

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ No se pudo guardar el producto."
        );

    }

}


/* =========================================
   EDITAR PRODUCTO
========================================= */

async function editarProducto(id) {

    try {

        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${id}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Producto no encontrado"
            );

        }


        const producto =
            await respuesta.json();


        document.getElementById(
            "formulario-producto"
        ).style.display =
            "block";


        document.getElementById(
            "titulo-formulario"
        ).textContent =
            "✏️ Editar producto";


        document.getElementById(
            "producto-id"
        ).value =
            producto.productoId;


        document.getElementById(
            "producto-nombre"
        ).value =
            producto.nombre;


        document.getElementById(
            "producto-precio"
        ).value =
            producto.precio;


        document.getElementById(
            "producto-descripcion"
        ).value =
            producto.descripcion || "";


        document.getElementById(
            "producto-estado"
        ).value =
            producto.estado;

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ No se pudo cargar el producto."
        );

    }

}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

async function eliminarProducto(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este producto?"
        );


    if (!confirmar) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${id}`,
                {

                    method: "DELETE",

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo eliminar"
            );

        }


        alert(
            "✅ Producto eliminado."
        );


        cargarProductosAdmin();

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ No se pudo eliminar el producto."
        );

    }

}


/* =========================================
   PEDIDOS
========================================= */

async function cargarPedidosAdmin() {

    const tabla =
        document.getElementById(
            "tabla-pedidos-body"
        );


    if (!tabla) {

        return;

    }


    tabla.innerHTML = `

        <tr>

            <td
                colspan="7"
                class="cargando-tabla">

                🔄 Cargando pedidos...

            </td>

        </tr>

    `;


    try {

        const respuesta =
            await fetch(
                API_PEDIDOS,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Error al obtener pedidos"
            );

        }


        const pedidos =
            await respuesta.json();


        tabla.innerHTML = "";


        if (
            pedidos.length === 0
        ) {

            tabla.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="cargando-tabla">

                        🛒 No hay pedidos registrados.

                    </td>

                </tr>

            `;

            return;

        }


        for (
            const pedido of pedidos
        ) {

            const cliente =
                await obtenerCliente(
                    pedido.clienteId
                );


            const fila =
                document.createElement(
                    "tr"
                );


            const estadoClase =
                obtenerClaseEstado(
                    pedido.estado
                );


            fila.innerHTML = `

                <td>

                    <strong>
                        #${pedido.pedidoId}
                    </strong>

                </td>


                <td>

                    ${
                        cliente
                            ? cliente.nombre
                            : "Cliente #" +
                              pedido.clienteId
                    }

                </td>


                <td>

                    ${pedido.fechaPedido}

                </td>


                <td>

                    <strong>

                        $${Number(
                            pedido.valor
                        ).toLocaleString(
                            "es-CO"
                        )}

                    </strong>

                </td>


                <td>

                    ${
                        pedido.domiciliarioId
                            ? "#" +
                              pedido.domiciliarioId
                            : "Sin asignar"
                    }

                </td>


                <td>

                    <span
                        class="${estadoClase}">

                        ● ${pedido.estado}

                    </span>

                </td>


                <td>

                    <button
                        class="btn-editar"
                        onclick="verPedido(
                            ${pedido.pedidoId}
                        )">

                        👁️ Ver

                    </button>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        }

    }

    catch (error) {

        console.error(error);


        tabla.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="error-tabla">

                    ⚠️ No se pudieron cargar
                    los pedidos.

                </td>

            </tr>

        `;

    }

}


/* =========================================
   OBTENER CLIENTE
========================================= */

async function obtenerCliente(
    clienteId
) {

    if (!clienteId) {

        return null;

    }


    try {

        const respuesta =
            await fetch(
                `${API_CLIENTES}/${clienteId}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            return null;

        }


        return await respuesta.json();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}


/* =========================================
   OBTENER PRODUCTO
========================================= */

async function obtenerProducto(
    productoId
) {

    if (!productoId) {

        return null;

    }


    try {

        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${productoId}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            console.error(
                "No se pudo obtener producto:",
                productoId
            );

            return null;

        }


        const producto =
            await respuesta.json();


        return producto;

    }

    catch (error) {

        console.error(
            "Error obteniendo producto:",
            error
        );

        return null;

    }

}


/* =========================================
   VER PEDIDO
========================================= */

async function verPedido(id) {

    const contenedor =
        document.getElementById(
            "detalle-pedido"
        );


    const contenido =
        document.getElementById(
            "contenido-detalle-pedido"
        );


    if (!contenedor || !contenido) {

        console.error(
            "No se encontró el contenedor del detalle."
        );

        return;

    }


    contenedor.style.display =
        "block";


    contenido.innerHTML = `

        <div class="cargando-detalle">

            🔄 Cargando información
            del pedido...

        </div>

    `;


    try {

        /* =====================================
           PEDIDO
        ===================================== */

        const respuestaPedido =
            await fetch(
                `${API_PEDIDOS}/${id}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuestaPedido.ok) {

            throw new Error(
                "Pedido no encontrado"
            );

        }


        const pedido =
            await respuestaPedido.json();


        /* =====================================
           CLIENTE
        ===================================== */

        const cliente =
            await obtenerCliente(
                pedido.clienteId
            );


        /* =====================================
           DETALLES
        ===================================== */

        const respuestaDetalles =
            await fetch(
                `${API_DETALLES}/pedido/${id}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        let detalles = [];


        if (
            respuestaDetalles.ok
        ) {

            detalles =
                await respuestaDetalles.json();

        }


        /* =====================================
           CONSTRUIR PRODUCTOS
        ===================================== */

        let productosHTML = "";

        let totalCalculado = 0;


        if (
            detalles.length === 0
        ) {

            productosHTML = `

                <div class="sin-detalles">

                    ⚠️ Este pedido no tiene
                    productos registrados
                    en detalle.

                </div>

            `;

        }

        else {

            for (
                const detalle of detalles
            ) {

                /*
                 * AQUÍ ESTÁ LA CORRECCIÓN:
                 * Buscamos el producto usando
                 * el productoId del detalle.
                 */

                const producto =
                    await obtenerProducto(
                        detalle.productoId
                    );


                const nombreProducto =
                    producto &&
                    producto.nombre
                        ? producto.nombre
                        : "Producto #" +
                          detalle.productoId;


                const descripcionProducto =
                    producto &&
                    producto.descripcion
                        ? producto.descripcion
                        : "";


                const precioUnitario =
                    Number(
                        detalle.valorUnitario
                    );


                const cantidad =
                    Number(
                        detalle.cantidad
                    );


                const subtotal =
                    precioUnitario *
                    cantidad;


                totalCalculado +=
                    subtotal;


                productosHTML += `

                    <div class="producto-pedido">

                        <div class="producto-pedido-icono">

                            🍔

                        </div>


                        <div class="producto-pedido-info">

                            <h4>

                                ${nombreProducto}

                            </h4>


                            ${
                                descripcionProducto
                                    ? `
                                    <p>
                                        ${descripcionProducto}
                                    </p>
                                    `
                                    : ""
                            }


                            <p>

                                Cantidad:
                                <strong>

                                    ${cantidad}

                                </strong>

                            </p>


                            <p>

                                Precio unitario:
                                <strong>

                                    $${precioUnitario.toLocaleString(
                                        "es-CO"
                                    )}

                                </strong>

                            </p>

                        </div>


                        <div class="producto-pedido-total">

                            <strong>

                                $${subtotal.toLocaleString(
                                    "es-CO"
                                )}

                            </strong>

                        </div>

                    </div>

                `;

            }

        }


        /* =====================================
           MOSTRAR INFORMACIÓN
        ===================================== */

        contenido.innerHTML = `

            <div class="detalle-header">

                <div>

                    <span class="detalle-etiqueta">

                        PEDIDO

                    </span>

                    <h2>

                        🧾 #${pedido.pedidoId}

                    </h2>

                </div>


                <button
                    class="btn-cerrar-detalle"
                    onclick="cerrarDetallePedido()">

                    ✕

                </button>

            </div>


            <div class="detalle-grid">


                <!-- CLIENTE -->

                <div class="detalle-bloque">

                    <h3>

                        👤 Cliente

                    </h3>


                    <p>

                        <strong>
                            Nombre:
                        </strong>

                        ${
                            cliente
                                ? cliente.nombre
                                : "Cliente #" +
                                  pedido.clienteId
                        }

                    </p>


                    <p>

                        <strong>
                            Teléfono:
                        </strong>

                        ${
                            cliente
                                ? cliente.telefono
                                : "No disponible"
                        }

                    </p>


                    <p>

                        <strong>
                            Dirección:
                        </strong>

                        ${
                            cliente
                                ? cliente.direccion
                                : "No disponible"
                        }

                    </p>


                    <p>

                        <strong>
                            Correo:
                        </strong>

                        ${
                            cliente
                                ? cliente.correo
                                : "No disponible"
                        }

                    </p>

                </div>


                <!-- INFORMACIÓN PEDIDO -->

                <div class="detalle-bloque">

                    <h3>

                        📋 Información

                    </h3>


                    <p>

                        <strong>
                            Fecha:
                        </strong>

                        ${pedido.fechaPedido}

                    </p>


                    <p>

                        <strong>
                            Domiciliario:
                        </strong>

                        ${
                            pedido.domiciliarioId
                                ? "#" +
                                  pedido.domiciliarioId
                                : "Sin asignar"
                        }

                    </p>


                    <p>

                        <strong>
                            Estado actual:
                        </strong>

                        <span
                            class="${obtenerClaseEstado(
                                pedido.estado
                            )}">

                            ● ${pedido.estado}

                        </span>

                    </p>

                </div>

            </div>


            <!-- PRODUCTOS -->

            <div class="detalle-productos">

                <h3>

                    🛍️ Productos del pedido

                </h3>


                ${productosHTML}

            </div>


            <!-- TOTAL -->

            <div class="detalle-total">

                <span>

                    TOTAL DEL PEDIDO

                </span>


                <strong>

                    $${Number(
                        pedido.valor
                    ).toLocaleString(
                        "es-CO"
                    )}

                </strong>

            </div>


            <!-- ESTADO -->

            <div class="cambiar-estado">

                <h3>

                    🔄 Cambiar estado

                </h3>


                <select
                    id="estado-pedido-${pedido.pedidoId}">

                    <option
                        value="PENDIENTE"
                        ${
                            pedido.estado ===
                            "PENDIENTE"
                                ? "selected"
                                : ""
                        }>

                        PENDIENTE

                    </option>


                    <option
                        value="CONFIRMADO"
                        ${
                            pedido.estado ===
                            "CONFIRMADO"
                                ? "selected"
                                : ""
                        }>

                        CONFIRMADO

                    </option>


                    <option
                        value="EN PREPARACION"
                        ${
                            pedido.estado ===
                            "EN PREPARACION"
                                ? "selected"
                                : ""
                        }>

                        EN PREPARACIÓN

                    </option>


                    <option
                        value="EN CAMINO"
                        ${
                            pedido.estado ===
                            "EN CAMINO"
                                ? "selected"
                                : ""
                        }>

                        EN CAMINO

                    </option>


                    <option
                        value="ENTREGADO"
                        ${
                            pedido.estado ===
                            "ENTREGADO"
                                ? "selected"
                                : ""
                        }>

                        ENTREGADO

                    </option>


                    <option
                        value="CANCELADO"
                        ${
                            pedido.estado ===
                            "CANCELADO"
                                ? "selected"
                                : ""
                        }>

                        CANCELADO

                    </option>

                </select>


                <button
                    class="btn-guardar"
                    onclick="actualizarEstadoPedido(
                        ${pedido.pedidoId}
                    )">

                    💾 Guardar estado

                </button>

            </div>

        `;


        contenedor.scrollIntoView({
            behavior: "smooth"
        });

    }

    catch (error) {

        console.error(error);


        contenido.innerHTML = `

            <div class="error-detalle">

                ⚠️ No se pudo cargar
                el pedido.

            </div>

        `;

    }

}


/* =========================================
   ACTUALIZAR ESTADO
========================================= */

async function actualizarEstadoPedido(
    id
) {

    const select =
        document.getElementById(
            `estado-pedido-${id}`
        );


    if (!select) {

        return;

    }


    const nuevoEstado =
        select.value;


    try {

        const respuestaBuscar =
            await fetch(
                `${API_PEDIDOS}/${id}`,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuestaBuscar.ok) {

            throw new Error(
                "No se encontró el pedido"
            );

        }


        const pedido =
            await respuestaBuscar.json();


        pedido.estado =
            nuevoEstado;


        const respuesta =
            await fetch(
                `${API_PEDIDOS}/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "X-Frontend-App":
                            "tronco-arepa"

                    },

                    body:
                        JSON.stringify(
                            pedido
                        )

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo actualizar"
            );

        }


        alert(
            "✅ Estado del pedido actualizado."
        );


        cargarPedidosAdmin();

        verPedido(id);

    }

    catch (error) {

        console.error(error);


        alert(
            "❌ No se pudo actualizar el estado."
        );

    }

}


/* =========================================
   CERRAR DETALLE
========================================= */

function cerrarDetallePedido() {

    const detalle =
        document.getElementById(
            "detalle-pedido"
        );


    if (detalle) {

        detalle.style.display =
            "none";

    }

}


/* =========================================
   ESTADO
========================================= */

function obtenerClaseEstado(
    estado
) {

    switch (estado) {

        case "PENDIENTE":

            return "estado-pendiente";


        case "CONFIRMADO":

            return "estado-confirmado";


        case "EN PREPARACION":

            return "estado-preparacion";


        case "EN CAMINO":

            return "estado-camino";


        case "ENTREGADO":

            return "estado-entregado";


        case "CANCELADO":

            return "estado-cancelado";


        default:

            return "estado-pendiente";

    }

}


/* =========================================
   CLIENTES
========================================= */

async function cargarClientesAdmin() {

    const tabla =
        document.getElementById(
            "tabla-clientes-body"
        );


    if (!tabla) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                API_CLIENTES,
                {

                    headers: {

                        "X-Frontend-App":
                            "tronco-arepa"

                    }

                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Error al cargar clientes"
            );

        }


        const clientes =
            await respuesta.json();


        tabla.innerHTML = "";


        if (
            clientes.length === 0
        ) {

            tabla.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="cargando-tabla">

                        👥 No hay clientes.

                    </td>

                </tr>

            `;

            return;

        }


        clientes.forEach(
            cliente => {

                const fila =
                    document.createElement(
                        "tr"
                    );


                fila.innerHTML = `

                    <td>
                        ${cliente.clienteId}
                    </td>

                    <td>
                        <strong>
                            ${cliente.nombre}
                        </strong>
                    </td>

                    <td>
                        ${cliente.telefono}
                    </td>

                    <td>
                        ${cliente.direccion}
                    </td>

                    <td>
                        ${cliente.correo}
                    </td>

                    <td>

                        <span
                            class="${
                                cliente.estado ===
                                "ACTIVO"
                                    ? "estado-activo"
                                    : "estado-agotado"
                            }">

                            ● ${cliente.estado}

                        </span>

                    </td>

                `;


                tabla.appendChild(
                    fila
                );

            }
        );

    }

    catch (error) {

        console.error(error);


        tabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="error-tabla">

                    ⚠️ No se pudieron
                    cargar los clientes.

                </td>

            </tr>

        `;

    }

}


/* =========================================
   CERRAR SESIÓN
========================================= */

function cerrarSesionAdmin() {

    const confirmar =
        confirm(
            "¿Deseas cerrar la sesión?"
        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        "admin"
    );


    window.location.href =
        "admin-login.html";

}