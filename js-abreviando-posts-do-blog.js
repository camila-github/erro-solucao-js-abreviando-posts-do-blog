//SOLUCAO 1
const buscarLetrasMinusculas = (frases) => frases.match(/\b[a-z]{1,30}\b/g);

const strNaoRepetidas = (frase) => Array.from(frase);

const verificarPalavras = (frase) => strNaoRepetidas(frase).map(str => {
    const strTamanho = (str.length - 2) * (frase.join(' ').match(new RegExp(`\\b${str}\\b`, 'g')).length);
    const abreviacao = str[0].concat('.');
    const titulo = abreviacao.concat(' = ').concat(str);
    const regexp = new RegExp(`\\b${str}\\b`, 'g');
    return { str, strTamanho, abreviacao, titulo, regexp }
});

const verificarCaracter = (auxVerificarPalavras) => ('abcdefghijklmnopqrstuvwxyz').split('').map(letra => {
    return auxVerificarPalavras
        .filter(aux => aux.str.match(new RegExp(`\\b${letra}\\w{2,}\\b`, 'g')))
        .reduce((acc, curr) => curr.strTamanho >= acc.strTamanho ? curr : acc, { strTamanho: 0 });
}).filter(el => el.strTamanho > 0)

const substituirFrasePadrao = (auxVerificarCaracter) => {
    for (const abrev of auxVerificarCaracter) frases = frases.replace(abrev.regexp, abrev.abreviacao);
    return frases
}

const saidaDados = (frases, auxVerificarCaracter) => {
    console.log(frases + '\n' + auxVerificarCaracter.length);
    auxVerificarCaracter.sort().map(({ titulo }) => console.log(titulo));
}

while ((frases = gets()) !== '.') {
    let frase = buscarLetrasMinusculas(frases);
    let auxVerificarPalavras = verificarPalavras(frase)
    let auxVerificarCaracter = verificarCaracter(auxVerificarPalavras)
    let auxSubstituirFrasePadrao = substituirFrasePadrao(auxVerificarCaracter)
    saidaDados(frases, auxVerificarCaracter);
}



//SOLUCAO 2
while ((frases = gets()) !== '.') {
    const frase = frases.match(/\b[a-z]{1,30}\b/g);

    const strNaoRepetidas = Array.from(frase);

    const arrObjStrings = strNaoRepetidas.map(str => {
        const strTamanho = (str.length - 2) * (frase.join(' ').match(new RegExp(`\\b${str}\\b`, 'g')).length);
        const abreviacao = str[0].concat('.');
        const titulo = abreviacao.concat(' = ').concat(str);
        const regexp = new RegExp(`\\b${str}\\b`, 'g');
        return { str, strTamanho, abreviacao, titulo, regexp }
    });

    const abreviacoes = ('abcdefghijklmnopqrstuvwxyz').split('').map(letra => {
        return arrObjStrings
            .filter(aux => aux.str.match(new RegExp(`\\b${letra}\\w{2,}\\b`, 'g')))
            .reduce((acc, curr) => curr.strTamanho >= acc.strTamanho ? curr : acc, { strTamanho: 0 });
    }).filter(el => el.strTamanho > 0)

    for (const abrev of abreviacoes) frases = frases.replace(abrev.regexp, abrev.abreviacao);

    console.log(frases + '\n' + abreviacoes.length);
    abreviacoes.sort().map(({ titulo }) => console.log(titulo));
}