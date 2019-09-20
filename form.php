<?php

function safeEnter($s){
    $s = htmlentities(trim(strip_tags($s)));
    return $s;
}


$name = safeEnter($_POST['username']);
$phone = safeEnter($_POST['phone']);
$street = safeEnter($_POST['street']);
$houseNum = safeEnter($_POST['houseNum']);
$corp = safeEnter($_POST['corp']);
$flat = safeEnter($_POST['flat']);
$floor = safeEnter($_POST['floor']);
$comment = safeEnter($_POST['comment']);

$paymethod = $_POST['payment'];

$dontcall = safeEnter($_POST['callback']); // 1 или null
$dontcall = isset($dontcall) ? 1 : 0;   // 1 - не беспокоить, 0 - не задано

$message = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>Order</h2>
    <ul>
        <li>Имя>>' . $name . '</li>
        <li>Номер>>'. $phone .'</li>
        <li>Улица>>'. $street .'</li>
        <li>Дом>>'. $houseNum .'</li>
        <li>Корпус>>'. $corp .'</li>
        <li>Квартира>>'. $flat .'</li>
        <li>Этаж>>'. $floor .'</li>
        <li>Комментарий>>'. $comment .'</li>
        <li>Cпособ оплаты>>'. $paymethod .'</li>
        <li>Не звоните мне>>'. ($dontcall == 1) ? "Да":"Нет" .'</li>
    </ul>
</body>
</html>';

$headers = "From: Site Admin <admin@example.com>\r\n".
            "MIME-Version: 1.0" . "\r\n" .
            "Content-type: text/html; charset=UTF-8" . "\r\n";

$mail = mail("kirillik95@yandex.ru", "Заказ", $message, $headers);

$data = [];

if ($mail) {
    $data['status'] = "OK";
    $data['mes'] = "Order successfully sent!";
}else{
    $data['status'] = "ERROR";
    $data['mes'] = "Server ERROR!!";
}
echo json_encode($data);
