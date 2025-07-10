const coloresCI = ['#3b863e', '#00b2e2', '#fe5f00', '#ba0d0d'];
const textos = [
    { titulo: '../Qiora/titulo/Qiora_Conecta.png', texto: 'En Conecta, facilitamos la conectividad del futuro a millones de personas y empresas mediante infraestructura, talento humano y herramientas para instalaciones de fibra óptica en varios estados del país. Supervisamos cada etapa del proceso y buscamos mejorar continuamente la calidad del servicio.' },
    { titulo: '../Qiora/titulo/Qiora_Telecom.png', texto: 'En Telecom, llevamos servicios de telefonía a todo México al ser de los principales Distribuidores Autorizados de AT&T. Conectamos empresas y personas gracias a la red de fuerza comercial, puntos de venta estratégicamente ubicados y atención a cliente cercana y confiable.' },
    { titulo: '../Qiora/titulo/Qiora_Infraestructura.png', texto: 'Nos especializamos en la construcción de obra civil y la instalación de fibra óptica para operadores de telecomunicaciones y empresas. Contamos con un equipo capacitado y tecnología para garantizar una ejecución eficiente y segura en cada proyecto.' },
    { titulo: '../Qiora/titulo/Qiora_Capital.png', texto: 'Es el motor de expansión de QiORA, identificando y desarrollando oportunidades de alto impacto en diversas industrias.' }
];

const fondos = ['fondo0', 'fondo1', 'fondo2', 'fondo3'];
const total = coloresCI.length;
const circulo = document.getElementById("circulo");
const contenedor = document.getElementById("contenedor");
const tituloEl = document.getElementById("titulo");
const textoEl = document.getElementById("cuadroTexto");
const textoContenedor = document.getElementById("contenedorTexto");
const botones = document.querySelectorAll('.botones button');

const posicionesRelativas = [
    { x: 0.452, y: 0.08 },
    { x: 0.525, y: 0.29 },
    { x: 0.513, y: 0.50 },
    { x: 0.419, y: 0.70 }
];

let posiciones = [];
let imgs = [];
let currentIndex = 0;

function calcularPosiciones() {
    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;
    const ladoMin = Math.min(ancho, alto);
    posiciones = posicionesRelativas.map(pos => ({
        x: ladoMin * pos.x,
        y: ladoMin * pos.y
    }));
}

function crearCirculos() {
    circulo.innerHTML = "";
    imgs = [];
    coloresCI.forEach((color, i) => {
        const div = document.createElement("div");
        div.className = "imagen-circular";
        div.style.backgroundColor = color;
        div.dataset.index = i;
        circulo.appendChild(div);
        imgs.push(div);
        div.addEventListener("click", () => cambiarManual(i));
    });
}

function posicionarSinAnim() {
    imgs.forEach((img, i) => {
        img.style.transition = "none";
        img.style.transform = `translate(${posiciones[i].x}px, ${posiciones[i].y}px) scale(${i === currentIndex ? 1 : 0.3}) rotate(${i === currentIndex ? 0 : 180}deg)`;
        img.classList.toggle("activo", i === currentIndex);

        // Restaurar transición después de un frame
        requestAnimationFrame(() => {
            img.style.transition = "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        });
    });
}

function cambiarFondo(index) {
    fondos.forEach(id => document.getElementById(id).classList.remove("visible"));
    document.getElementById(fondos[index]).classList.add("visible");
}

function actualizarBotones(index) {
    botones.forEach((btn, i) => btn.classList.toggle("activo", i === index));
}

function cambiarContenido(index, instant = false) {
    if (instant) {
        tituloEl.innerHTML = `<img src="${textos[index].titulo}" alt="Título ${index}" class="titulo-logo">`;
        textoEl.textContent = textos[index].texto;
        textoContenedor.style.opacity = "1";
        textoContenedor.classList.remove("cambiando");
        cambiarFondo(index);
        actualizarBotones(index);
        return;
    }

    textoContenedor.classList.add("cambiando");

    setTimeout(() => {
        tituloEl.innerHTML = `<img src="${textos[index].titulo}" alt="Título ${index}" class="titulo-logo">`;
        textoEl.textContent = textos[index].texto;
        cambiarFondo(index);
        actualizarBotones(index);
        textoContenedor.classList.remove("cambiando");
    }, 500);
}

function moverAnimacion(de, a) {
    const imgActual = imgs[de];
    const imgSiguiente = imgs[a];
    const posActual = posiciones[de];
    const posSiguiente = posiciones[a];

    // Preparar elemento siguiente
    imgSiguiente.style.transition = "none";
    imgSiguiente.style.transform = `translate(${posActual.x}px, ${posActual.y}px) scale(0.3) rotate(180deg)`;
    imgSiguiente.classList.remove("activo");

    imgSiguiente.offsetHeight; // Force reflow

    // Restaurar transiciones y animar
    imgSiguiente.style.transition = "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    imgActual.style.transition = "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    // Animar al estado final
    imgSiguiente.style.transform = `translate(${posSiguiente.x}px, ${posSiguiente.y}px) scale(1) rotate(0deg)`;
    imgSiguiente.classList.add("activo");

    imgActual.style.transform = `translate(${posSiguiente.x}px, ${posSiguiente.y}px) scale(0.3) rotate(180deg)`;
    imgActual.classList.remove("activo");
}

function moverSiguiente() {
    if (document.body.classList.contains("transicionando")) return;
    document.body.classList.add("transicionando");

    const siguienteIndex = (currentIndex + 1) % total;
    moverAnimacion(currentIndex, siguienteIndex);
    cambiarContenido(siguienteIndex);

    setTimeout(() => {
        currentIndex = siguienteIndex;
        document.body.classList.remove("transicionando");
    }, 1200);
}

function cambiarManual(index) {
    if (index === currentIndex || document.body.classList.contains("transicionando")) return;
    document.body.classList.add("transicionando");

    moverAnimacion(currentIndex, index);
    cambiarContenido(index);

    setTimeout(() => {
        currentIndex = index;
        document.body.classList.remove("transicionando");
    }, 1200);
}

botones.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        cambiarManual(i);
        btn.blur();
    });
});

