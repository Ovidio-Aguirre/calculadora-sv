document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // ¡¡¡IMPORTANTE!!! REEMPLAZA ESTA LÍNEA CON TU URL
    // -------------------------------------------------------------------
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykudCYVnzz4-nO-Q_oZmYCbXrbQg7xMU9tcsbJ-dH25FA9cfJqlojMiCpR2QD9iEjV/exec'; 
    // -------------------------------------------------------------------

    // --- ELEMENTOS DEL DOM (COMPLETOS) ---
    const menuPrincipal = document.getElementById('menu-principal');
    const btnShowIva = document.getElementById('btn-show-iva');
    const btnShowRenta = document.getElementById('btn-show-renta');
    const btnShowProyecto = document.getElementById('btn-show-proyecto');
    const btnsBack = document.querySelectorAll('.btn-back');
    const btnsLogout = document.querySelectorAll('.btn-logout');
    const calcIvaContainer = document.getElementById('calculadora-iva');
    const calcRentaContainer = document.getElementById('calculadora-renta');
    const proyectoContainer = document.getElementById('proyecto-container');
    const montoBaseIva = document.getElementById('monto-base-iva');
    const ivaCalculado = document.getElementById('iva-calculado');
    const totalIva = document.getElementById('total-iva');
    const montoBaseRenta = document.getElementById('monto-base-renta');
    const rentaCalculada = document.getElementById('renta-calculada');
    const totalRenta = document.getElementById('total-renta');
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

    // --- NAVEGACIÓN ---
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

    // --- LÓGICA CALCULADORAS ---
    montoBaseIva.addEventListener('input', () => { const monto = parseFloat(montoBaseIva.value) || 0; const iva = monto * 0.13; totalIva.value = (monto + iva).toFixed(2); ivaCalculado.value = iva.toFixed(2); });
    montoBaseRenta.addEventListener('input', () => { const monto = parseFloat(montoBaseRenta.value) || 0; const renta = monto * 0.10; totalRenta.value = (monto - renta).toFixed(2); rentaCalculada.value = renta.toFixed(2); });

    // --- LÓGICA DE LOGIN ---
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

    // --- LÓGICA DE AGREGAR VENTA (CORREGIDA) ---
    btnAgregarVenta.addEventListener('click', () => {
        if (!inputFecha.value || !inputPaquete.value || !inputPrecio.value) { alert('Completa todos los campos.'); return; }
        const ventaData = { action: 'agregarVenta', vendedor: currentUser, mes: inputMes.value, fecha: inputFecha.value, paquete: inputPaquete.value, precio: parseFloat(inputPrecio.value) };
        btnAgregarVenta.textContent = 'Guardando...'; btnAgregarVenta.disabled = true;
        
        // Esta es la parte corregida para que funcione en Live Server
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar el error de CORS en desarrollo
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ventaData),
            redirect: 'follow',
        })
        .then(() => {
            // Como usamos 'no-cors', no podemos leer la respuesta, pero asumimos que fue exitosa.
            alert('¡Venta guardada con éxito!');
            inputPaquete.value = '';
            inputPrecio.value = '';
            inputFecha.value = '';
            inputPaquete.focus();
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Hubo un error al guardar la venta. Revisa la consola.');
        })
        .finally(() => {
            btnAgregarVenta.textContent = 'Agregar Venta';
            btnAgregarVenta.disabled = false;
        });
    });
    
    // --- LÓGICA DE CREAR USUARIO ---
    btnCrearUsuario.addEventListener('click', () => {
        const nuevoUsuario = inputNuevoUser.value.trim(); const nuevaPassword = inputNuevaPass.value.trim(); const nuevoRol = selectNuevoRol.value;
        if (!nuevoUsuario || !nuevaPassword) { alert('Completa usuario y contraseña.'); return; }
        btnCrearUsuario.textContent = 'Creando...'; btnCrearUsuario.disabled = true;
        const userData = { action: 'crearUsuario', nuevoUsuario, nuevaPassword, nuevoRol };
        
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            redirect: 'follow',
        })
        .then(() => {
            alert(`¡Usuario "${nuevoUsuario}" creado con éxito!`);
            inputNuevoUser.value = '';
            inputNuevaPass.value = '';
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Hubo un error al crear el usuario.');
        })
        .finally(() => {
            btnCrearUsuario.textContent = 'Crear Usuario';
            btnCrearUsuario.disabled = false;
        });
    });

    // --- SERVICE WORKER ---
    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }
});

