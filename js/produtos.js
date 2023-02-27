// VARIÁVEIS

let segmentoSelecionado = localStorage.getItem('segmento');

const sectionProdutos = document.querySelector('.super-container-produtos');
const tituloDaPagina = document.querySelector('.produtos-titulo');
const displayDaPaginaAtual = document.querySelector('.display-pagina-atual');
const barraDePesquisa = document.querySelector('.pesquisa');
const botaoPesquisa = document.querySelector('.botao-pesquisa');

// REQUISIÇÃO DA LISTA DE PRODUTOS

async function fetchProdutos() {

    try {

        let produtos = await fetch('https://raw.githubusercontent.com/ThiagoAndrade07/Fercamp/main/assets/produtos.json');
        let produtosConvertidos = await produtos.json();

        return produtosConvertidos;

    } catch {
        console.log('Não foi possível resgatar os produtos.');
    }
}

async function listaDeProdutos() {
    const lista = await fetchProdutos();

    // DEFINIÇÃO DA QUANTIDADE DE PRODUTOS P/ PÁGINA COM BASE NO VIEWPORT DO USUÁRIO
    
    let paginaAtual = 1;
    let quantidadeDeProdutosPorPagina;

    if(screen.width < 768) {
        quantidadeDeProdutosPorPagina = 6;
    } else if(screen.width < 1024 && screen.width >= 768) {
        quantidadeDeProdutosPorPagina = 10;
    } else if(screen.width < 1200 && screen.width >= 1024) {
        quantidadeDeProdutosPorPagina = 12;
    } else {
        quantidadeDeProdutosPorPagina = 16;
    }

    // LOAD INICIAL DA PÁGINA

    tituloDaPagina.innerHTML = segmentoSelecionado;
    displayDaPaginaAtual.innerHTML = `Página: ${paginaAtual}`;

    let contadorDeProdutos = 0;

    lista.produtos.forEach( produto => {
        if(produto.segmento == segmentoSelecionado) {
            contadorDeProdutos++;
        }
    });

    let quantidadeDePaginas =  Math.ceil(contadorDeProdutos / quantidadeDeProdutosPorPagina);

    paginação(paginaAtual, quantidadeDeProdutosPorPagina, lista.produtos);

    // CRIAÇÃO INICIAL DOS BOTÕES DE PAGINAÇÃO

    let ul = document.createElement('ul');
    ul.classList.add('lista-paginas');
    sectionProdutos.parentNode.appendChild(ul);

    for(let i = 1; i <= quantidadeDePaginas; i++) {
        let li = document.createElement('li');
        let button = document.createElement('button');
        button.setAttribute('id', 'page-button');
        button.classList.add('page-button');
        button.innerHTML = i
        
        li.appendChild(button);
        li.classList.add('page-number');

        if(ul.childElementCount >= 4 && ul.childElementCount < quantidadeDePaginas - 1) {
            li.classList.add('esconde');
        }

        ul.appendChild(li);

        if(i == 1) {
            li.classList.add('page-number-after');
        }

        if(i == quantidadeDePaginas) {
            li.classList.add('page-number-before');
        }
    }

    // FUNCIONALIZAÇÃO DOS BOTÕES DE PAGINAÇÃO

    let botoesPagina = document.querySelectorAll('#page-button');
    let listaDePaginas = document.querySelector('.lista-paginas').childNodes;

    botoesPagina.forEach( botao => {

        if(paginaAtual == botao.innerHTML) {
            botao.classList.remove('page-button');
            botao.classList.add('page-button-active');
        }

        botao.addEventListener('click', () => {

            if(botao.parentNode.nextElementSibling && botao.parentNode.nextElementSibling.classList.contains('esconde')) {
                for(let i = 0; i < 4; i++) {
                    let botaoIndex = Array.prototype.indexOf.call(listaDePaginas, botao.parentNode);
                    let paginaIncrement = i + botaoIndex;
                    let paginaDecrement = botaoIndex - i;

                    if(botao.parentNode.parentNode.children[paginaDecrement] && botao.parentNode.parentNode.children[paginaDecrement].textContent != '1') {
                        botao.parentNode.parentNode.children[paginaDecrement].classList.add('esconde');
                    }
                    if(botao.parentNode.parentNode.children[paginaIncrement]) {
                        botao.parentNode.parentNode.children[paginaIncrement].classList.remove('esconde');
                    }
                }
            }

            if(botao.textContent == '1') {
                let contador = 0;

                listaDePaginas.forEach( element => {
                    if(element.classList.contains('esconde')) {
                        element.classList.remove('esconde');
                    }

                    if(contador > 3 && element.nextElementSibling) {
                        element.classList.add('esconde');
                    }
                    contador++;
                });
            }

            botoesPagina.forEach( elemento => {
                if(elemento.classList.contains('page-button-active')) {
                    elemento.classList.remove('page-button-active');
                    elemento.classList.add('page-button');
                }
            });
            paginaAtual = botao.innerHTML;
            displayDaPaginaAtual.innerHTML = `Página: ${paginaAtual}`;

            paginação(paginaAtual, quantidadeDeProdutosPorPagina, lista.produtos);

            scroll(0,0);

            botao.classList.remove('page-button');
            botao.classList.add('page-button-active');
        });
    });

    // TEXTO "PÁGINAS" ABAIXO DOS BOTÕES DE PAGINAÇÃO

    if(ul.childNodes.length > 0) {
        let p = document.createElement('p');
        p.classList.add('page-text');
        p.innerHTML = 'Páginas';
        sectionProdutos.parentNode.appendChild(p);
    }

    // EVENT LISTENER DA BARRA DE PESQUISA

    barraDePesquisa.addEventListener('input', event => {
        let termoDePesquisa = event.target.value.toLowerCase().trim();

        let produtosFiltrados = filtraProdutos(lista.produtos, termoDePesquisa);

        paginação(paginaAtual, quantidadeDeProdutosPorPagina, produtosFiltrados);

    });

}