window.addEventListener("resize", () => {
    calcularPosiciones();
    posicionarSinAnim();
});


const imagenes = [
    "../Qiora/img/Fondo/conecta.png",
    "../Qiora/img/Fondo/telecom.png",
    "../Qiora/img/Fondo/infra.png",
    "../Qiora/img/Fondo/capital.png"
];

const coloresCICelular = ['#3b863e', '#00b2e2', '#fe5f00', '#ba0d0d'];
const textosCelular = textos;

let centroIndex = 0;
let direccion = 1;

const circulos = [
    document.getElementById('circulo1'),
    document.getElementById('circulo2'),
    document.getElementById('circulo3')
];

const tituloElCelular = document.getElementById("titulo-celular");
const textoElCelular = document.getElementById("cuadroTexto-celular");
const textoContenedorCelular = document.getElementById("contenedorTexto-celular");
const botonesCelular = document.querySelectorAll('.botones-Celular button');

const estadosBase = [
    { left: '14%', top: '60%', size: '20vw', maxSize: '100px' },
    { left: '50%', top: '50%', size: '120vw', maxSize: '180px' },
    { left: '86%', top: '60%', size: '20vw', maxSize: '100px' }
];

let posicionVisual = [0, 1, 2];

function mod(n, m) {
    return ((n % m) + m) % m;
}

function aplicarEstado(circulo, estado, zIndex, scale = 1, opacity = 1) {
    circulo.style.left = estado.left;
    circulo.style.top = estado.top;
    circulo.style.width = estado.size;
    circulo.style.height = estado.size;
    circulo.style.maxWidth = estado.maxSize;
    circulo.style.maxHeight = estado.maxSize;
    circulo.style.zIndex = zIndex;
    circulo.style.opacity = opacity;
    circulo.style.transform = `translate(-50%, -50%) scale(${scale})`;
    circulo.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function actualizarImagenesCelular() {
    const izquierdaIndex = mod(centroIndex - 1, textosCelular.length);
    const centroTemp = centroIndex;
    const derechaIndex = mod(centroIndex + 1, textosCelular.length);

    for (let i = 0; i < circulos.length; i++) {
        if (posicionVisual[i] === 0) {
            circulos[i].style.backgroundImage = `url(${imagenes[izquierdaIndex]})`;
        } else if (posicionVisual[i] === 1) {
            circulos[i].style.backgroundImage = `url(${imagenes[centroTemp]})`;
        } else if (posicionVisual[i] === 2) {
            circulos[i].style.backgroundImage = `url(${imagenes[derechaIndex]})`;
        }
    }
}

function actualizarBotonesCelular(index) {
    botonesCelular.forEach((btn, i) => btn.classList.toggle("activo", i === index));
}

function cambiarContenidoCelulares(index) {
    textoContenedorCelular.classList.add("cambiando");

    setTimeout(() => {
        tituloElCelular.innerHTML = `<img src="${textosCelular[index].titulo}" alt="Título ${index}" class="titulo_logo-celular">`;
        textoElCelular.textContent = textosCelular[index].texto;
        actualizarBotonesCelular(index);
        textoContenedorCelular.classList.remove("cambiando");
    }, 400);
}

function animarMovimiento() {
    if (direccion === 1) {
        posicionVisual.unshift(posicionVisual.pop());
    } else {
        posicionVisual.push(posicionVisual.shift());
    }

    actualizarImagenesCelular();
    cambiarContenidoCelulares(centroIndex);

    circulos.forEach((c, i) => {
        let zIndex = 1;
        let scale = 1;
        let opacity = 1;
        const pos = posicionVisual[i];

        if (pos === 1) {
            zIndex = 3;
            scale = 1;
            opacity = 1;
        } else if (pos === 0 || pos === 2) {
            zIndex = 2;
            scale = 0.8;
            opacity = 0.85;
        }

        aplicarEstado(c, estadosBase[pos], zIndex, scale, opacity);
    });
}

function girar() {
    const totalSlides = textosCelular.length;
    centroIndex = mod(centroIndex + direccion, totalSlides);
    animarMovimiento();
}

document.querySelectorAll('button[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        if (idx !== centroIndex) {
            centroIndex = idx;
            direccion = 1;
            animarMovimiento();
        }
        btn.blur();
    });
});

// Inicialización
for (let i = 0; i < circulos.length; i++) {
    aplicarEstado(
        circulos[i],
        estadosBase[posicionVisual[i]],
        posicionVisual[i] === 1 ? 3 : 2,
        posicionVisual[i] === 1 ? 1 : 0.8,
        posicionVisual[i] === 1 ? 1 : 0.85
    );
}

actualizarImagenesCelular();
cambiarContenidoCelulares(centroIndex);

document.querySelector('.catalogo-celular').classList.add("cargando");
setTimeout(() => {
    document.querySelector('.catalogo-celular').classList.remove("cargando");
}, 1500);

function init() {
    crearCirculos();
    calcularPosiciones();
    posicionarSinAnim();
    cambiarContenido(currentIndex, true);

    // Efecto de carga inicial
    contenedor.classList.add("cargando");
    setTimeout(() => {
        contenedor.classList.remove("cargando");
    }, 2000);
}

init();
setInterval(moverSiguiente, 6000);
setInterval(girar, 6000);