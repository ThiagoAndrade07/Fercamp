// Função para "Console.log" mais fácil
function $(log) {
    console.log(log);
}

const sectionProdutos = document.querySelector('.produtos');

async function fetchProdutos() {

    try {

        let produtos = await fetch('../produtos-fake.json');
        let produtosConvertidos = await produtos.json();
    
        return produtosConvertidos;

    } catch {
        console.log('Não foi possível resgatar os produtos.');
    }
}

async function listaDeProdutos() {
    const lista = await fetchProdutos();

    lista.produtos.forEach( produto => {

        criaProdutoComDescricao(produto.titulo, produto.imagem);
        
        let botoesDescricao = document.querySelectorAll('[data-botao-descricao]');
        botoesDescricao.forEach( botao => botao.addEventListener('click', () => mostraDescricao(botao, produto.titulo, produto.descricao)));

    });

}

function mostraDescricao(botao, titulo, descricao) {

    let cardDoProduto = botao.parentNode.parentNode;
    cardDoProduto.classList.add('produtos-com-descricao');
    cardDoProduto.innerHTML = '';

    let h5 = document.createElement('h5');
    h5.innerHTML = titulo;
    let divDescricao = document.createElement('div');
    divDescricao.classList.add('texto-descricao');

    cardDoProduto.appendChild(h5);
    cardDoProduto.appendChild(divDescricao);

    descricao.forEach( elemento => {
        let div = document.createElement('div');
        let h6 = document.createElement('h6');

        h6.innerHTML = elemento.titulo;

        div.appendChild(h6);

        elemento.texto.forEach( desc => {
            let p = document.createElement('p');
            p.innerHTML = desc;

            div.appendChild(p);
        });

        divDescricao.appendChild(div);
    });

}

function criaProdutoComDescricao(titulo, imagem) {
    let templateDoProdutoComDescricao = `

        <div class="container-produtos">
            <div class="box-produtos">
                <img src="${imagem}">
            </div>
            <div class="botao-produtos">
                <p>${titulo}</p>
                <button class="descricao-botao" data-botao-descricao>Descrição</button>
            </div>
        </div>

    `;

    let div = document.createElement('div');
    div.innerHTML = templateDoProdutoComDescricao;

    sectionProdutos.appendChild(div);
}

listaDeProdutos();
