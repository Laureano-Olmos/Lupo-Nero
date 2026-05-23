// ==========================================
// BASE DE DATOS DE HISTORIAS
// Agrega nuevas historias en este array.
// ==========================================
const storiesData = [
    {
        id: "odio-los-cines",
        title: "Odio los cines",
        genre: "existencial", // Debe coincidir (en minúsculas) con el data-genre de index.html
        snippet: "Lo habia olvidado: odio los cines. Es mucho más cómodo ver películas en casa puesto que si requeris, por cualquier motivo, dejar de ver temporalmente la película podes pausarla...",
        file: "historias/odio-los-cines.html"
    },{
        id: "contrabando-de-figus",
        title: "Contrabando",
        genre: "distopia", // Debe coincidir (en minúsculas) con el data-genre de index.html
        snippet: "Sokolov se despertó en aquel cuarto al que llamaba hogar. La vida en el metro tras la guerra nuclear nunca fue sencilla ni llena de lujos, para absolutamente nadie...",
        file: "historias/contrabando-de-figus.html"
    }
];

// ==========================================
// LÓGICA DE LA PÁGINA PRINCIPAL (index.html)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    const storiesContainer = document.getElementById('stories-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Función para renderizar historias en el DOM
    function renderStories(storiesToRender) {
        if (!storiesContainer) return; // Si no estamos en index.html, salimos
        
        storiesContainer.innerHTML = ''; // Limpiar contenedor

        if (storiesToRender.length === 0) {
            storiesContainer.innerHTML = '<p class="story-snippet" style="text-align: center; grid-column: 1 / -1;">No hay historias en esta categoría aún.</p>';
            return;
        }

        storiesToRender.forEach(story => {
            const storyCard = document.createElement('article');
            storyCard.className = 'story-card';
            
            // Transformamos el género para mostrar (ej: "sci-fi" -> "SCI-FI")
            const displayGenre = story.genre.replace('-', ' ').toUpperCase();

            storyCard.innerHTML = `
                <span class="story-genre">${displayGenre}</span>
                <h3>${story.title}</h3>
                <p class="story-snippet">${story.snippet}</p>
                <a href="${story.file}" class="read-btn">Leer Historia &rarr;</a>
            `;
            storiesContainer.appendChild(storyCard);
        });
    }

    // Inicializar renderizando todas las historias
    if (storiesContainer) {
        renderStories(storiesData);
    }

    // Lógica de Filtros
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Quitar clase active de todos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al clickeado
                button.classList.add('active');

                const genre = button.getAttribute('data-genre');

                if (genre === 'todos') {
                    renderStories(storiesData);
                } else {
                    const filteredStories = storiesData.filter(story => story.genre === genre);
                    renderStories(filteredStories);
                }
            });
        });
    }

// ==========================================
// LÓGICA DE LA PÁGINA DE LECTURA (historias/*.html)
// ==========================================

    const progressBar = document.getElementById('reading-progress');
    
    // Si existe la barra de progreso, estamos en una página de lectura
    if (progressBar) {
        window.addEventListener('scroll', () => {
            // Calculamos cuánto se ha hecho scroll
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            
            // Calculamos la altura total scrolleable (Altura total del documento - Altura de la ventana)
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Calculamos el porcentaje
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            // Aplicamos el porcentaje al ancho de la barra
            progressBar.style.width = scrollPercentage + '%';
        });
    }
});
