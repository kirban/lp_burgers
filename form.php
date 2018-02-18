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
$comment = safeEnter($_G_POSTET['comment']);

$need_change = safeEnter($_POST['need-change']);
$need_change = isset($need_change) ? 'Нужна' : 'Не нужна';
$paycard = safeEnter($_POST['paycard']);
$paycard = isset($paycard) ? 'Картой' : 'Наличкой';
$dontcall = safeEnter($_POST['dontcall']); // 1 или null
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
        <li>' . $name . '</li>
        <li>'. $phone .'</li>
        <li>'. $street .'</li>
        <li>'. $houseNum .'</li>
        <li>'. $corp .'</li>
        <li>'. $flat .'</li>
        <li>'. $floor .'</li>
        <li>'. $comment .'</li>
        <li>Need change?>>'. $need_change .' Pay by card>>'. $paycard .'</li>
        <li>'. $dontcall .'</li>
    </ul>
</body>
</html>';

$headers = "From: Site Admin <admin@example.com>\r\n".
            "MIME-Version: 1.0" . "\r\n" .
            "Content-type: text/html; charset=UTF-8" . "\r\n";

$mail = mail('kirillik95@yandex.ru', 'Zakaz', $message, $headers);

if ($mail) {
    echo 'done';
}else{
    echo'error';
}