<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = (string)$_POST['phone']; // Cast phone to string explicitly
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Load environment variables
    $env = parse_ini_file('.env');
    $sender_email = $env['EMAIL_USER'];
    
    // Save to CSV
    $csv_file = 'entries.csv';
    $is_new_file = !file_exists($csv_file);
    
    // Open file in append mode
    $fp = fopen($csv_file, 'a');
    
    // If new file, add headers
    if ($is_new_file) {
        fputcsv($fp, array('Name', 'Email', 'Phone', 'Service', 'Message', 'Date'));
    }
    
    // Add new entry
    fputcsv($fp, array(
        $name,
        $email,
        $phone,
        $subject,
        $message,
        date('Y-m-d H:i:s')
    ));
    
    fclose($fp);
    
    // Send real email using PHPMailer
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->SMTPDebug = 2;          // verbose
$mail->Debugoutput = 'error_log';
    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $sender_email; // Gmail address from .env
        $mail->Password   = $env['EMAIL_PASSWORD']; // App password
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($sender_email, 'Raahatt');
        $mail->addAddress($email, $name); // send confirmation to client

        // Content
        $mail->isHTML(false);
        $mail->Subject = "Thank you for booking with Raahatt - " . $subject;
        $mail->Body    = "Dear $name,\n\nThank you for booking a session with Raahatt. We have received your appointment request:\nService: $subject\nPhone: $phone\nMessage: $message\n\nOur team will contact you shortly to confirm your appointment.\n\nBest regards,\nTeam Raahatt";

        $mail->send();
        header("Location: index.html?status=success&message=" . urlencode("Thank you! We will contact you shortly to confirm your appointment."));
        exit();
    } catch (\PHPMailer\PHPMailer\Exception $e) {
        error_log('PHPMailer Error: ' . $mail->ErrorInfo);
        header("Location: index.html?status=error&message=" . urlencode("Error sending email. Please try again later."));
        exit();
    }
} else {
    header("Location: index.html");
    exit();
}
?>
