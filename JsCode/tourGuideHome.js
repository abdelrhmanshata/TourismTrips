function clearStorage() {
    localStorage.clear();
}
// clearStorage();
$('#logout').on('click', function () { 
    localStorage.setItem("CurrentUser", JSON.stringify(""));
    window.open('../index.html', '_self');
});
// get Current User is Found
var CurrentUserID = JSON.parse(localStorage.getItem("CurrentUser"));
if (CurrentUserID != null) {
    var CurrentUser = getCurrentUser(CurrentUserID);
    $('#tourGuideName').val(CurrentUser.UserName);
    $('#tourGuidePassword').val(CurrentUser.Password);
    $('#tourGuidePhone').val(CurrentUser.Phone);
    $('#tourGuideBrief').val(CurrentUser.Brief);
}

$('#updateTourGuide').on('click', function () {
    var userName = $('#tourGuideName').val();
    if (userName.length == 0) {
        $('#tourGuideName').attr('style', 'border: 1px solid red');
        $('#tourGuideName').attr('placeholder', 'Enter your name!');
        return
    } else {
        $('#tourGuideName').attr('style', 'border: none');
    }

    var userPassword = $('#tourGuidePassword').val();
    if (userPassword.length == 0) {
        $('#tourGuidePassword').attr('style', 'border: 1px solid red');
        $('#tourGuidePassword').attr('placeholder', 'Enter your password!');
        return
    } else {
        $('#tourGuidePassword').attr('style', 'border: none');
    }

    var userPhone = $('#tourGuidePhone').val();
    if (userPhone.length == 0) {
        $('#tourGuidePhone').attr('style', 'border: 1px solid red');
        $('#tourGuidePhone').attr('placeholder', 'Enter your phone!');
        return
    } else {
        $('#tourGuidePhone').attr('style', 'border: none');
    }

    var userBrief = $('#tourGuideBrief').val();
    if (userBrief.length == 0) {
        $('#tourGuideBrief').attr('style', 'border: 1px solid red');
        $('#tourGuideBrief').attr('placeholder', 'Enter your Brief !');
        return
    } else {
        $('#tourGuideBrief').attr('style', 'border: none');
    }

    var CurrentUser = getCurrentUser(CurrentUserID);

    CurrentUser.UserName = userName;
    CurrentUser.Password = userPassword;
    CurrentUser.Phone = userPhone;
    CurrentUser.Brief = userBrief;

    updateUserData(CurrentUser);

    alert("Update Successfully");
})

function getCurrentUser(ID) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == ID) {
            return Users[index];
        }
    }
}

function updateUserData(userData) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == userData.ID) {
            Users[index] = userData;
            localStorage.setItem("Users", JSON.stringify(Users));
        }
    }
}








