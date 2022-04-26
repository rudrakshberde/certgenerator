<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

$response = array();
$upload_dir = 'public/uploads/';
$upload_filepath='uploads/';
$server_url = 'http://localhost:4000';

if($_FILES['file'])
{
    $count = count($_FILES['file']['name']);
    for ($i = 0; $i < $count; $i++) {

        $file_name = $_FILES["file"]["name"][$i];
        $file_tmp_name = $_FILES["file"]["tmp_name"][$i];
        $error = $_FILES["file"]["error"][$i];
    
        if($error > 0){
            array_push($response,array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            ));
        }else 
        {
            $random_name = rand(1000,1000000)."-".$file_name;
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
            $upload_url = $upload_filepath.strtolower($random_name);
            $upload_url = preg_replace('/\s+/', '-', $upload_url);
            if(move_uploaded_file($file_tmp_name , $upload_name)) {

                // Convert uploaded file into Base64
                $path = './'.$upload_name;
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64URL = 'data:image/' . $type . ';base64,' . base64_encode($data);

                  array_push($response,array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" =>$upload_url,
                    "base64" => $base64URL,
                    "total" => $count
                  ));
            }else
            {
                array_push($response,array(
                    "status" => "danger",
                    "error" => true,
                    "url" =>  $file_name,
                    "message" => "Error uploading the file!"
                ));
            }
        }
    }

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => print_r($_FILES['file'])
    );
}

echo json_encode($response);
?>