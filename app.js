let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();
function verificarChute() { // função é responsavel para criar alguma ação dentro do codigo, sempre usar nome objetivo e que deixe claro a função
    let chute = document.querySelector('input').value; //utilizar o .value para pegar somente o valor na linha do HTML 
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //getElementById usa para pegar elemento pelo ID, caracterizado no HTML
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo()
    }
}



function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //A palavra-chave return não é obrigatória em JavaScript, mas é frequentemente usada para especificar um valor a ser retornado pela função.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length //.length serve para mostrar a quantidade de elementos em uma lista

    if (quantidadeDeElementosNaLista == numeroLimite) { //aqui estamos zerando a lista quando todos os numeros ja foram adicionados.
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {  //includes serve para incluir dados dentro do paramentro da função
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);     //.push serve para adicionar dados ao final da lista / array
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}


function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}