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

const imgs = [];
coloresCI.forEach((color, i) => {
  const div = document.createElement("div");
  div.className = "imagen-circular";
  div.id = `img-${i}`;
  div.style.backgroundColor = color;
  circulo.appendChild(div);
  imgs.push(div);
});

const posiciones = [
  { x: 393.5, y: 35.57 },
  { x: 469.5, y: 205.57 },
  { x: 469.5, y: 390.57 },
  { x: 409.5, y: 528.57 }
];

let currentIndex = 0;

const tituloEl = document.getElementById("titulo");
const textoEl = document.getElementById("cuadroTexto");
const textoContenedor = document.getElementById("contenedorTexto");

function init() {
  imgs.forEach((img, i) => {
    img.style.transition = "none";
    img.style.transform = `translate(${posiciones[i].x}px, ${posiciones[i].y}px)`;
    img.style.opacity = "0";
  });
  imgs[currentIndex].style.opacity = "1";
  cambiarContenido(currentIndex, true);
  actualizarBotones(currentIndex);
}

function cambiarFondo(index) {
  fondos.forEach(id => document.getElementById(id).classList.remove("visible"));
  document.getElementById(fondos[index]).classList.add("visible");
}

function cambiarContenido(index, instant = false) {
  if (instant) {
    tituloEl.innerHTML = `<img src="${textos[index].titulo}" alt="Título ${index}" class="titulo-logo">`;
    textoEl.textContent = textos[index].texto;
    textoContenedor.style.opacity = "1";
    cambiarFondo(index);
    actualizarBotones(index);
    return;
  }

  textoContenedor.style.opacity = "0";

  setTimeout(() => {
    tituloEl.innerHTML = `<img src="${textos[index].titulo}" alt="Título ${index}" class="titulo-logo">`;
    textoEl.textContent = textos[index].texto;
    cambiarFondo(index);
    actualizarBotones(index);
    textoContenedor.style.opacity = "1";
  }, 500);
}

function actualizarBotones(index) {
  document.querySelectorAll('.botones button').forEach((btn, i) => {
    btn.classList.remove("activo");
    btn.style.setProperty('--btn-color', '');
  });
  const btnActivo = document.getElementById(`btn${index}`);
  btnActivo.classList.add("activo");
  btnActivo.style.setProperty('--btn-color', coloresCI[index]);
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
  }, 1000);
}

function cambiarManual(index) {
  if (index === currentIndex || document.body.classList.contains("transicionando")) return;

  document.body.classList.add("transicionando");
  moverAnimacion(currentIndex, index);
  cambiarContenido(index);
  setTimeout(() => {
    currentIndex = index;
    document.body.classList.remove("transicionando");
  }, 1000);
}

function moverAnimacion(de, a) {
  const imgActual = imgs[de];
  const imgSiguiente = imgs[a];
  const posActual = posiciones[de];
  const posSiguiente = posiciones[a];

  imgSiguiente.style.transition = "none";
  imgSiguiente.style.transform = `translate(${posActual.x}px, ${posActual.y}px)`;
  imgSiguiente.style.opacity = "0";
  imgSiguiente.offsetHeight;

  imgSiguiente.style.transition = `transform 1s ease-in-out, opacity 1s ease-in-out`;
  imgActual.style.transition = `transform 1s ease-in-out, opacity 1s ease-in-out`;

  imgSiguiente.style.transform = `translate(${posSiguiente.x}px, ${posSiguiente.y}px)`;
  imgSiguiente.style.opacity = "1";

  imgActual.style.transform = `translate(${posSiguiente.x}px, ${posSiguiente.y}px)`;
  imgActual.style.opacity = "0";
}

document.getElementById("btn0").addEventListener("click", () => cambiarManual(0));
document.getElementById("btn1").addEventListener("click", () => cambiarManual(1));
document.getElementById("btn2").addEventListener("click", () => cambiarManual(2));
document.getElementById("btn3").addEventListener("click", () => cambiarManual(3));

init();
setInterval(moverSiguiente, 5000);

// Mostrar el botón cuando se hace scroll
window.onscroll = function() {
  const btn = document.getElementById("btnScrollTop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Función para subir al inicio
document.getElementById("btnScrollTop").onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};