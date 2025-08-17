document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // ¡¡¡IMPORTANTE!!!
    // REEMPLAZA ESTAS DOS LÍNEAS CON TUS PROPIAS URLS
    // -------------------------------------------------------------------
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykudCYVnzz4-nO-Q_oZmYCbXrbQg7xMU9tcsbJ-dH25FA9cfJqlojMiCpR2QD9iEjV/exec'; 
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1SxZeanIn6-7IjeHzWc0XEcmU1EKvEetKdU5FmcKMBvg/edit?usp=sharing';
    // -------------------------------------------------------------------

    // --- ELEMENTOS DEL MENÚ PRINCIPAL ---
    const menuPrincipal = document.getElementById('menu-principal');
    const btnShowIva = document.getElementById('btn-show-iva');
    const btnShowRenta = document.getElementById('btn-show-renta');
    const btnShowProyecto = document.getElementById('btn-show-proyecto');

    // --- CONTENEDORES DE SECCIONES ---
    const calcIvaContainer = document.getElementById('calculadora-iva');
    const calcRentaContainer = document.getElementById('calculadora-renta');
    const proyectoContainer = document.getElementById('proyecto-container');
    const btnsBack = document.querySelectorAll('.btn-back');

    // --- ELEMENTOS CALCULADORA IVA ---
    const montoBaseIva = document.getElementById('monto-base-iva');
    const ivaCalculado = document.getElementById('iva-calculado');
    const totalIva = document.getElementById('total-iva');
    const totalPalabrasIva = document.getElementById('total-palabras-iva');
    const fechaSistemaIva = document.getElementById('fecha-sistema-iva');

    // --- ELEMENTOS CALCULADORA RENTA ---
    const montoBaseRenta = document.getElementById('monto-base-renta');
    const rentaCalculada = document.getElementById('renta-calculada');
    const totalRenta = document.getElementById('total-renta');
    const totalPalabrasRenta = document.getElementById('total-palabras-renta');
    const fechaSistemaRenta = document.getElementById('fecha-sistema-renta');

    // --- ELEMENTOS PROYECTO VENTAS ---
    // Login
    const loginScreen = document.getElementById('login-screen');
    const inputUser = document.getElementById('input-user');
    const inputPass = document.getElementById('input-pass');
    const btnLogin = document.getElementById('btn-login');
    const loginError = document.getElementById('login-error');
    // Vistas
    const vistaVendedor = document.getElementById('vista-vendedor');
    const vistaSupervisor = document.getElementById('vista-supervisor');
    // Formulario de Vendedor
    const welcomeVendedor = document.getElementById('welcome-vendedor');
    const inputMes = document.getElementById('input-mes');
    const inputFecha = document.getElementById('input-fecha');
    const inputPaquete = document.getElementById('input-paquete');
    const inputPrecio = document.getElementById('input-precio');
    const btnAgregarVenta = document.getElementById('btn-agregar-venta');
    
    let currentUser = null; // Variable para guardar el nombre del vendedor logueado

    // --- NAVEGACIÓN ---
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
    
    btnShowProyecto.addEventListener('click', () => {
        menuPrincipal.classList.add('hidden');
        proyectoContainer.classList.remove('hidden');
        // Asegurarse de que al entrar siempre se vea el login
        loginScreen.classList.remove('hidden');
        vistaVendedor.classList.add('hidden');
        vistaSupervisor.classList.add('hidden');
    });

    btnsBack.forEach(btn => {
        btn.addEventListener('click', () => {
            menuPrincipal.classList.remove('hidden');
            proyectoContainer.classList.add('hidden');
            calcIvaContainer.classList.add('hidden');
            calcRentaContainer.classList.add('hidden');
            // Limpiar campos de login al salir
            inputUser.value = '';
            inputPass.value = '';
            loginError.classList.add('hidden');
        });
    });

    // --- LÓGICA DE LOGIN ---
    btnLogin.addEventListener('click', () => {
        const username = inputUser.value.trim();
        const password = inputPass.value.trim();

        if (!username || !password) {
            loginError.textContent = 'Ingresa usuario y contraseña.';
            loginError.classList.remove('hidden');
            return;
        }

        btnLogin.textContent = 'Ingresando...';
        btnLogin.disabled = true;
        loginError.classList.add('hidden');

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', username: username, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                loginScreen.classList.add('hidden');
                if (data.role === 'Vendedor') {
                    currentUser = data.user;
                    welcomeVendedor.textContent = `Bienvenido, ${data.user}`;
                    vistaVendedor.classList.remove('hidden');
                } else if (data.role === 'Supervisor') {
                    vistaSupervisor.classList.remove('hidden');
                }
            } else {
                loginError.textContent = data.message;
                loginError.classList.remove('hidden');
            }
        })
        .catch(error => {
            loginError.textContent = 'Error de conexión. Revisa la consola.';
            loginError.classList.remove('hidden');
            console.error(error);
        })
        .finally(() => {
            btnLogin.textContent = 'Ingresar';
            btnLogin.disabled = false;
        });
    });
    
    // --- LÓGICA DE CALCULADORAS ---
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
        const total = monto - renta;
        rentaCalculada.value = renta.toFixed(2);
        totalRenta.value = total.toFixed(2);
        totalPalabrasRenta.textContent = `SON: ${numeroALetras(total, 'DÓLARES')}`;
    });

    // --- LÓGICA DE AGREGAR VENTA ---
    btnAgregarVenta.addEventListener('click', () => {
        if (!inputFecha.value || !inputPaquete.value || !inputPrecio.value) {
            alert('Por favor, rellena todos los campos de la venta.');
            return;
        }

        const ventaData = {
            action: 'agregarVenta',
            vendedor: currentUser,
            mes: inputMes.value,
            fecha: inputFecha.value,
            paquete: inputPaquete.value,
            precio: parseFloat(inputPrecio.value)
        };
        
        btnAgregarVenta.textContent = 'Guardando...';
        btnAgregarVenta.disabled = true;

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(ventaData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('¡Venta guardada con éxito!');
                inputPaquete.value = '';
                inputPrecio.value = '';
                inputFecha.value = '';
                inputPaquete.focus();
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al guardar la venta.');
        })
        .finally(() => {
            btnAgregarVenta.textContent = 'Agregar Venta';
            btnAgregarVenta.disabled = false;
        });
    });

    // --- FUNCIONES AUXILIARES ---
    function actualizarFecha(elemento) {
        const fecha = new Date();
        const dia = fecha.getDate();
        const anio = fecha.getFullYear();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const nombreMes = meses[fecha.getMonth()];
        elemento.textContent = `Fecha del Sistema: ${dia} de ${nombreMes} del ${anio}`;
    }

    function numeroALetras(n, moneda) {
        if (n === null || n === undefined) return `CERO CON 00/100 ${moneda}`;
        const [entero, decimal] = n.toFixed(2).split('.');
        return `${entero.toUpperCase()} CON ${decimal}/100 ${moneda}`;
    }

    // --- REGISTRO DEL SERVICE WORKER (PWA) ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => { console.log('Service Worker registrado.'); })
                .catch(error => { console.log('Error en registro de Service Worker:', error); });
        });
    }
});

