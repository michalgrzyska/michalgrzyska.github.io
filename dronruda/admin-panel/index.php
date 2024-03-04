<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="admin-panel/bootstrap/bootstrap5.css" rel="stylesheet" crossorigin="anonymous">
</head>

<?php
require 'utils.php'
?>

<body>
    <header><?php require 'components/header.php' ?></header>
    <div class="container py-3">
        <?php
        $page = $_GET["p"];

        switch ($page) {
            case "photos":
                require 'components/photos/photos.php';
                break;
            case "add-photo":
                require 'components/photos/add-photo.php';
                break;
            case "videos":
                require 'components/videos/videos.php';
                break;
            default:
                navigate("photos");
                break;
        }
        ?>
    </div>

</body>

<script src="admin-panel/bootstrap/bootstrap5.js" crossorigin="anonymous"></script>

</html>