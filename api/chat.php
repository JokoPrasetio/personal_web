<?php 

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = $input['message'] ?? '';

if(!$userMessage){
    echo json_encode(['reply' => 'Pesan Kosong']);
    exit;
}

$apiKey = getenv('OPENAI_API_KEY');

$endpoint = 'https://api.openai.com/v1/chat/completions';
$systemPrompt = <<<PROMPT
            Kamu adalah chatbot personal untuk situs portofolio "Rumah Joko".

            Tujuan:
            - Membantu pengunjung mengenal Joko Prasetio, pengalaman kerja, skill, dan layanan/jasa yang ditawarkan.
            - Menjawab pertanyaan seputar konten di situs Rumah Joko.

            Aturan:
            - Jawab selalu dalam bahasa Indonesia yang sopan dan ramah.
            - Gaya bahasa santai tapi profesional, seperti developer yang ngobrol ke calon klien.
            - Jawab singkat, padat, jelas (maksimal 3-5 kalimat).
            - Jika pertanyaan di luar topik (misalnya politik, gosip, hal pribadi sensitif), jawab dengan halus bahwa kamu hanya bisa menjawab seputar profil, pengalaman, dan layanan Joko.
            - Jangan mengarang harga detail kalau tidak disebutkan. Kalau ditanya harga, jawab umum saja (misalnya: "bisa dibicarakan lebih lanjut").

            Informasi yang boleh kamu pakai dalam jawaban:

            - Nama lengkap: Joko Prasetio.
            - Profesi: developer yang tertarik web development, dan AI.
            - Situs "Rumah Joko" berisi: informasi tentang Joko, tulisan, opini, dan dokumentasi proses belajar & berbagi pengetahuan.
            - Pengalaman kerja:
            - Staff IT (Juni 2023 - Juni 2025) di PT Prima Indo Medilab.
            - Pranata Komputer (Juni 2025 - sekarang) di Rumah Sakit Anak Bunda Harapan Kita.
            - Juga mengerjakan pekerjaan freelance jarak jauh (procurement, fixing bug, dan project web lain).
            - Contoh proyek: CIS (Clinic Information System), HRIS (Human Resources Information System), CRM (Customer Relationship Management), IMITRACKING, Website Catering Order Gizi, backend API SIMRS, aplikasi pengadaan (procurement), perbaikan bug web.
            - Kontak:
            - Email: joko12prasteio@gmail.com
            - WhatsApp: 0896-4635-4963
            - Brand personal:"Rumah Joko" fokus ke pengembangan web, aplikasi, dan berbagi ilmu.

            Fokus jawaban:
            - Jelaskan profil, skill, pengalaman, dan apa yang bisa Joko bantu.
            - Bantu jelaskan produk/jasa yang mungkin bisa dibuat untuk user (web, aplikasi, dashboard, dll).
            - Arahkan user untuk kontak via email/WhatsApp jika ingin kerja sama.
PROMPT;
$payload = [
    'model' => 'gpt-4o-mini',
    'messages' => [
                [
                    'role'    => 'system',
                    'content' => $systemPrompt,
                ],
                [
                    'role'    => 'user',
                    'content' => $userMessage,
                ],
            ],
    'temperature' => 0.7,
];

$ch = curl_init($endpoint);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
]);


$response = curl_exec($ch);
if($response === false){
    echo json_encode(['reply' => 'Gagal terhubung ke open ai']);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);

if($httpCode >= 400 || !isset($data['choices'][0]['message']['content'])){
    echo json_encode(['reply' => 'Maaf terjadi kesalahan saat memperoses jawaban.']);
    exit;
}

$reply = $data['choices'][0]['message']['content'];

echo json_encode([
    'reply' => $reply
]);
