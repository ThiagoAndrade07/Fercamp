const segmentos = document.querySelectorAll('#slide-link');

segmentos.forEach( segmento => {
    segmento.addEventListener('click', () => {
        localStorage.setItem('segmento', segmento.firstChild.innerHTML.toLowerCase().trim());
    });
});

const segmentosCabecalho = document.querySelectorAll('#link-produtos');

segmentosCabecalho.forEach( segmento => {
    segmento.addEventListener('click', () => {
        localStorage.setItem('segmento', segmento.innerHTML.toLowerCase().trim());
    });
});


// Botao enviar no saiba mais do index 

function enviarMensagemSaibaMais (){

    let btnEnviar = document.querySelector('#btn-enviar-saber-mais');
    let textoSaibaMais = document.querySelector('#mensagem-saiba-mais').value;

    let linkWhatsApp = `https://api.whatsapp.com/send?phone=41995078326&text=${textoSaibaMais}`;
    
    textoSaibaMais.addEventListener('keydown', ()=> {
        btnEnviar.setAttribute('href', linkWhatsApp);
    });
};

