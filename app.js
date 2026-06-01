const SUPABASE_URL = "https://bqbiufqfnulywbheossb.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYml1ZnFmbnVseXdiaGVvc3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTM2OTIsImV4cCI6MjA5NTg2OTY5Mn0.mZ6dWa2sc811Y2_rmBZEFvLK9bpCfvouKh22wZqLEnE";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: "Bearer " + SUPABASE_KEY,
  "Content-Type": "application/json"
};

// ➕ Insert customer
$("#saveBtn").click(function () {
  $.ajax({
    url: SUPABASE_URL + "users",
    method: "POST",
    headers: headers,
    data: JSON.stringify({
      name: $("#name").val(),
      username: $("#username").val()
    }),
    success: function () {
      alert("Saved!");
      loadCustomers();
    }
  });
});

// 📋 Load customers
function loadCustomers() {
  $.ajax({
    url: SUPABASE_URL + "users?select=*",
    method: "GET",
    headers: headers,
    success: function (data) {
      $("#list").empty();
      data.forEach(c => {
        $("#list").append(`<li>${c.name} - ${c.username}</li>`);
      });
    }
  });
}

loadCustomers();
