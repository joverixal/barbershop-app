
$(document).ready(function () {

    const earningsData = {
    today: {
      title: "Today Earnings",
      amount: "₱ 0.00",
      sub: "Updated today"
    },
    week: {
      title: "This Week Earnings",
      amount: "₱ 0.00",
      sub: "Last 7 days total"
    },
    month: {
      title: "This Month Earnings",
      amount: "₱ 0.00",
      sub: "Monthly total"
    }
  };

  // FILTER SWITCH
  $(".filter-btn").on("click", function () {

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    const key = $(this).data("filter");

    $("#filter-title").text(earningsData[key].title);
    $("#filter-amount").text(earningsData[key].amount);
    $("#filter-subtext").text(earningsData[key].sub);

  });
});