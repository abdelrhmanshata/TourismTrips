// // // // // // // // // // // // // // // // // // // // // // // // // 
// get Current User By ID
var CurrentUserID = JSON.parse(localStorage.getItem("CurrentUser"));
function getCurrentUser(ID) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == ID) {
            return Users[index];
        }
    }
}

$('#update').on('click', function () {

    var userName = $('#userName').val();
    if (userName.length == 0) {
        $('#userName').attr('style', 'border: 1px solid red');
        $('#userName').attr('placeholder', 'Enter your Name!');
        return
    } else {
        $('#userName').attr('style', 'border: none');
    }

    var userPassword = $('#userPassword').val();
    if (userPassword.length == 0) {
        $('#userPassword').attr('style', 'border: 1px solid red');
        $('#userPassword').attr('placeholder', 'Enter your Password!');
        return
    } else {
        $('#userPassword').attr('style', 'border: none');
    }

    var userPhone = $('#userPhone').val();
    if (userPhone.length == 0) {
        $('#userPhone').attr('style', 'border: 1px solid red');
        $('#userPhone').attr('placeholder', 'Enter your Phone!');
        return
    } else {
        $('#userPhone').attr('style', 'border: none');
    }

    var CurrentUser = getCurrentUser(CurrentUserID);

    CurrentUser.UserName = userName;
    CurrentUser.Password = userPassword;
    CurrentUser.Phone = userPhone;

    updateUserData(CurrentUser);

    $('.UpdateContanier').toggleClass('hidden');
    $('#userName').val("");
    $('#userPassword').val("");
    $('#userPhone').val("");
});

function updateUserData(userData) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == userData.ID) {
            Users[index] = userData;
            localStorage.setItem("Users", JSON.stringify(Users));
        }
    }
    alert("Update Successfully");
}
// Logout Button
$('#logout').on('click', function () {
    localStorage.setItem("CurrentUser", JSON.stringify(null));
    window.open('../index/index.html', '_self');
})

// update User Info Button
$('#userProfile').on('click', function () {
    $('.UpdateContanier').toggleClass('hidden');
    if (CurrentUserID != null) {
        var CurrentUser = getCurrentUser(CurrentUserID);
        $('#userName').val(CurrentUser.UserName);
        $('#userPassword').val(CurrentUser.Password);
        $('#userPhone').val(CurrentUser.Phone);
    }
})
// close update User Info Button
$('#close').on('click', function () {
    $('.UpdateContanier').toggleClass('hidden');
})

// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // 