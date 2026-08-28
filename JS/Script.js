// ================================
// IMPORTA O FIREBASE
// ================================

import {
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "./firebase.js";


// ================================
// VARIÁVEIS GLOBAIS
// ================================

let tabela = null;


// ================================
// INICIALIZAÇÃO DO SISTEMA
// ================================

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema() {

    console.log("Sistema iniciado.");

    configurarEventos();

    verificarPagina();

}


// ================================
// CONFIGURA TODOS OS EVENTOS
// ================================

function configurarEventos() {

    // Campo CPF
    const campoCpf = document.getElementById("cpf");

    if (campoCpf) {

        campoCpf.addEventListener("input", somenteNumeros);

    }

    // Botão cadastrar
    const btnCadastrar = document.getElementById("btnCadastrar");

    if (btnCadastrar) {

        btnCadastrar.addEventListener("click", cadastrar);

    }

    // Botão login
    const btnLogin = document.getElementById("btnLogin");

    if (btnLogin) {

        btnLogin.addEventListener("click", login);

    }

    // Botão recuperar
    const btnRecuperar = document.getElementById("btnRecuperar");

    if (btnRecuperar) {

        btnRecuperar.addEventListener("click", recuperarSenha);

    }

    // Botão limpar
    const btnLimpar = document.getElementById("limpar");

    if (btnLimpar) {

        btnLimpar.addEventListener("click", limparFormulario);

    }

    // Botão atualizar
    const btnAtualizar = document.getElementById("btnAtualizar");

    if (btnAtualizar) {

        btnAtualizar.addEventListener("click", carregarTabela);

    }

    // Guarda referência da tabela
    tabela = document.getElementById("tabelaUsuarios");

}


// ================================
// CPF SOMENTE NÚMEROS
// ================================

function somenteNumeros(evento) {

    evento.target.value =
        evento.target.value.replace(/\D/g, "");

}


// ================================
// LIMPA O FORMULÁRIO
// ================================

function limparFormulario() {

    const campos = document.querySelectorAll("input");

    campos.forEach(campo => {

        campo.value = "";

        campo.classList.remove("erro");

    });

}


// ================================
// REMOVE ERROS
// ================================

function limparErros() {

    const campos = document.querySelectorAll("input");

    campos.forEach(campo => {

        campo.classList.remove("erro");

    });

}

// ================================
// VALIDAÇÃO DOS CAMPOS
// ================================

function validarFormulario() {

    limparErros();

    let valido = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const dataNascimento = document.getElementById("dataNascimento");
    const cpf = document.getElementById("cpf");

    const campos = [
        nome,
        email,
        senha,
        confirmarSenha,
        dataNascimento,
        cpf
    ];

    campos.forEach(campo => {

        if (!campo) return;

        if (campo.value.trim() === "") {

            campo.classList.add("erro");
            valido = false;

        }

    });

    if (!valido) {

        alert("Preencha todos os campos.");
        return false;

    }

    if (senha.value !== confirmarSenha.value) {

        senha.classList.add("erro");
        confirmarSenha.classList.add("erro");

        alert("As senhas não coincidem.");

        return false;

    }

    if (cpf.value.length !== 11) {

        cpf.classList.add("erro");

        alert("CPF inválido.");

        return false;

    }

    return true;

}


// ================================
// CADASTRAR USUÁRIO
// ================================

async function cadastrar() {

    if (!validarFormulario()) {

        return;

    }

    const usuario = {

        nome: document.getElementById("nome").value.trim(),

        email: document.getElementById("email").value.trim(),

        senha: document.getElementById("senha").value,

        dataNascimento:
            document.getElementById("dataNascimento").value,

        cpf:
            document.getElementById("cpf").value

    };

    try {

        await addDoc(
            collection(db, "usuarios"),
            usuario
        );

        alert("Cadastro realizado com sucesso!");

        limparFormulario();

        window.location.href = "index.html";

    }

    catch (erro) {

        console.error("Erro ao cadastrar:", erro);

        alert("Não foi possível realizar o cadastro.");

    }

}

// ================================
// LOGIN
// ================================

async function login() {

    const email = document.querySelector('input[name="email"]');
    const senha = document.querySelector('input[name="password"]');

    if (!email || !senha) {

        return;

    }

    email.classList.remove("erro");
    senha.classList.remove("erro");

    if (email.value.trim() === "") {

        email.classList.add("erro");

        alert("Digite seu e-mail.");

        return;

    }

    if (senha.value.trim() === "") {

        senha.classList.add("erro");

        alert("Digite sua senha.");

        return;

    }

    try {

        const consulta = await getDocs(
            collection(db, "usuarios")
        );

        let encontrado = false;

        consulta.forEach((documento) => {

            const usuario = documento.data();

            if (

                usuario.email === email.value.trim() &&
                usuario.senha === senha.value

            ) {

                encontrado = true;

            }

        });

        if (encontrado) {

            alert("Login realizado com sucesso!");

            window.location.href = "tabela.html";

        }

        else {

            alert("E-mail ou senha incorretos.");

        }

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao realizar login.");

    }

}


// ================================
// RECUPERAR SENHA
// ================================

async function recuperarSenha() {

    const email = document.querySelector('input[type="email"]');

    if (!email) {

        return;

    }

    email.classList.remove("erro");

    if (email.value.trim() === "") {

        email.classList.add("erro");

        alert("Digite seu e-mail.");

        return;

    }

    try {

        const consulta = await getDocs(
            collection(db, "usuarios")
        );

        let encontrado = false;

        consulta.forEach((documento) => {

            const usuario = documento.data();

            if (usuario.email === email.value.trim()) {

                encontrado = true;

            }

        });

        if (encontrado) {

            alert(
                "E-mail localizado.\n\nEm breve enviaremos uma recuperação automática."
            );

        }

        else {

            alert("E-mail não encontrado.");

        }

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao consultar o banco.");

    }

}

// ================================
// CARREGA A TABELA
// ================================

async function carregarTabela() {

    if (!tabela) {

        return;

    }

    const corpoTabela = tabela.querySelector("tbody");

    corpoTabela.innerHTML = "";

    try {

        const consulta = await getDocs(
            collection(db, "usuarios")
        );

        consulta.forEach((documento) => {

            const usuario = documento.data();

            const linha = corpoTabela.insertRow();

            const colunaNome = linha.insertCell(0);
            const colunaData = linha.insertCell(1);
            const colunaCpf = linha.insertCell(2);
            const colunaAcao = linha.insertCell(3);

            colunaNome.textContent = usuario.nome;

            colunaData.textContent =
                formatarData(usuario.dataNascimento);

            colunaCpf.textContent = usuario.cpf;

            const botao = document.createElement("button");

            botao.textContent = "🗑️";

            botao.className = "btnExcluir";

            botao.addEventListener("click", () => {

                excluirUsuario(documento.id);

            });

            colunaAcao.appendChild(botao);

        });

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar usuários.");

    }

}



// ================================
// FORMATA A DATA
// ================================

function formatarData(data) {

    if (!data) {

        return "";

    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}



// ================================
// EXCLUIR USUÁRIO
// ================================

async function excluirUsuario(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este usuário?"
    );

    if (!confirmar) {

        return;

    }

    try {

        await deleteDoc(
            doc(db, "usuarios", id)
        );

        await carregarTabela();

        alert("Usuário excluído com sucesso!");

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao excluir usuário.");

    }

}

// ================================
// ATUALIZA A TABELA
// ================================

async function atualizarTabela() {

    await carregarTabela();

}



// ================================
// VERIFICA QUAL PÁGINA FOI ABERTA
// ================================

function verificarPagina() {

    const pagina = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    switch (pagina) {

        case "tabela.html":

            carregarTabela();

            break;

        case "index.html":

            break;

        case "cadastro.html":

            break;

        case "recupera.html":

            break;

        default:

            break;

    }

}



// ================================
// UTILITÁRIOS
// ================================

function mostrarMensagem(texto) {

    alert(texto);

}



function mostrarErro(texto) {

    console.error(texto);

    alert(texto);

}



// ================================
// FUTURAS FUNÇÕES
// ================================

// editarUsuario()
// logout()
// autenticação Firebase
// pesquisa por CPF
// pesquisa por Nome

// ================================
// EXPORTA PARA O HTML
// ================================

// Como estamos usando ES Modules,
// disponibilizamos apenas as funções
// que podem ser chamadas pelo HTML,
// caso sejam necessárias futuramente.

window.cadastrar = cadastrar;

window.login = login;

window.recuperarSenha = recuperarSenha;

window.carregarTabela = carregarTabela;

window.excluirUsuario = excluirUsuario;

window.limparFormulario = limparFormulario;

window.atualizarTabela = atualizarTabela;


// ================================
// FIM DO SCRIPT
// ================================