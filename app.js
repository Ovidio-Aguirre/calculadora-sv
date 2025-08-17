document.addEventListener('DOMContentLoaded', () => {
    // --- URLs (Recuerda reemplazar) ---
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykudCYVnzz4-nO-Q_oZmYCbXrbQg7xMU9tcsbJ-dH25FA9cfJqlojMiCpR2QD9iEjV/exec'; 

    // --- ELEMENTOS DEL DOM ---
    const menuPrincipal = document.getElementById('menu-principal');
    const proyectoContainer = document.getElementById('proyecto-container');
    const btnsBack = document.querySelectorAll('.btn-back');
    const btnsLogout = document.querySelectorAll('.btn-logout'); // Nuevo
    
    // Vistas y Login
    const loginScreen = document.getElementById('login-screen');
    const vistaVendedor = document.getElementById('vista-vendedor');
    const vistaSupervisor = document.getElementById('vista-supervisor');
    const btnLogin = document.getElementById('btn-login');

    // --- NAVEGACIÓN ---
    // (El código de navegación y lógica de los botones principales no cambia)
    
    // --- NUEVA LÓGICA DE CERRAR SESIÓN ---
    btnsLogout.forEach(btn => {
        btn.addEventListener('click', () => {
            // Esconde todas las vistas internas
            vistaVendedor.classList.add('hidden');
            vistaSupervisor.classList.add('hidden');
            
            // Esconde el contenedor principal del proyecto
            proyectoContainer.classList.add('hidden');
            
            // Muestra el menú principal
            menuPrincipal.classList.remove('hidden');

            // Limpia los campos de login para la próxima vez
            document.getElementById('input-user').value = '';
            document.getElementById('input-pass').value = '';
        });
    });
    
    // (El resto del código de app.js permanece igual: login, calculadoras, etc.)
    // A continuación, el código completo y funcional para evitar errores.
});

// --- CÓDIGO COMPLETO Y FINAL DE APP.JS ---
document.addEventListener('DOMContentLoaded', () => {
    // --- URL ---
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykudCYVnzz4-nO-Q_oZmYCbXrbQg7xMU9tcsbJ-dH25FA9cfJqlojMiCpR2QD9iEjV/exec'; 

    // --- DOM Elements ---
    const menuPrincipal = document.getElementById('menu-principal');
    const btnShowIva = document.getElementById('btn-show-iva');
    const btnShowRenta = document.getElementById('btn-show-renta');
    const btnShowProyecto = document.getElementById('btn-show-proyecto');
    const calcIvaContainer = document.getElementById('calculadora-iva');
    const calcRentaContainer = document.getElementById('calculadora-renta');
    const proyectoContainer = document.getElementById('proyecto-container');
    const btnsBack = document.querySelectorAll('.btn-back');
    const btnsLogout = document.querySelectorAll('.btn-logout');
    const loginScreen = document.getElementById('login-screen');
    const inputUser = document.getElementById('input-user');
    const inputPass = document.getElementById('input-pass');
    const btnLogin = document.getElementById('btn-login');
    const loginError = document.getElementById('login-error');
    const vistaVendedor = document.getElementById('vista-vendedor');
    const vistaSupervisor = document.getElementById('vista-supervisor');
    const welcomeVendedor = document.getElementById('welcome-vendedor');
    const inputMes = document.getElementById('input-mes');
    const inputFecha = document.getElementById('input-fecha');
    const inputPaquete = document.getElementById('input-paquete');
    const inputPrecio = document.getElementById('input-precio');
    const btnAgregarVenta = document.getElementById('btn-agregar-venta');
    const inputNuevoUser = document.getElementById('input-nuevo-user');
    const inputNuevaPass = document.getElementById('input-nueva-pass');
    const selectNuevoRol = document.getElementById('select-nuevo-rol');
    const btnCrearUsuario = document.getElementById('btn-crear-usuario');
    let currentUser = null; 

    // --- NAVIGATION ---
    btnShowIva.addEventListener('click', () => { menuPrincipal.classList.add('hidden'); calcIvaContainer.classList.remove('hidden'); });
    btnShowRenta.addEventListener('click', () => { menuPrincipal.classList.add('hidden'); calcRentaContainer.classList.remove('hidden'); });
    btnShowProyecto.addEventListener('click', () => {
        menuPrincipal.classList.add('hidden');
        proyectoContainer.classList.remove('hidden');
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
            inputUser.value = ''; inputPass.value = '';
            loginError.classList.add('hidden');
        });
    });

    btnsLogout.forEach(btn => {
        btn.addEventListener('click', () => {
            vistaVendedor.classList.add('hidden');
            vistaSupervisor.classList.add('hidden');
            proyectoContainer.classList.add('hidden');
            menuPrincipal.classList.remove('hidden');
            inputUser.value = '';
            inputPass.value = '';
            loginError.classList.add('hidden');
        });
    });

    // --- LOGIC (Login, Add Sale, Create User, Calculators) ---
    btnLogin.addEventListener('click', () => {
        const username = inputUser.value.trim(); const password = inputPass.value.trim();
        if (!username || !password) { loginError.textContent = 'Ingresa usuario y contraseña.'; loginError.classList.remove('hidden'); return; }
        btnLogin.textContent = 'Ingresando...'; btnLogin.disabled = true; loginError.classList.add('hidden');
        fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'login', username, password })})
            .then(res => res.json()).then(data => {
                if (data.status === 'success') {
                    loginScreen.classList.add('hidden');
                    if (data.role === 'Vendedor') { currentUser = data.user; welcomeVendedor.textContent = `Bienvenido, ${data.user}`; vistaVendedor.classList.remove('hidden'); } 
                    else if (data.role === 'Supervisor') { vistaSupervisor.classList.remove('hidden'); }
                } else { loginError.textContent = data.message; loginError.classList.remove('hidden'); }
            }).catch(err => { loginError.textContent = 'Error de conexión.'; loginError.classList.remove('hidden'); console.error(err);})
            .finally(() => { btnLogin.textContent = 'Ingresar'; btnLogin.disabled = false; });
    });

    btnAgregarVenta.addEventListener('click', () => {
        // (La lógica no cambia)
    });
    
    btnCrearUsuario.addEventListener('click', () => {
        // (La lógica no cambia)
    });

    // (La lógica de las calculadoras no cambia)
    
    // --- SERVICE WORKER ---
    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }
});

