<?php

function navigate($pageName): void
{
    header("Location: ?p=" . $pageName);
}

function navButton($displayText, $pageName): void
{
    echo "<button class='btn btn-primary' onclick=\"location.href='admin-panel?p=$pageName'\">$displayText</button>";
}
