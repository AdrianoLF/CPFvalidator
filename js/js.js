function fazendoSlice(cpf) {
    const cpf11 = cpf.split('')
    const cpf9 = cpf11.slice(0, -2)
    return cpf9;
}

function array9num(cpf) {
    const cpf11 = cpf.split('')
    const cpf9 = cpf11.slice(0, -2)
    const array9string = cpf9.join('');
    const array9num = [];

    for (let i = 0; i <= cpf9.length - 1; i++) {
        let cada = Number(array9string[i]);
        array9num.push(cada)
    }
    return array9num;

}
function multiplicarA1(v1) {
    const multiplicarA1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const arrayMultiplicacaoDigit1 = []
    for (let i = 0; i <= 8; i++) {
        let valor = v1[i] * multiplicarA1[i];
        arrayMultiplicacaoDigit1.push(valor);
    }
    return arrayMultiplicacaoDigit1;
}
function multiplicarA2(v2) {
    const multiplicarA2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const arrayMultiplicacaoDigit2 = []
    for (let i = 0; i <= 9; i++) {
        let valor = v2[i] * multiplicarA2[i];
        arrayMultiplicacaoDigit2.push(valor);
    }
    return arrayMultiplicacaoDigit2;
}

function valorFormulaMatematica(soma) {
    const valor = ((Number(soma) * 10) % 11);
    if (valor > 9) return valor = '0';
    const valorString = valor.toString()
    return (valorString);
}

function validaCpf(cpf) {
    console.log(1)
    const div = document.querySelector('.answer');

    const cpfLimpo = cpf.replace([/\D+/g, '-', '.'], '');//Removendo todo caractere que não é um número
    const input = document.getElementById('cpf');
    if (cpfLimpo.length !== 11) {
        input.value = ''
        return alert("Use no máximo 11 números");
    }
    if (typeof Number(cpfLimpo) !== 'number') return mostrarDiv(div, `O CPF: ${cpf} é inválido`);
    //Verificação para números repetidos
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'];
    for (let r = 0; r <= 9; r++) {
        if (cpfLimpo == numerosRepetidos[r]) return mostrarDiv(div, `O CPF: ${cpf} é inválido`)
    }

    const arrayComNumerosColetados = cpfLimpo.split('')
    const arrayComNumMultiplicados1 = multiplicarA1(array9num(cpf));

    const somaaArrayComNumMultiplicados1 = arrayComNumMultiplicados1.reduce(function (acumulador, valor) {
        acumulador = acumulador + valor;
        return acumulador;
    });

    const valorFormula1 = valorFormulaMatematica(somaaArrayComNumMultiplicados1);

    const arrayNewTest = [...fazendoSlice(cpf), valorFormula1.toString()];
    const primeiroDigitCpf = arrayComNumerosColetados[9]
    if (primeiroDigitCpf !== valorFormula1) return mostrarDiv(div, `O CPF: ${cpf} tem o dígito 1 inválido`)

    const arrayComMultiplicacados2 = (multiplicarA2(arrayNewTest));
    const somaaArrayComNumMultiplicados2 = arrayComMultiplicacados2.reduce(function (acumulador, valor) {
        acumulador = acumulador + valor;
        return acumulador;
    });
    const valorFormula2 = valorFormulaMatematica(somaaArrayComNumMultiplicados2);

    const segundoDigitCpf = arrayComNumerosColetados[10]
    if (segundoDigitCpf !== valorFormula2) return mostrarDiv(div, `O CPF: ${cpf} tem o dígito 2 inválido`);

    mostrarDiv(div, `O CPF: ${cpf} foi validado e pode ser usado`);
}

function mostrarDiv(div, texto) {
    div.style.display = "flex";
    div.innerHTML = texto;
}

function naoAtt() {
    const captcaoDados = document.querySelector('.form');
    const cpf = captcaoDados.querySelector('#cpf');


    function recebeEventoForm(e) {
        e.preventDefault();
    }
    captcaoDados.addEventListener('submit', recebeEventoForm);

    validaCpf(cpf.value)
}