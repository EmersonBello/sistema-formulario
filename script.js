document.addEventListener("DOMContentLoaded", () => {
  const cpf = document.getElementById("cpf");
  const cep = document.getElementById("cep");
  const telefone = document.getElementById("telefone");
  const generoInput = document.getElementById("genero");
  const genderGroup = document.getElementById("genderGroup");
  const senha = document.getElementById("senha");
  const confirmarSenha = document.getElementById("confirmarSenha");
  const form = document.querySelector("form");

  // === Máscara: CPF ===
  if (cpf) cpf.addEventListener("input", () => {
    cpf.value = cpf.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  // === Máscara: CEP ===
  if (cep) cep.addEventListener("input", () => {
    cep.value = cep.value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
  });

  // === API ViaCEP para preenchimento automático ===
  if (cep) {
    cep.addEventListener("blur", () => {
      const cepValue = cep.value.replace(/\D/g, "");
      if (cepValue.length !== 8) return;

      fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            alert("CEP não encontrado.");
            return;
          }

          document.getElementById("logradouro").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("estado").value = data.uf || "";
        })
        .catch(() => alert("Erro ao buscar o CEP."));
    });
  }

  // === Máscara: Telefone ===
  if (telefone) telefone.addEventListener("input", () => {
    telefone.value = telefone.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  });

  // === Seleção de Gênero ===
  if (genderGroup && generoInput) {
    const buttons = genderGroup.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        generoInput.value = btn.getAttribute("data-value");
      });
    });
  }

  // === Validação de Senha e Gênero ===
  if (form && senha && confirmarSenha) {
    form.addEventListener("submit", (e) => {
      if (senha.value !== confirmarSenha.value) {
        e.preventDefault();
        alert("As senhas não coincidem.");
        confirmarSenha.focus();
      }

      if (generoInput && generoInput.value === "") {
        e.preventDefault();
        alert("Por favor, selecione um gênero.");
      }
    });
  }
});
