$(function () {

    const currentUser = localStorage.getItem("user");
    if (currentUser == null) {
        window.location.href = "../";
    }

    const path = window.location.pathname;
    const page = path.split('/').filter(Boolean).pop();

    const routes = {
        "earnings": "btn-earnings",
        "earnings.html": "btn-earnings",
        "transactions": "btn-transaction-history",
        "transactions.html": "btn-transaction-history",
        "pos": "btn-pos",
        "pos.html": "btn-pos",
    };

    $(".menu-item").removeClass("active");

    if (routes[page] !== undefined) {
        $(`#${routes[page]}`).addClass("active");
    }

    $("#btn-earnings").on("click", function (e) {
        e.preventDefault();
        window.location.href = "../earnings";

    });
    $("#btn-pos").on("click", function (e) {
        e.preventDefault();
        window.location.href = "../pos";

    });

    $("#btn-logout").on("click", function (e) {

        e.preventDefault();

        toastr.success("Logging out...");

        localStorage.removeItem("user");

        setTimeout(() => {
            location.href = "../";
        }, 800);

    });

});