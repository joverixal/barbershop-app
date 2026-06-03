
$(document).ready(function () {

  // selection
$(".service-card input").on("change", function () {

  const card = $(this).closest(".service-card");

  card.toggleClass("selected", this.checked);

  updateTotal();

});

// update total
function updateTotal() {

  let total = 0;

  $(".service-card input:checked").each(function () {
    total += parseFloat($(this).data("price"));
  });

  $("#total").text("₱" + total.toFixed(2));

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

  updateTotal();

});
});