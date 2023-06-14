<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  
  $emailPattern = '/[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/';
  if (!preg_match($emailPattern, $email)) {
    echo "Enter your email in the correct format: word@mail.domain";
    return;
  }
  
  $data = array(
    "name" => $name,
    "email" => $email,
    "message" => $message
  );
  
  $jsonData = json_encode($data);
  
  $url = "https://api.byteplex.info/api/test/contact/";
  
  $options = array(
    "http" => array(
      "method" => "POST",
      "header" => "Content-Type: application/json",
      "content" => $jsonData
    )
  );
  
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  
  if ($result !== false) {
    resetForm();
    echo "The data was sent successfully.";
  } else {
    echo "Something went wrong";
  }
}

function resetForm() {
  $name = "";
  $email = "";
  $message = "";
}
?>
