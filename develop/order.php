<?php
$email = $_POST['email'];

$message = "Имя — ".$_POST['first-name']." ".$_POST['last-name']."\n";
$message .= "Телефон — ".$_POST['tel']."\n";
$message .= "Email — ".$_POST['email']."\n";
$message .= "Компания — ".$_POST['company'];

$headers[]= "From: address@address.com";
$headers[]= "Content-Type: text/plain; charset=utf-8";

$header=implode("\r\n", $headers);

$subject = '=?UTF-8?B?'.base64_encode('Заявка на Webinar.ru').'?=';

mail('polshindanil@gmail.com', $subject, $message, $header);
?>
