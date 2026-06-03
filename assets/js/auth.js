
$(document).ready(function () {


  const currentUser = localStorage.getItem("user");
  if (currentUser != null) {
    setTimeout(function () {
      window.location.href = "earnings";
    }, 300); // optional small delay for UX
  }

  $("#btn-login").click(function () {

    const btnLogin= $('#btn-login');
    
    btnLogin.prop('disabled', true);
    btnLogin.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging in..');

    const users = new SupabaseModel("Users");
    const username = $("#inp-username").val();
    const password = $("#inp-password").val();

    users.check({ Username: username, Password: password },{caseSensitive: true}, function (response) {

      if(response.exists){
        const user = {
          id : response.data.Id,
          accountId : response.data.AccountId,
          lastName : response.data.LastName,
          firstName : response.data.FirstName,
        };
        localStorage.setItem("user", JSON.stringify(user));

        toastr.success("Logging in..");
        setTimeout(() => {
          $("#inp-username").val('')
          $("#inp-password").val('');
          btnLogin.prop('disabled', false);
          btnLogin.html('Login'); // restore original text
          location.href = "../earnings";
        }, 800);
      }else{
        $("#inp-username").val('')
        $("#inp-password").val('');
        btnLogin.prop('disabled', false);
        btnLogin.html('Login'); // restore original text
        toastr.warning("Invalid username and/or password");
      }



    });

  });
});