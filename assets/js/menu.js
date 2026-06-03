$(function () {

    const currentUser = localStorage.getItem("user");
    if (currentUser == null) {
        window.location.href = "../";
    }

    const page = location.pathname.split('/').pop();

    const routes = {
        "earnings.html": 0,
        "transactions.html": 1,
        "pos.html": 2
    };

    $(".sidebar a").removeClass("active");

    if (routes[page] !== undefined) {
        $(".sidebar a")
            .eq(routes[page])
            .addClass("active");
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