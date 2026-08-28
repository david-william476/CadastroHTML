// =========================
// Campo CPF - aceita somente números
// =========================

const cpf = document.getElementById("cpf");

if (cpf) {
    cpf.addEventListener("input", function () {
        cpf.value = cpf.value.replace(/\D/g, "");
    });
}


// =========================
// Cadastro de usuários
// =========================

function cadastrar() {

    let nome = document.getElementById("nome");
    let email = document.getElementById("email");
    let senha = document.getElementById("senha");
    let confirmarSenha = document.getElementById("confirmarSenha");
    let dataNascimento = document.getElementById("dataNascimento");
    let cpf = document.getElementById("cpf");

    // Remove a borda vermelha
    nome.classList.remove("campoVazio");
    email.classList.remove("campoVazio");
    senha.classList.remove("campoVazio");
    confirmarSenha.classList.remove("campoVazio");
    dataNascimento.classList.remove("campoVazio");
    cpf.classList.remove("campoVazio");

    let possuiErro = false;

    if (nome.value.trim() === "") {
        nome.classList.add("campoVazio");
        possuiErro = true;
    }

    if (email.value.trim() === "") {
        email.classList.add("campoVazio");
        possuiErro = true;
    }

    if (senha.value.trim() === "") {
        senha.classList.add("campoVazio");
        possuiErro = true;
    }

    if (confirmarSenha.value.trim() === "") {
        confirmarSenha.classList.add("campoVazio");
        possuiErro = true;
    }

    if (dataNascimento.value === "") {
        dataNascimento.classList.add("campoVazio");
        possuiErro = true;
    }

    if (cpf.value.trim() === "") {
        cpf.classList.add("campoVazio");
        possuiErro = true;
    }

    if (possuiErro) {
        alert("Preencha todos os campos.");
        return;
    }

    // Verifica se as senhas são iguais
    if (senha.value !== confirmarSenha.value) {
        alert("As senhas não coincidem.");
        return;
    }

    let usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        dataNascimento: dataNascimento.value,
        cpf: cpf.value
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

window.location.href = "index.html";
}

// =========================
// Login (por enquanto)
// =========================

function login() {
    alert("Função de login ainda será implementada.");
}


// =========================
// Recuperar senha (por enquanto)
// =========================

function recuperar() {
    alert("Função de recuperação de senha ainda será implementada.");
}

//Carregar tabela

function carregarTabela() {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let tabela = document.getElementById("tabelaUsuarios");

    for (let i = 0; i < usuarios.length; i++) {

        let linha = tabela.insertRow();

        let colunaNome = linha.insertCell(0);
        let colunaData = linha.insertCell(1);
        let colunaCpf = linha.insertCell(2);
        let colunaAcao = linha.insertCell(3);

        colunaNome.innerHTML = usuarios[i].nome;

        let partes = usuarios[i].dataNascimento.split("-");
        let dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];

        colunaData.innerHTML = dataFormatada;
        colunaCpf.innerHTML = usuarios[i].cpf;

        colunaAcao.innerHTML =
        `<button class="btnExcluir" onclick="excluirUsuario(${i})">
            🗑️
        </button>`;
    }

}

function excluirUsuario(indice) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (confirm("Deseja realmente excluir este usuário?")) {

        usuarios.splice(indice, 1);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        location.reload();

    }

}