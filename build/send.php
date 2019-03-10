<?php

if ($_POST) { // если передан массив POST

    $name = htmlspecialchars($_POST["name"]); // пишем данные в переменные и экранируем спецсимволы
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = "<h1 style='text-align: center; background-color: #000000; padding:20px; color: #ffffff;'>Новая заявка</h1>
	 <table cellspacing='0' style='border: 1px solid #000000; width:100%; background-color: #ffffff;'>
		 <tbody>
			<tr><td style='border: 1px solid #000;'>Name:</td><td style='border: 1px solid #000;'>".$name."</td></tr>
			<tr><td style='border: 1px solid #000;'>Phone:</td><td style='border: 1px solid #000;'>".$phone."</td></tr>
			<tr><td style='border: 1px solid #000;'>E-mail:</td><td style='border: 1px solid #000;'>".$email."</td></tr>
		 </tbody>
	 </table>";
    function mime_header_encode($str, $data_charset, $send_charset) { // функция преобразования заголовков в верную кодировку 
        if($data_charset != $send_charset)
        $str=iconv($data_charset,$send_charset.'//IGNORE',$str);
        return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
    }

    /* супер класс для отправки письма в нужной кодировке */

    class TEmail {
    public $from_email;
    public $from_name;
    public $to_email;
    public $to_name;
    public $subject;
    public $data_charset='UTF-8';
    public $send_charset='windows-1251';
    public $body='';
    public $type='text/html';

    function send(){
        $dc=$this->data_charset;
        $sc=$this->send_charset;
        $enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
        $enc_subject=mime_header_encode($this->subject,$dc,$sc);
        $enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
        $enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
        $headers='';
        $headers.="Mime-Version: 1.0\r\n";
        $headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
        $headers.="From: ".$enc_from."\r\n";
        return mail($enc_to,$enc_subject,$enc_body,$headers);
    }

    }

    $emailgo= new TEmail; // инициализируем супер класс отправки
    $emailgo->from_email= 'Fyutura'; // от кого
    $emailgo->from_name= 'Fyutura';
    $emailgo->to_email= 'info@fyutura.com'; // кому  ruslan.brother@gmail.com
    $emailgo->to_name= $name;
    $emailgo->subject= "Новая заявка на сайте Fyutura"; // тема
    $emailgo->body= $message; // сообщение
    $emailgo->send(); // отправляем

    $json['error'] = 0; // ошибок не было

    echo json_encode($json); // выводим массив ответа
} else { // если массив POST не был передан
    echo 'GET LOST!'; // высылаем
}
?>