// ---------- CADASTRO AUTOMÁTICO DE PRODUTOS EM PROMOÇÃO -----------

const containerDeProdutosEmPromocao = document.querySelector('.gallery');

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight  || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth  || document.documentElement.clientWidth)
    );
}

async function fetchProdutos() {

    try {

        let produtos = await fetch('https://raw.githubusercontent.com/ThiagoAndrade07/Fercamp/main/assets/produtos-fake.json');
        let produtosConvertidos = await produtos.json();
    
        return produtosConvertidos;

    } catch {
        console.log('Não foi possível resgatar os produtos.');
    }
}

async function mostraProdutosEmPromocao() {

    const lista = await fetchProdutos();

    lista.produtos.forEach( produto => {
        if(produto.promocao === 'true') {
            criaProdutoEmPromoção(produto.imagem, produto.preco, produto.titulo);
        }
    });

    const controls = document.querySelectorAll('.control');
    const items = document.querySelectorAll('.item');
    let currentItem = 0;
    const maxItems = items.length;

    items[0].classList.add('current-item');

    controls.forEach((control) => {
        control.addEventListener('click', () => {
            const isLeft = control.classList.contains('arrow-left');
    
            if (isLeft) {
                currentItem -= 1;
            } else {
                currentItem += 1;
            }
    
            if (currentItem >= maxItems) {
                currentItem = 0;
            }
    
            if (currentItem < 0) {
                currentItem = maxItems - 1;
            }
    
            items.forEach(item => item.classList.remove('current-item'));
    
            items[currentItem].scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest',
                });
                
            items[currentItem].classList.add('current-item');
        });
    });

    setInterval(() => {
   
        if(isInViewport(controls[1])) {
            controls[1].click();
        }
            
    },2000);

}

function criaProdutoEmPromoção(imagem, preco, titulo) {

    const template = `
    
        <img class="item" src="${imagem}" alt="Imagem do produto em promoção ${titulo}.">
        <p class="info-promo">R$${preco} und</p>
    
    `;

    let div = document.createElement('div');
    div.classList.add('box-promo');
    div.innerHTML = template

    containerDeProdutosEmPromocao.appendChild(div);

}

mostraProdutosEmPromocao();

// ---------------------------- TIMER -------------------------------

let dataFutura = new Date('March 6, 2023 00:00').getTime();

let dias, horas, minutos, segundos;
function setValores(e) {
    return document.getElementById(e);
}
setInterval(function() {
    let dataAtual = new Date().getTime();
    
    
    let segundosTotal = ( dataFutura - dataAtual)/1000;

    dias = parseInt(segundosTotal/86400);
    segundosTotal = segundosTotal%86400;

    horas = parseInt(segundosTotal/3600);
    segundosTotal = segundosTotal%3600;

    minutos = parseInt(segundosTotal/60);
    segundos = parseInt(segundosTotal%60);


        setValores('dias').innerHTML = dias;
        setValores('horas').innerHTML = horas;
        setValores('minutos').innerHTML = minutos;
        setValores('segundos').innerHTML = segundos;
},1000);
