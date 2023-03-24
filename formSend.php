<?php

class User
{
    public function __construct(public int $id, public string $email, public string $name)
    {
        $this->id = $id;
        $this->email = $email;
        $this->name = $name;
    }
}

$users = [
    new User(1, "user1@mail.ru", "User1"),
    new User(2, "user2@mail.ru", "User2"),
    new User(3, "user3@mail.ru", "User2"),
];

$name = $_POST['username'];
$surname = $_POST['usersurname'];
$email = $_POST['useremail'];
$password = $_POST['userpass'];
$repeatedPassword = $_POST['userrepeatedpass'];

$isEmailCorrect = str_contains($email, "@");
$isPasswordsMatch = $password === $repeatedPassword;

if ($isEmailCorrect && $isPasswordsMatch) {
    $isFound = false;
    foreach ($users as $element) {
        if ($email == $element->email) {
            $isFound = true;
            break;
        }
    }
    if ($isFound)
        $message = "Пользователь с данным email уже существует";
    else
        $message = "OK";
    file_put_contents("checkEmail.log", date("Y-m-d H:i:s -> ") . $message . "\n", FILE_APPEND);
} elseif (!$isEmailCorrect)
    $message = "Некорректный email";
else
    $message = "Пароли не совпадают";

$response = ["message" => $message];
header('Content-type: application/json');
echo json_encode($response);
