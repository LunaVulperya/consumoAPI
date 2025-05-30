let cpf = document.querySelector("#cpf");
let cepform = document.querySelector("#cep");
// cep = cep.replace(/[^\d+]+/g, "");
cpf.addEventListener("keypress", ()=>{
    let tamanhoCampo = cpf.value.length;
    if(tamanhoCampo == 3 || tamanhoCampo == 7){
        cpf.value += ".";
    } else if(tamanhoCampo == 11){
        cpf.value += "-";
    }
});

cepform.addEventListener("keypress", ()=>{
    let tamanhoCampo = cepform.value.length;
    if(tamanhoCampo == 5){
        cepform.value += "-";
    }
});

//Impede caracteres alem de numeros de serem digitados
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

// Preenche o formulario
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value= endereco.logradouro;
    document.getElementById('bairro').value=endereco.bairro;
    document.getElementById('cidade').value=endereco.localidade;
    document.getElementById('estado').value=endereco.estado;
}



// Validador de CEP
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
function cepTrim(cep) {
    return cep.toString().replace(/\D/g, "");
  }

// Consumo de API viaCEP
const pesquisarCEP = async() => {
    limpa_formulário_cep();
    cepTrim(cep);
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const address = await dados.json();

        if(address.hasOwnProperty('erro')){
            alert('CEP não encontrado');
        } else {
            preencherFormulario(address);
        }
    } else {
        alert('CEP incorreto');
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCEP);


// function meu_callback(conteudo) {
// if (!("erro" in conteudo)) {
//     //Atualiza os campos com os valores.
//     document.getElementById('rua').value=(conteudo.logradouro);
//     document.getElementById('bairro').value=(conteudo.bairro);
//     document.getElementById('cidade').value=(conteudo.localidade);
//     document.getElementById('estado').value=(conteudo.estado);
//     document.getElementById('ibge').value=(conteudo.ibge);
// } //end if.
// else {
//     //CEP não Encontrado.
//     limpa_formulário_cep();
//     alert("CEP não encontrado.");
// }
// }

// function pesquisacep(valor) {

// //Nova variável "cep" somente com dígitos.
// var cep = valor.replace(/\D/g, '');

// //Verifica se campo cep possui valor informado.
// if (cep != "") {

//     //Expressão regular para validar o CEP.
//     var validacep = /^[0-9]{8}$/;

//     //Valida o formato do CEP.
//     if(validacep.test(cep)) {

//         //Preenche os campos com "..." enquanto consulta webservice.
//         document.getElementById('rua').value="...";
//         document.getElementById('bairro').value="...";
//         document.getElementById('cidade').value="...";
//         document.getElementById('uf').value="...";
//         document.getElementById('ibge').value="...";

//         //Cria um elemento javascript.
//         var script = document.createElement('script');

//         //Sincroniza com o callback.
//         script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

//         //Insere script no documento e carrega o conteúdo.
//         document.body.appendChild(script);

//     } //end if.
//     else {
//         //cep é inválido.
//         limpa_formulário_cep();
//         alert("Formato de CEP inválido.");
//     }
// } //end if.
// else {
//     //cep sem valor, limpa formulário.
//     limpa_formulário_cep();
// }
// };