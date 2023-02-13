const segmentos = document.querySelectorAll('.slide-link');

segmentos.forEach( segmento => {
    segmento.addEventListener('click', () => {
        localStorage.setItem('segmento', segmento.firstChild.innerHTML.toLowerCase().trim());
    });
});