//SOLUÇÃO 1
while ((frases = gets()) !== '.') {
    /* .match(/\b[a-z]{1,30}\b/g) - busca palavras que tem apenas 
    letras minusculas, ate 30 carateres.*/
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