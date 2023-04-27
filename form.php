<?php
// Get form input value from post object
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$city = $_POST['city'];
$state = $_POST['state'];
$password = $_POST['password'];
$retypePassword = $_POST['retype-password'];

// create password hash
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

$nameRegex = "/^[a-zA-Z']{3,8}$/";
$mobileRegex = "/^\d{3}-\d{3}-\d{4}$/";
//$emailRegex = "/^[a-zA-Z][\w-'.]*@[a-zA-Z]+(\.[a-zA-Z]+){1,2}$/";
$passwordRegex = "/^[a-zA-Z][a-zA-Z0-9]{5,}$/";

// Revalidate input
function form_data_is_valid()
{
    global $firstName, $lastName, $mobile,
           $stateAbbreviations, $email, $password,
           $passwordHash, $nameRegex, $mobileRegex, $state,
           $emailRegex, $passwordRegex, $retypePassword;

    if (preg_match($nameRegex, $firstName) &&
        preg_match($nameRegex, $lastName) &&
        preg_match($mobileRegex, $mobile) &&
        in_array($state, $stateAbbreviations) &&
        filter_var($email, FILTER_VALIDATE_EMAIL) &&
        preg_match($passwordRegex, $password) &&
        password_verify($retypePassword, $passwordHash)) {
            // clean mobile number and convert to int
            $mobile = str_replace("-", "", $mobile);
            return true;
        } else {
            return false;
        }

}

function send_form_data() {
    global $firstName, $lastName, $mobile, $email, $city, $state, $passwordHash;

    // Database Connection
    $host = "localhost";
    $dbname = "registration_form";
    $username = "root";
    $dbpass = "";

    $conn = mysqli_connect($host, $username, $dbpass, $dbname);

    if(mysqli_connect_errno()) {
        die("Connection error: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO user (firstname, lastname, mobile, email, city, state, password)
            VALUES(?, ?, ?, ?, ?, ?, ?)";
    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param("ssissss", $firstName, $lastName, $mobile, $email, $city, $state, $passwordHash);
    // $execval = $stmt->execute();

    // return $execval;

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        die(mysqli_error($conn));
    }

    // Use binding to prevent SQL injection attack
    mysqli_stmt_bind_param( $stmt, "ssissss",
                            $firstName,
                            $lastName,
                            $mobile,
                            $email,
                            $city,
                            $state,
                            $passwordHash );
    // Send data
    return mysqli_stmt_execute($stmt);
}

function init() {
    if (form_data_is_valid()) {
        $success = send_form_data();
        if ($success) {
            echo 'Registration completed, thank you';
        } else {
            echo 'Something went wrong';
        }
    }
}

init();
?>