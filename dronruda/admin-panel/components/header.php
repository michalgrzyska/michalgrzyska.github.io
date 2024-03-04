<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand">Panel administratora</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link <?php activeIf("photos") ?>" href="/admin-panel?p=photos">Zdjęcia</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  <?php activeIf("videos") ? "active text-primary" : "" ?>" href="/admin-panel?p=videos">Filmy</a>
                </li>
        </div>
    </div>
</nav>

<?php

function activeIf($pageName): void
{
    if ($_GET["p"] === $pageName) {
        echo "active fw-bold";
    }
}
