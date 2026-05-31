/* ==========================
   ML TRAVELING - SCRIPT.JS
========================== */

/*
BASE DE TARIFAS
Sedán = tarifa base
*/

const tarifas = {
    "Hilton San Salvador": {
        sedan: 40,
        microbus: 17.5
    },

    "Escalón": {
        sedan: 40,
        microbus: 17.5
    },

    "Santa Tecla": {
        sedan: 45,
        microbus: 18
    },

    "El Tunco": {
        sedan: 50,
        microbus: 20
    },

    "Santa Ana": {
        sedan: 85,
        microbus: 22
    },

    "Sonsonate": {
        sedan: 95,
        microbus: 24
    },

    "Ataco": {
        sedan: 100,
        microbus: 25
    },

    "San Miguel": {
        sedan: 100,
        microbus: 30
    },

    "La Unión": {
        sedan: 140,
        microbus: 35
    }
};

/* ==========================
   ELEMENTOS HTML
========================== */

const botonCalcular =
    document.querySelector("#calculate-btn");

const resultadoPrecio =
    document.querySelector("#price-result");

const resultadoDeposito =
    document.querySelector("#deposit-result");

const botonWhatsapp =
    document.querySelector("#whatsapp-btn");

/* ==========================
   EVENTO CLICK
========================== */

botonCalcular.addEventListener(
    "click",
    calcularTarifa
);

/* ==========================
   FUNCION PRINCIPAL
========================== */

function calcularTarifa() {

    const origen =
        document.querySelector("#origen")
        .value;

    const destino =
        document.querySelectorAll("select")[0]
        .value;

    let vehiculo =
        document.querySelectorAll("select")[1]
        .value;

    const equipaje =
        document.querySelector("#equipaje")
        .value;

    const fecha =
        document.querySelector(
            'input[type="date"]'
        ).value;

    const hora =
        document.querySelector(
            'input[type="time"]'
        ).value;

    let pasajeros =
        parseInt(
            document.querySelector(
                "#pasajeros"
            ).value
        ) || 1;

    let precio = 0;

    let recomendacion = "";

    /* VALIDACIONES */

    if (
        destino === "Destino"
    ) {
        alert(
            "Selecciona un destino."
        );

        return;
    }

    if (
        vehiculo === "Vehículo"
    ) {
        alert(
            "Selecciona un vehículo."
        );

        return;
    }

    /* ===================
       CONTROL PASAJEROS
    =================== */

    if (
        vehiculo === "Kia Forte" ||
        vehiculo === "Mazda CX5"
    ) {

        /* maximo sedan */

        if (pasajeros > 4) {

            vehiculo =
                "Microbus";

            recomendacion =
                "Más de 4 pasajeros detectados. Se recomienda Microbus.";

        }

        /* 4 pasajeros */

        else if (
            pasajeros === 4
        ) {

            if (
                equipaje === "M" ||
                equipaje === "L"
            ) {

                const precioDosSedanes =
                    tarifas[destino]
                    .sedan * 2;

                const pasajerosMicrobus =
    pasajeros < 5
        ? 5
        : pasajeros;

const precioMicrobus =
    tarifas[destino]
    .microbus *
    pasajerosMicrobus;

                resultadoPrecio.innerHTML =
`
Dos sedanes: $${precioDosSedanes}<br>
Microbus opcional: $${precioMicrobus}
`;

                resultadoDeposito.innerText =
                    "Recomendación por espacio de equipaje.";

                botonWhatsapp.style.display =
                    "block";

                return;
            }
        }
    }

    /* ===================
       KIA
    =================== */

    if (
        vehiculo === "Kia Forte"
    ) {

        precio =
            tarifas[destino]
            .sedan;
    }

    /* ===================
       MAZDA (+40%)
    =================== */

    else if (
        vehiculo ===
        "Mazda CX5"
    ) {

        precio =
            tarifas[destino]
            .sedan * 1.4;
    }

    /* ===================
       MICROBUS
    =================== */

    else if (
        vehiculo ===
        "Microbus"
    ) {

        if (
            pasajeros < 5
        ) {
            pasajeros = 5;
        }

        precio =
            tarifas[destino]
            .microbus *
            pasajeros;
    }

    precio =
        Math.round(precio);

    const deposito =
        Math.round(
            precio * 0.30
        );

    resultadoPrecio.innerHTML =
`
Tarifa estimada: $${precio}
<br>
${recomendacion}
`;

    resultadoDeposito.innerText =
        `Reserva requerida (30%): $${deposito}`;

    botonWhatsapp.style.display =
        "block";

    botonWhatsapp.onclick =
        function () {

            const mensaje =
`Hola ML Traveling.

Quiero reservar un traslado.

Origen: ${origen}
Destino: ${destino}
Vehículo: ${vehiculo}
Pasajeros: ${pasajeros}
Equipaje: ${equipaje}
Fecha: ${fecha}
Hora: ${hora}

Tarifa estimada: $${precio}

Reserva requerida: $${deposito}`;

            const url =
`https://wa.me/50374694306?text=${encodeURIComponent(mensaje)}`;

            window.open(
                url,
                "_blank"
            );
        };
}