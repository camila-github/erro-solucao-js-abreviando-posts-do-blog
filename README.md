## Exercicio - Abreviando Posts do Blog

O exercicio publicado é referente ao treinamento do BOOTCAMP - Desenvolvedor NodeJS -  Resolvendo Algoritmos Com JavaScript.(https://digitalinnovation.one)


#### Descrição do Desafio:

Leonardo é um nômade digital e viaja pelo mundo programando em diferentes cafés das cidades por onde passa. Recentemente, resolveu criar um blog, para compartilhar suas experiências e aprendizados com seus amigos.

Para criação do blog, ele optou por utilizar uma ferramenta pronta, que há um limite de caracteres que se pode escrever por dia, e Leonardo está preocupado que essa limitação, afinal, irá impedir de contar suas melhores experiências. Para contornar esse problema, decidiu usar um sistema de abreviação de palavras em seus posts.

O sistema de abreviações é simples e funciona da seguinte forma: para cada letra, é possível escolher uma palavra que inicia com tal letra e que aparece no post. Uma vez escolhida a palavra, sempre que ela aparecer no post, ela será substituída por sua letra inicial e um ponto, diminuindo assim o número de caracteres impressos na tela.

Por exemplo, na frase: “hoje eu programei em Python”, podemos escolher a palavra “programei” para representar a letra ‘p', e a frase ficará assim: “hoje eu p. em Python”, economizando assim sete caracteres. Uma mesma palavra pode aparecer mais de uma vez no texto, e será abreviada todas as vezes. Note que, se após uma abreviação o número de caracteres não diminuir, ela não deve ser usada, tal como no caso da palavra “eu” acima.

Leonardo precisa que seu post tenha o menor número de caracteres possíveis, e por isso pediu a sua ajuda. Para cada letra, escolha uma palavra, de modo que ao serem aplicadas todas as abreviações, o texto contenha o menor número de caracteres possíveis.


#### Entrada:

Haverá diversos casos de teste. Cada caso de teste é composto de uma linha, contendo uma frase de até 10⁴ caracteres. A frase é composta de palavras e espaços em branco, e cada palavra é composta de letras minúsculas ('a'-'z'), e contém entre 1 e 30 caracteres cada. O último caso de teste é indicado quando a linha dada conter apenas um “.”, o qual não deverá ser processado.


#### Saída:

Para cada caso de teste, imprima uma linha contendo a frase já com as abreviações escolhidas e aplicadas.

Em seguida, imprima um inteiro N, indicando o número de palavras em que foram escolhidas uma letra para a abreviação no texto. Nas próximas N linhas, imprima o seguinte padrão “C. = P”, onde C é a letra inicial e P é a palavra escolhida para tal letra. As linhas devem ser impressas em ordem crescente da letra inicial.

Exemplos de Entrada  | Exemplos de Saída
------------- | -------------
abcdef abc abc abc | a. abc abc abc
. | 1
" " | a. = abcdef


#### Link Referência:
https://github.com/trepichio/DIOBootcampNodejs-Desafios/blob/master/06-Resolvendo%20Algoritmos%20com%20JavaScript/Desafio-02.js

Match(), Expressão Regular RegExp()( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions ).

validar Expressão Regular ( https://regex101.com/r/ZxRHYL/2/ )

Array.from() ( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/from ).

Map() ( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Map )

Filter() ( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro )

Reduce() ( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce )


#### Update: 
19-03-2021 Criado funções utilizando constantes (const). Criado funções com uma a duas funcionalidades. Ajustado nomenclatura das constantes e variaveis (Uso de conceitos CleanCode). 

```javascript
//SOLUCAO 1

/* .match(/\b[a-z]{1,30}\b/g) - busca palavras que tem apenas letras minusculas, ate 30 carateres.*/
const buscarLetrasMinusculas = (frases) => frases.match(/\b[a-z]{1,30}\b/g);

/* Array.from() - cria um array de frases nao repetidas, usando o conteudo que consta na variavel 'frase'*/
const strNaoRepetidas = (frase) => Array.from(frase);

/* .map() - verifica cada palavra, de acordo com a instrução passada*/
const verificarPalavras = (frase) => strNaoRepetidas(frase).map(str => {
    /*Primeira expressão - Verifica o tamanho da string menos 2 caracteres
    Segunda expressão - Verifica se a frase tem a strNaoRepetida, e retorna o tamanho dessa string
    Com o resultado das duas expressões, multiplca o valor e armazena na variavel*/
    const strTamanho = (str.length - 2) * (frase.join(' ').match(new RegExp(`\\b${str}\\b`, 'g')).length);
    /*Armazena a abreviação com ponto*/
    const abreviacao = str[0].concat('.');
    const titulo = abreviacao.concat(' = ').concat(str);
    const regexp = new RegExp(`\\b${str}\\b`, 'g');
    return { str, strTamanho, abreviacao, titulo, regexp }
});

/* .split('') -  o alfabeto, será tranformado em array*/
/* map() - verifica cada letra do array*/
/* arrObjStrings.filter() - cada letra do alfabeto é filtrado  no array 'arrObjStrings' */
/* .reduce() - faz a contagem, de cada letra que se repete*/
const verificarCaracter = (auxVerificarPalavras) => ('abcdefghijklmnopqrstuvwxyz').split('').map(letra => {
    return auxVerificarPalavras
        .filter(aux => aux.str.match(new RegExp(`\\b${letra}\\w{2,}\\b`, 'g')))
        .reduce((acc, curr) => curr.strTamanho >= acc.strTamanho ? curr : acc, { strTamanho: 0 });
}).filter(el => el.strTamanho > 0) /*filtra as letras que tem o tamanho maior que 0*/

/*Subtitui a frase inicial com a abreviacao padrao*/
const substituirFrasePadrao = (auxVerificarCaracter) => {
    for (const abrev of auxVerificarCaracter) frases = frases.replace(abrev.regexp, abrev.abreviacao);
    return frases
}

/* imprime a frase que foi substituida pela abreviacao + o tamanho das abrevicoes da frase + 
o titulo que contem as palavras que nao se repetem*/
const saidaDados = (frases, auxVerificarCaracter) => {
    console.log(frases + '\n' + auxVerificarCaracter.length);
    auxVerificarCaracter.sort().map(({ titulo }) => console.log(titulo));
}

/*Entrada de Dados*/
while ((frases = gets()) !== '.') {
    let frase = buscarLetrasMinusculas(frases);
    let auxVerificarPalavras = verificarPalavras(frase)
    let auxVerificarCaracter = verificarCaracter(auxVerificarPalavras)
    let auxSubstituirFrasePadrao = substituirFrasePadrao(auxVerificarCaracter)
    saidaDados(frases, auxVerificarCaracter);
}



//SOLUÇÃO 2
while ((frases = gets()) !== '.') {
    /* .match(/\b[a-z]{1,30}\b/g) - busca palavras que tem apenas letras minusculas, ate 30 carateres.*/
    const frase = frases.match(/\b[a-z]{1,30}\b/g);

    /* Array.from() - cria um array, usando o conteudo que consta na variavel 'frase'*/
    const strNaoRepetidas = Array.from(frase);

    /* .map() - verifica cada palavra, de acordo com a instrução passada*/
    const arrObjStrings = strNaoRepetidas.map(str => {

        /*Primeira expressão - Verifica o tamanho da string menos 2 caracteres
        Segunda expressão - Verifica se a frase tem a strNaoRepetida, e retorna o tamanho dessa string
        Com o resultado das duas expressões, multiplca o valor e armazena na variavel*/
        const strTamanho = (str.length - 2) * (frase.join(' ').match(new RegExp(`\\b${str}\\b`, 'g')).length);

        /*Armazena a abreviação com ponto*/
        const abreviacao = str[0].concat('.');
        const titulo = abreviacao.concat(' = ').concat(str);
        const regexp = new RegExp(`\\b${str}\\b`, 'g');
        return { str, strTamanho, abreviacao, titulo, regexp }
    });

    /* .split('') -  o alfabeto, será tranformado em array*/
    /* map() - verifica cada letra do array*/
    /* arrObjStrings.filter() - cada letra do alfabeto é filtrado  no array 'arrObjStrings' */
    /* .reduce() - faz a contagem, de cada letra que se repete*/
    const abreviacoes = ('abcdefghijklmnopqrstuvwxyz').split('').map(letra => {
        return arrObjStrings
            .filter(aux => aux.str.match(new RegExp(`\\b${letra}\\w{2,}\\b`, 'g')))
            .reduce((acc, curr) => curr.strTamanho >= acc.strTamanho ? curr : acc, { strTamanho: 0 });
    }).filter(el => el.strTamanho > 0) /*filtra as letras que tem o tamanho maior que 0*/

    /*Subtitui a frase inicial com a abreviacao padrao*/
    for (const abrev of abreviacoes) frases = frases.replace(abrev.regexp, abrev.abreviacao);

    /* imprime a frase que foi substituido pela abreviacao + o tamanho das abrevicoes da frase + 
    o titulo que contem as palavras que nao se repetem*/
    console.log(frases + '\n' + abreviacoes.length);
    abreviacoes.sort().map(({ titulo }) => console.log(titulo));
}
```
