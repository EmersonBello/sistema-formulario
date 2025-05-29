document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const cadastroForm = document.getElementById("cadastroForm");

  // Máscaras simples para CPF, Telefone e CEP
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  if (cpfInput) {
    cpfInput.addEventListener("input", () => {
      cpfInput.value = cpfInput.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener("input", () => {
      telefoneInput.value = telefoneInput.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    });
  }

  if (cepInput) {
    cepInput.addEventListener("input", () => {
      cepInput.value = cepInput.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    });

    cepInput.addEventListener("blur", () => {
      // Simulação de preenchimento automático (mock)
      const cep = cepInput.value;
      if (cep === "01001-000") {
        document.getElementById("cidade").value = "São Paulo";
        document.getElementById("estado").value = "SP";
      }
    });
  }

  // Validação do formulário de Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("loginUser").value.trim();
      const pass = document.getElementById("loginPass").value.trim();

      if (!user || !pass) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Simulação do envio dos dados
      console.log("Login enviado:", { user, pass });
      alert("Login enviado! (Simulação)");
      loginForm.reset();
    });
  }

  // Validação do formulário de Cadastro
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Coleta dados do formulário
      const nome = document.getElementById("nome").value.trim();
      const cpf = document.getElementById("cpf").value.trim();
      const nascimento = document.getElementById("nascimento").value;
      const genero = cadastroForm.querySelector('input[name="genero"]:checked');
      const logradouro = document.getElementById("logradouro").value.trim();
      const bairro = document.getElementById("bairro").value.trim();
      const numero = document.getElementById("numero").value.trim();
      const cidade = document.getElementById("cidade").value.trim();
      const estado = document.getElementById("estado").value;
      const cep = document.getElementById("cep").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;

      // Verifica campos obrigatórios
      if (!nome || !cpf || !nascimento || !genero || !logradouro || !bairro || !numero ||
          !cidade || !estado || !cep || !email || !telefone || !usuario || !senha || !confirmarSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Valida CPF (básica)
      if (!validaCPF(cpf)) {
        alert("CPF inválido.");
        return;
      }

      // Valida email
      if (!validaEmail(email)) {
        alert("E-mail inválido.");
        return;
      }

      // Valida telefone (11 dígitos)
      if (telefone.replace(/\D/g, "").length !== 11) {
        alert("Telefone inválido.");
        return;
      }

      // Valida nome de usuário mínimo 5 caracteres
      if (usuario.length < 5) {
        alert("Nome de usuário deve ter no mínimo 5 caracteres.");
        return;
      }

      // Valida senha: mínimo 8 caracteres, maiúscula, minúscula e número
      if (!validaSenha(senha)) {
        alert("Senha deve ter no mínimo 8 caracteres, incluir letras maiúsculas, minúsculas e números.");
        return;
      }

      // Confirma senha igual à senha
      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
      }

      // Simula envio dos dados
      const dados = {
        nome,
        cpf,
        nascimento,
        genero: genero.value,
        logradouro,
        bairro,
        numero,
        cidade,
        estado,
        cep,
        email,
        telefone,
        usuario,
      };

      console.log("Cadastro enviado:", dados);
      alert("Cadastro enviado! (Simulação)");
      cadastroForm.reset();
    });
  }

  // Funções auxiliares

  function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  function validaEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function validaSenha(senha) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(senha);
  }
});
