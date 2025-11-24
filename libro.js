const paginas = [
    {
        texto: "",
        fondo: "IMG/Portada.png"
    },
    {
        texto: "Este libro no nació de la necesidad de escribir, sino del deseo de que leas mi corazón en cada palabra. Cada frase aquí dentro está pensada para ti, para recordarte lo importante que eres en mi vida, lo feliz que me haces y lo mucho que te amo. No son solo palabras; son pedacitos de mi cariño, de mis pensamientos y de mis momentos contigo. Espero que, al pasar cada página, sientas un abrazo, una sonrisa y todo el amor que llevo dentro, porque todo esto está escrito para ti… y solo para ti.",
        fondo: "/IMG/Paginas.jpg"
    },
    {
        texto: "",
        fondo: "/IMG/Paginas.jpg"
    },
    {
        texto: "",
        fondo: "/IMG/Paginas.jpg"
    },
    {
        texto: "",
        fondo: "/IMG/Paginas.jpg"
    },
    {
        texto: "",
        fondo: "/IMG/SemiFinal.png"
    },
    {
        texto: "",
        fondo: "/IMG/Final.jpg"
    }
];

let actual = 0;
const paginaDiv = document.getElementById("pagina");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
let currentFondo = null;

function mostrarPagina() {
    const book = document.querySelector(".book");

    paginaDiv.classList.remove("page-flip-in", "page-flip-out");

    paginaDiv.classList.add("page-flip-out");

    setTimeout(() => {
        paginaDiv.textContent = paginas[actual].texto;

        // Solo mostrar contador y autor en páginas de contenido (no portada, sinopsis, penúltima ni última)
        let contador = null;
        const esContenido = actual >= 2 && actual < paginas.length - 2;
        if (esContenido && paginas.length > 4) {
            contador = document.createElement("div");
            contador.id = "contador";
            contador.className = "contador";
            const paginasContadas = paginas.length - 4; // excluye portada, sinopsis, penúltima y última
            const numeroVisible = actual - 1; // la tercera página (índice 2) debe ser 1
            contador.textContent = `${numeroVisible} / ${paginasContadas}`;
        }

        const contenido = document.createElement("div");
        contenido.className = "texto-wrapper";


        const texto = document.createElement("div");
        texto.className = "texto";
        texto.textContent = paginas[actual].texto;
        texto.style.padding = "25px";
        texto.style.textAlign = "center";
        texto.style.fontSize = "clamp(1rem, 2vw, 1.8rem)";
        texto.style.lineHeight = "1.4";
        texto.style.color = "black";

        const autor = document.createElement("div");
        autor.id = "autor";
        autor.className = "autor";
        autor.textContent = "Daboyloper";

        paginaDiv.innerHTML = "";
        if (contador) paginaDiv.appendChild(contador);
        contenido.appendChild(texto);
        if (esContenido) contenido.appendChild(autor);
        paginaDiv.appendChild(contenido);

        const fondoRuta = paginas[actual].fondo;
        book.style.backgroundImage = `url('${fondoRuta}')`;
        book.style.backgroundSize = "contain";
        book.style.backgroundPosition = "center";
        book.style.backgroundRepeat = "no-repeat";

        currentFondo = fondoRuta;
        ajustarAlturaLibro(currentFondo);

        paginaDiv.classList.remove("page-flip-out");
        paginaDiv.classList.add("page-flip-in");

    }, 300);

    btnPrev.disabled = actual === 0;
    btnNext.disabled = actual === paginas.length - 1;
}



function nextPage() {
    if (actual < paginas.length - 1) {
        actual++;
        mostrarPagina();
    }
}

function prevPage() {
    if (actual > 0) {
        actual--;
        mostrarPagina();
    }
}

function ajustarAlturaLibro(fondo) {
    const book = document.querySelector(".book");
    
    const img = new Image();
    const ruta = (typeof fondo === 'string' && fondo.startsWith('/')) ? fondo.slice(1) : fondo;
    img.src = ruta;

    img.onload = () => {
        const anchoContenedor = book.clientWidth || book.getBoundingClientRect().width;
        if (!anchoContenedor) {
            requestAnimationFrame(() => ajustarAlturaLibro(fondo));
            return;
        }
        const proporcion = img.height / img.width || 1;
        const nuevaAltura = Math.round(anchoContenedor * proporcion);
        book.style.height = nuevaAltura + "px";
    };

    img.onerror = () => {
        book.style.height = 'auto';
    };
}

window.addEventListener('resize', () => {
    if (currentFondo) ajustarAlturaLibro(currentFondo);
});

mostrarPagina();
