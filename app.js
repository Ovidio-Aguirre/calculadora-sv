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
        montoBaseIva.focus();
    });

    btnShowRenta.addEventListener('click', () => {
        menuPrincipal.classList.add('hidden');
        calcRentaContainer.classList.remove('hidden');
        actualizarFecha(fechaSistemaRenta);
        montoBaseRenta.focus();
    });

    btnsBack.forEach(btn => {
        btn.addEventListener('click', () => {
            menuPrincipal.classList.remove('hidden');
            calcIvaContainer.classList.add('hidden');
            calcRentaContainer.classList.add('hidden');
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
        totalPalabrasIva.textContent = `SON: ${numeroALetras(total, 'DÓLARES')}`;
    });

    montoBaseRenta.addEventListener('input', () => {
        const monto = parseFloat(montoBaseRenta.value) || 0;
        const renta = monto * 0.10;
        const total = monto + renta;

        rentaCalculada.value = renta.toFixed(2);
        totalRenta.value = total.toFixed(2);
        totalPalabrasRenta.textContent = `SON: ${numeroALetras(total, 'DÓLARES')}`;
    });

    // --- Funciones Auxiliares ---
    function actualizarFecha(elemento) {
        const fecha = new Date();
        const dia = fecha.getDate();
        const anio = fecha.getFullYear();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const nombreMes = meses[fecha.getMonth()];
        // Formateamos la fecha para que coincida exactamente con la imagen: "17 de Agosto del 2025"
        elemento.textContent = `Fecha del Sistema: ${dia} de ${nombreMes} del ${anio}`;
    }

    function limpiarCampos(inputs, palabras) {
        inputs.forEach(input => input.value = '');
        palabras.textContent = 'SON:';
    }

    // Función para convertir número a letras
    function numeroALetras(n, moneda) {
        if (n === 0) return `CERO CON 00/100 ${moneda}`;
        const entero = Math.floor(n);
        const decimales = Math.round((n - entero) * 100);
        const centavos = decimales < 10 ? `0${decimales}` : `${decimales}`;

        const unidades = ["", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
        const decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
        const centenas = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];
        const especiales = {11:"ONCE", 12:"DOCE", 13:"TRECE", 14:"CATORCE", 15:"QUINCE"};

        function convertir(num) {
            if (num < 10) return unidades[num];
            if (num > 10 && num < 16) return especiales[num];
            if (num < 100) {
                const u = num % 10;
                const d = Math.floor(num / 10);
                if (d === 1) return `DIECI${unidades[u]}`;
                if (d === 2) return u === 0 ? 'VEINTE' : `VEINTI${unidades[u]}`;
                return decenas[d] + (u > 0 ? ` Y ${unidades[u]}` : "");
            }
            if (num === 100) return "CIEN";
            if (num < 1000) {
                const c = Math.floor(num / 100);
                const resto = num % 100;
                return `${centenas[c]} ${convertir(resto)}`;
            }
             if (num === 1000) return "MIL";
            // Lógica para números mayores a 1000
            if (num < 2000) return `MIL ${convertir(num % 1000)}`;
            if (num < 1000000) {
                const miles = Math.floor(num / 1000);
                const resto = num % 1000;
                return `${convertir(miles)} MIL ${convertir(resto)}`;
            }
            return num.toString();
        }

        const letras = (entero === 1 && moneda.endsWith('S') ? 'UN' : convertir(entero)).trim();
        return `${letras} CON ${centavos}/100 ${moneda}`;
    }

    // --- Registro del Service Worker para PWA ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado con éxito.');
                })
                .catch(error => {
                    console.log('Error en el registro del Service Worker:', error);
                });
        });
    }
});
