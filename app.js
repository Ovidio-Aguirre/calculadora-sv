document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // ¡¡¡IMPORTANTE!!! REEMPLAZA ESTA LÍNEA CON TU URL
    // -------------------------------------------------------------------
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykudCYVnzz4-nO-Q_oZmYCbXrbQg7xMU9tcsbJ-dH25FA9cfJqlojMiCpR2QD9iEjV/exec'; 
    // -------------------------------------------------------------------

    // --- ELEMENTOS DEL DOM ---
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
    const inputNombreCliente = document.getElementById('input-nombre-cliente');
    const inputNumFisico = document.getElementById('input-num-fisico');
    const inputMonto = document.getElementById('input-monto');
    const inputServicio = document.getElementById('input-servicio');
    const inputFechaPago = document.getElementById('input-fecha-pago');
    const inputMesAplica = document.getElementById('input-mes-aplica');
    const selectPrimario = document.getElementById('select-primario');
    const inputConteo = document.getElementById('input-conteo');
    const inputCantidadPrimarios = document.getElementById('input-cantidad-primarios');
    const inputCortes = document.getElementById('input-cortes');
    const inputDevoluciones = document.getElementById('input-devoluciones');
    const inputDescuento = document.getElementById('input-descuento');
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
            }).catch(err => { loginError.textContent = 'Error de conexión. Revisa la implementación del script y la consola.'; loginError.classList.remove('hidden'); console.error(err);})
            .finally(() => { btnLogin.textContent = 'Ingresar'; btnLogin.disabled = false; });
    });
    
    // --- LÓGICA DE AGREGAR VENTA ---
    btnAgregarVenta.addEventListener('click', () => {
        if (!inputNombreCliente.value || !inputMonto.value || !inputFechaPago.value) { alert('Completa al menos Nombre, Monto y Fecha de Pago.'); return; }
        const ventaData = {
            gestor: currentUser, nombreCliente: inputNombreCliente.value.trim(), numFisico: inputNumFisico.value.trim(),
            monto: inputMonto.value, servicio: inputServicio.value.trim(), fechaPago: inputFechaPago.value,
            mesAplica: inputMesAplica.value, primario: selectPrimario.value, conteo: inputConteo.value,
            cantidadPrimarios: inputCantidadPrimarios.value, cortes: inputCortes.value || '0',
            devoluciones: inputDevoluciones.value || '0', descuento: inputDescuento.value || '0'
        };
        btnAgregarVenta.textContent = 'Guardando...'; btnAgregarVenta.disabled = true;
        fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ action: 'agregarVenta', venta: ventaData })})
            .then(() => {
                alert('¡Venta guardada con éxito!');
                inputNombreCliente.value = ''; inputNumFisico.value = ''; inputMonto.value = '';
                inputServicio.value = ''; inputFechaPago.value = ''; inputConteo.value = '1';
                inputCantidadPrimarios.value = '1'; inputCortes.value = '';
                inputDevoluciones.value = ''; inputDescuento.value = '';
                inputNombreCliente.focus();
            }).catch(err => { console.error('Error:', err); alert('Hubo un error al guardar la venta.'); })
            .finally(() => { btnAgregarVenta.textContent = 'Agregar Venta'; btnAgregarVenta.disabled = false; });
    });

    // --- LÓGICA DE CREAR USUARIO ---
    btnCrearUsuario.addEventListener('click', () => {
        const nuevoUsuario = inputNuevoUser.value.trim(); const nuevaPassword = inputNuevaPass.value.trim(); const nuevoRol = selectNuevoRol.value;
        if (!nuevoUsuario || !nuevaPassword) { alert('Completa usuario y contraseña.'); return; }
        btnCrearUsuario.textContent = 'Creando...'; btnCrearUsuario.disabled = true;
        const userData = { action: 'crearUsuario', nuevoUsuario, nuevaPassword, nuevoRol };
        fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(userData) })
            .then(() => {
                alert(`¡Usuario "${nuevoUsuario}" creado!`);
                inputNuevoUser.value = ''; inputNuevaPass.value = '';
            }).catch(err => { console.error('Error:', err); alert('Hubo un error al crear el usuario.'); })
            .finally(() => { btnCrearUsuario.textContent = 'Crear Usuario'; btnCrearUsuario.disabled = false; });
    });

    // --- SERVICE WORKER ---
    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }
});

