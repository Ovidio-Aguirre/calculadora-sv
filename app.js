document.addEventListener('DOMContentLoaded', () => {

    // --- Seleccion de Elementos del DOM ---
    const menuPrincipal = document.getElementById('menu-principal');
    const calcIvaContainer = document.getElementById('calculadora-iva');
    const calcRentaContainer = document.getElementById('calculadora-renta');

    const btnShowIva = document.getElementById('btn-show-iva');
    const btnShowRenta = document.getElementById('btn-show-renta');
    const btnsBack = document.querySelectorAll('.btn-back');

    // --- Inputs y Outputs de la Calculadora de IVA ---
    const montoBaseIva = document.getElementById('monto-base-iva');
    const ivaCalculado = document.getElementById('iva-calculado');
    const totalIva = document.getElementById('total-iva');
    const totalPalabrasIva = document.getElementById('total-palabras-iva');
    const fechaSistemaIva = document.getElementById('fecha-sistema-iva');

    // --- Inputs y Outputs de la Calculadora de Renta ---
    const montoBaseRenta = document.getElementById('monto-base-renta');
    const rentaCalculada = document.getElementById('renta-calculada');
    const totalRenta = document.getElementById('total-renta');
    const totalPalabrasRenta = document.getElementById('total-palabras-renta');
    const fechaSistemaRenta = document.getElementById('fecha-sistema-renta');

    // --- Navegación ---
    btnShowIva.addEventListener('click', () => {
        menuPrincipal.classList.add('hidden');
        calcIvaContainer.classList.remove('hidden');
        actualizarFecha(fechaSistemaIva);
    });

    btnShowRenta.addEventListener('click', () => {
        menuPrincipal.classList.add('hidden');
        calcRentaContainer.classList.remove('hidden');
        actualizarFecha(fechaSistemaRenta);
    });

    btnsBack.forEach(btn => {
        btn.addEventListener('click', () => {
            menuPrincipal.classList.remove('hidden');
            calcIvaContainer.classList.add('hidden');
            calcRentaContainer.classList.add('hidden');
            // Limpiar campos al volver
            limpiarCampos([montoBaseIva, ivaCalculado, totalIva], totalPalabrasIva);
            limpiarCampos([montoBaseRenta, rentaCalculada, totalRenta], totalPalabrasRenta);
        });
    });

    // --- Lógica de Cálculos ---
    montoBaseIva.addEventListener('input', () => {
        const monto = parseFloat(montoBaseIva.value) || 0;
        const iva = monto * 0.13;
        const total = monto + iva;

        ivaCalculado.value = iva.toFixed(2);
        totalIva.value = total.toFixed(2);
        totalPalabrasIva.textContent = `SON: ${numeroALetras(total)} DÓLARES`;
    });

    montoBaseRenta.addEventListener('input', () => {
        const monto = parseFloat(montoBaseRenta.value) || 0;
        const renta = monto * 0.10;
        const total = monto + renta; // Asumiendo que el total es la suma, como en la imagen.

        rentaCalculada.value = renta.toFixed(2);
        totalRenta.value = total.toFixed(2);
        totalPalabrasRenta.textContent = `SON: ${numeroALetras(total)} DÓLARES`;
    });

    // --- Funciones Auxiliares ---
    function actualizarFecha(elemento) {
        const fecha = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-SV', opciones);
        elemento.textContent = `Fecha del Sistema: ${fechaFormateada}`;
    }

    function limpiarCampos(inputs, palabras) {
        inputs.forEach(input => input.value = '');
        palabras.textContent = 'SON:';
    }
    
    // Función para convertir número a letras
    function numeroALetras(n) {
        if (n === 0) return "CERO CON 00/100";
        const entero = Math.floor(n);
        const decimales = Math.round((n - entero) * 100);
        const centavos = decimales < 10 ? `0${decimales}` : `${decimales}`;

        // Esta es una función simplificada para la conversión a letras.
        // Se puede expandir o reemplazar con una librería si se necesita más complejidad.
        const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
        const decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
        const especiales = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"];

        function convertir(num) {
            if (num < 10) return unidades[num];
            if (num < 20) return especiales[num - 10];
            if (num < 100) {
                const u = num % 10;
                const d = Math.floor(num / 10);
                return decenas[d] + (u > 0 ? ` Y ${unidades[u]}` : "");
            }
             if (num === 100) return "CIEN";
            // Para números más grandes, se necesitaría una lógica más compleja.
            // Para este caso, mantenemos una versión simple.
            return num.toString(); // Fallback para números > 100
        }

        const letras = convertir(entero);
        return `${letras} CON ${centavos}/100`;
    }

});