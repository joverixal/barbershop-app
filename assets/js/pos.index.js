
$(document).ready(function () {

  // selection
  $(".service-card input").on("change", function () {

    const card = $(this).closest(".service-card");

    card.toggleClass("selected", this.checked);

    updateTotal();

  });

  // update total only
  function updateTotal() {

    let total = 0;

    $(".service-card input:checked").each(function () {
      total += parseFloat($(this).data("price"));
    });

    $("#total").text("₱" + formatNumber(total));

  }

  // pay
  $("#btn-pay").on("click", function () {

    const selected = $(".service-card input:checked");

    if (selected.length === 0) {
      toastr.warning("Please select a service");
      return;
    }

    toastr.success("Payment successful!");

    selected.prop("checked", false);
    $(".service-card").removeClass("selected");

    $("#total").text("₱0");

  });

  function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
  }
});