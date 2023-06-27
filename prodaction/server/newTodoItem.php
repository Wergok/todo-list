<?
$text = $_POST["text"];
$connect =  mysqli_connect("localhost", "root2", "", "todolist");

if (!$connect) {
   die("Ошибка подключения к БД");
}

mysqli_set_charset($connect, "utf-8");

$text = mysqli_real_escape_string($connect, $text);
$query = "INSERT INTO todo (id, text) VALUES (NULL, '$text');";
mysqli_query($connect, $query);

$query_id = "SELECT id FROM todo ORDER BY id DESC LIMIT 1";
$id_list = mysqli_query($connect, $query_id);
mysqli_close($connect);

if ($id_list && mysqli_num_rows($id_list) > 0) {
   $row = mysqli_fetch_assoc($id_list);
   $id = $row["id"];
} else {
   die("Ошибка при поучении id");
}


$response = ["message" => '<li class="todo__list-item" id="' . $id . '"><p class="todo__list-text">' . $text . '</p><button class="todo__list-button" id="' . $id . '"><span></span><span></span></button></li>'];

header('Content-Type: application/json');
echo json_encode($response);
