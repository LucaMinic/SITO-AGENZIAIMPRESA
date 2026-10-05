<?php
/*
 * Invio dei moduli di contatto del sito AgenziaImpresa (hosting con PHP).
 *
 * Il modulo invia una richiesta POST in JSON con: name, email, subject, message,
 * sede, origin, page, website (campo trappola anti-spam).
 * L'email arriva alla casella della sede scelta; il "Rispondi" va al mittente.
 *
 * Su GitHub Pages questo file non viene eseguito: il modulo mostra allora i
 * recapiti telefonici delle sedi.
 */

// ---- Configurazione destinatari ------------------------------------------------
$RECIPIENTS = [
    'milano'  => 'milano@agenziaimpresa.com',
    'mantova' => 'brescia@agenziaimpresa.com',   // indicato dal cliente (da confermare)
    'modena'  => 'modena@agenziaimpresa.com',
    'brescia' => 'brescia@agenziaimpresa.com',   // comprende Darfo Boario Terme
    'bologna' => 'adempio.pratiche@agenziaimpresa.com',
    'reggio-emilia' => 'milano@agenziaimpresa.com', // provvisorio: destinatario da indicare dal cliente
];
// Modulo generale senza sede scelta: sede legale (da confermare). "Apri la tua Agenzia": rete agenzie.
$DEFAULT_TO     = 'milano@agenziaimpresa.com';
$APRI_AGENZIA_TO = 'network@agenziaimpresa.com';
// Mittente tecnico: deve appartenere al dominio dell'hosting per non finire in spam.
$FROM = 'noreply@agenziaimpresa.com';
// -------------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['error' => 'method_not_allowed']);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

// Campo trappola compilato: è un bot. Risposta positiva senza inviare nulla.
if (!empty($data['website'])) {
    reply(200, ['ok' => true]);
}

// Testo pulito e limitato; nei campi di intestazione niente a capo (no header injection).
function field(array $d, string $key, int $max, bool $singleLine = true): string {
    $v = trim((string)($d[$key] ?? ''));
    if ($singleLine) {
        $v = preg_replace('/[\r\n]+/', ' ', $v);
    }
    return mb_substr($v, 0, $max, 'UTF-8');
}

$name    = field($data, 'name', 120);
$email   = field($data, 'email', 200);
$subject = field($data, 'subject', 200);
$message = field($data, 'message', 5000, false);
$sede    = field($data, 'sede', 20);
$origin  = field($data, 'origin', 60);
$page    = field($data, 'page', 300);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(400, ['error' => 'invalid']);
}
if (!array_key_exists($sede, $RECIPIENTS)) {
    $sede = '';
}

$to = $origin === 'apri-la-tua-agenzia'
    ? $APRI_AGENZIA_TO
    : ($sede !== '' ? $RECIPIENTS[$sede] : $DEFAULT_TO);

$subjectLine = '[Sito] ' . ($subject !== '' ? $subject : 'Richiesta informazioni')
    . ($sede !== '' ? ' – ' . ucfirst($sede) : '');

$body = "Nuovo messaggio dal sito AgenziaImpresa\n\n"
    . "Nome: {$name}\n"
    . "Email: {$email}\n"
    . 'Sede: ' . ($sede !== '' ? ucfirst($sede) : '—') . "\n"
    . 'Oggetto: ' . ($subject !== '' ? $subject : '—') . "\n"
    . "Provenienza: {$origin} ({$page})\n\n"
    . "Messaggio:\n{$message}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . mb_encode_mimeheader('Sito AgenziaImpresa', 'UTF-8') . " <{$FROM}>",
    'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . " <{$email}>",
    'X-Mailer: AgenziaImpresa-site',
];

$sent = mail(
    $to,
    mb_encode_mimeheader($subjectLine, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . $FROM
);

if (!$sent) {
    reply(502, ['error' => 'send_failed']);
}
reply(200, ['ok' => true]);
