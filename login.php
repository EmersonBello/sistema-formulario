<?php
require 'conexao.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];

    $stmt = $conn->prepare("SELECT id, senha FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $senha_hash);
        $stmt->fetch();

        if (password_verify($senha, $senha_hash)) {
            $_SESSION['usuario_id'] = $id;
            header("Location: painel.php"); // redirecione para o painel
            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }

    $stmt->close();
    $conn->close();
}
?>