// FUNÇÃO DE PAGINAÇÃO E EXIBIÇÃO DOS PRODUTOS

function paginação(paginaAtual, itensPorPagina, listaDeItens) {
    
    if(listaDeItens.length > 0) {
        sectionProdutos.innerHTML = '';
        paginaAtual--;
    
        let loopStart = itensPorPagina * paginaAtual;
        let loopStartIncrement = itensPorPagina * paginaAtual;
        let loopFinish = itensPorPagina * (paginaAtual + 1);
        let contador = 0;
        
        listaDeItens.forEach( item => {
            if(contador >= loopStart) {
                if(loopStartIncrement < loopFinish) {
                    if(item.segmento == segmentoSelecionado) {
                        criaProdutoComDescricao(item.titulo, item.imagem, item.descricao);
                        loopStartIncrement++;
                    }
                }
            }

            if(item.segmento == segmentoSelecionado) {
                contador++;
            }
        } );
    } else {
        sectionProdutos.innerHTML = '<p class="produto-nao-encontrado">Nenhum produto foi encontrado.</p>';
    }
}

// FUNÇÃO DE EXIBIÇÃO DA DESCRIÇÃO DO PRODUTO

function mostraDescricao(botao, titulo, imagem, descricao) {

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

    let botaoVoltar = document.createElement('button');
    botaoVoltar.innerHTML = 'Voltar';
    botaoVoltar.classList.add('botao-back');

    botaoVoltar.addEventListener('click', () => {

        voltarProdutoInicial(cardDoProduto, titulo, imagem);
        adicionaEscutadorNoBotaoDescricao(cardDoProduto, titulo, imagem, descricao);

    });

    cardDoProduto.appendChild(botaoVoltar);

}

// FUNÇÃO PARA RETORNAR À EXIBIÇÃO INICIAL DO PRODUTO QUANDO ESTIVER NA TELA DE DESCRIÇÃO

function voltarProdutoInicial(card, titulo, imagem) {

    card.innerHTML = '';

    let templateDoProdutoComDescricao = `

        <div class="box-produtos">
            <img src="${imagem}">
        </div>
        <div class="botao-produtos">
            <p>${titulo}</p>
            <button class="descricao-botao" data-botao-descricao>Descrição</button>
            <a class="link-orcamento" target="_blank" rel="noopener noreferral" href="https://api.whatsapp.com/send?phone=41995078326&text=Olá,%20eu%20gostaria%20de%20realizar%20um%20orçamento%20para%20o%20produto:%20${titulo}.">Realizar Orçamento</a>
        </div>

    `;

    
    card.classList.remove('produtos-com-descricao');
    card.innerHTML = templateDoProdutoComDescricao;

}

// FUNÇÃO PARA ADICIONAR EVENT LISTENER NO BOTÃO DE DESCRIÇÃO

function adicionaEscutadorNoBotaoDescricao(card, titulo, imagem, descricao) {
    
    let botaoDescricao = card.children[1].children[1];

    botaoDescricao.addEventListener('click', () => mostraDescricao(botaoDescricao, titulo, imagem, descricao));

}

// FUNÇÃO PARA CRIAÇÃO DE PRODUTO COM DESCRIÇÃO NA PÁGINA

function criaProdutoComDescricao(titulo, imagem, descricao) {
    let templateDoProdutoComDescricao = `

        <div class="box-produtos">
            <img src="${imagem}">
        </div>
        <div class="botao-produtos">
            <p>${titulo}</p>
            <button class="descricao-botao">Descrição</button>
            <a class="link-orcamento" target="_blank" rel="noopener noreferral" href="https://api.whatsapp.com/send?phone=41995078326&text=Olá,%20eu%20gostaria%20de%20realizar%20um%20orçamento%20para%20o%20produto:%20${titulo}.">Realizar Orçamento</a>
        </div>

    `;

    let card = document.createElement('div');
    card.classList.add('container-produtos');
    card.innerHTML = templateDoProdutoComDescricao;

    adicionaEscutadorNoBotaoDescricao(card, titulo, imagem, descricao);

    let div = document.createElement('div');
    div.appendChild(card);

    sectionProdutos.appendChild(div);
}

// FUNÇÃO PARA FILTRAR PRODUTOS DA LISTA COM BASE EM UM TERMO

function filtraProdutos(lista, termo) {
    let produtosFiltrados = [];
    
    lista.forEach( elemento => {
        if(elemento.titulo.toLowerCase().includes(termo)) {
            produtosFiltrados.push(elemento);
        }
    });

    return produtosFiltrados;

}

// INICIALIZAÇÃO DA PÁGINA

listaDeProdutos();
