<?php 

$dotenvPath = __DIR__ . '/../.env';

if(file_exists($dotenvPath)){
    $lines = file($dotenvPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
       if(strpos($line, '=') !== false){
        list($name, $value) = explode('=', $line, 2);
        putenv("$name=$value");
       }
    }
}

$apiKey = getenv('YOUTUBE_API_KEY');
$channelId = getenv('YOUTUBE_ID_CHANNEL');
header('Content-Type: application/json');

if(!$apiKey || !$channelId){
    echo json_encode(['error' => 'Youtube api key atau Youtube channel id belum ditemukan']);
    exit();
}

$url = "https://www.googleapis.com/youtube/v3/search?key={$apiKey}&channelId={$channelId}&part=snippet&order=date&maxResults=10";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);

if($response === false){
    echo json_encode([
        'error' => 'Gagal memanggil api youtube', 
        'detail' => curl_error($ch)
    ]);
    curl_close($ch);
    exit();
}

curl_close($ch);
echo $response;