const API_LOGIN =
    "http://localhost:8081/api/auth/login-admin";


const formulario =
    document.getElementById(
        "adminLoginForm"
    );


formulario.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const correo =
            document
                .getElementById("correo")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const mensaje =
            document.getElementById(
                "mensaje-admin"
            );


        mensaje.innerHTML = `
            <p>
                🔄 Verificando acceso...
            </p>
        `;


        try {

            const respuesta =
                await fetch(
                    API_LOGIN,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "X-Frontend-App":
                                "tronco-arepa"

                        },

                        body: JSON.stringify({

                            correo: correo,

                            password: password

                        })

                    }
                );


            const datos =
                await respuesta.json();


            if (!respuesta.ok) {

                mensaje.innerHTML = `

                    <p style="color: red;">

                        ❌ ${
                            typeof datos === "string"
                                ? datos
                                : "No se pudo iniciar sesión"
                        }

                    </p>

                `;

                return;

            }


            /*
             * GUARDAR DATOS DEL ADMINISTRADOR
             */

            localStorage.setItem(
                "admin",
                JSON.stringify(datos)
            );


            /*
             * REDIRIGIR AL PANEL
             */

            window.location.href =
                "admin.html";

        }


        catch (error) {

            console.error(
                "Error:",
                error
            );


            mensaje.innerHTML = `

                <p style="color: red;">

                    ❌ No se pudo conectar
                    con el servidor.

                    <br><br>

                    Verifica que Spring Boot
                    esté ejecutándose.

                </p>

            `;

        }

    }
);