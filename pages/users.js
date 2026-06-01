const users = new SupabaseModel("users");

users.getAll({
  orderBy: { column: "created_at", direction: "desc" },
  limit: 10
}, function (data) {

  $("#list").empty();

  data.forEach(c => {
    $("#list").append(`
      <li>
        ${c.Name} - ${c.Username}
        <button onclick="edit('${c.Id}')">Edit</button>
        <button onclick="del('${c.Id}')">Delete</button>
      </li>
    `);
  });

});

$("#saveBtn").click(function () {
  users.save({
    Name: $("#name").val(),
    Username: $("#username").val()
  }, function () {
    alert("Saved!");
  });
});
