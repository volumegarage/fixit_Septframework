<?php

function is_ajax() {
return isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&  $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}

if(is_ajax()) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $service = $_POST['service'];
  $message = $_POST['message'];
  $time = $_POST['time'];

  $header = 'From: ' . $email . " \r\n";
      $header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
      $header .=  "Mime-Version: 1.0  \r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

      $body = "Name: " . $name . " \r\n";
      $body .= "Email: " . $email . " \r\n";
      $body .= "Telephone: " . $phone . " \r\n";
      $body .= "Type of Service: " . $service . " \r\n";
      $body .= "What Time?: " . $time . " \r\n";
      $body .= "Project Description: " . $message . " \r\n";
      $body .= "This email is from MrFixItHomes.com";

      $for = "volumegarage@gmail.com";
      $subject = "URGENT - Contact from Mr Fix It Website";
      mail($for, $subject, $body, $header);

      echo json_encode(array(
        'message' => 'Quote Submitted',
        'name'  =>  $name,
      ));

} else {
  header('Location: http://www.mrfixithomes.com/contact-thank-you.html');
}

?>
