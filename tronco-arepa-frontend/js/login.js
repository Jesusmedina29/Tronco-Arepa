const API_CLIENTES =
    "http://localhost:8081/api/clientes";


document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const correo =
                document
                    .getElementById("correo")
                    .value
                    .trim();


            const mensaje =
                document
                    .getElementById("mensaje-login");


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
                        "No se pudieron consultar los clientes"
                    );

                }


                const clientes =
                    await respuesta.json();


                const cliente =
                    clientes.find(
                        c =>
                            c.correo.toLowerCase()
                            === correo.toLowerCase()
                    );


                if (!cliente) {

                    mensaje.innerHTML = `
                    
                        <p style="color:red;">
                            ❌ Cliente no encontrado.
                        </p>

                    `;

                    return;

                }


                if (cliente.estado !== "ACTIVO") {

                    mensaje.innerHTML = `

                        <p style="color:red;">
                            ❌ Este cliente está inactivo.
                        </p>

                    `;

                    return;

                }


                /*
                 * GUARDAR CLIENTE EN EL NAVEGADOR
                 */

                localStorage.setItem(
                    "cliente",
                    JSON.stringify(cliente)
                );


                /*
                 * IR AL MENÚ
                 */

                window.location.href =
                    "productos.html";


            } catch (error) {

                console.error(error);


                mensaje.innerHTML = `

                    <p style="color:red;">
                        ❌ Error al iniciar sesión.
                    </p>

                `;

            }

        }
    );