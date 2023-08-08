<?php
    array_walk($_POST, create_function('&$val,$key','$val=" $key: "$val"<br>";'));
    $text = implode($_POST," : ");
    mail("info@clintspace.com", "New Lead", $text, "X-Mailer: PHP/");
    header('Location: confirm.html'); // ссылка на страницу спасибо
    ?>