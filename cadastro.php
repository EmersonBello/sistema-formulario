<?php
require 'conexao.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = $_POST['nome'];
    $cpf = $_POST['cpf'];
    $nascimento = $_POST['nascimento'];
    $genero = $_POST['genero'];
    $logradouro = $_POST['logradouro'];
    $bairro = $_POST['bairro'];
    $numero = $_POST['numero'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $cep = $_POST['cep'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $usuario = $_POST['usuario'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios 
        (nome, cpf, nascimento, genero, logradouro, bairro, numero, cidade, estado, cep, email, telefone, usuario, senha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
    $stmt->bind_param("ssssssssssssss", $nome, $cpf, $nascimento, $genero, $logradouro, $bairro, $numero, $cidade, $estado, $cep, $email, $telefone, $usuario, $senha);

    if ($stmt->execute()) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
