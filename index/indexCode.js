// clearStorage();

// get Current User is Found
var CurrentUserID = JSON.parse(localStorage.getItem("CurrentUser"));
if (CurrentUserID.length != 0) {
    var CurrentUser = getCurrentUser(CurrentUserID);
    if (CurrentUser.Type == "Tourist") {
        window.open('../Pages/touristHome.html', '_self');
    } else {
        window.open('../Pages/tourGuideHome.html', '_self');
    }
}

// get All user from local storage database
var allUsers = JSON.parse(localStorage.getItem("Users"));
if (allUsers == null) {
    allUsers = [];
}

// Default Selected User Type Tourist
var userType = "Tourist";
$('#userTourist').attr('style', 'background-color: #5C8374');

// User Type
$('#userTourist').on('click', function () {
    userType = "Tourist";
    $(this).attr('style', 'background-color: #5C8374');
    $('#userTourGuide').attr('style', 'background-color: var(--buttonBackground)');
    $('#logo').attr('src', '../image/tourist.png');
});

$('#userTourGuide').on('click', function () {
    userType = "TourGuide";
    $(this).attr('style', 'background-color: #5C8374');
    $('#userTourist').attr('style', 'background-color: var(--buttonBackground)');
    $('#logo').attr('src', '../image/tourguide.png');
});

// Auth Button
$('#signINContanier').on('click', function () {
    $('.signInContent').toggleClass('hidden');
});
$('#closeSignIn').on('click', function () {
    $('.signInContent').toggleClass('hidden');
});


$('#signUPContanier').on('click', function () {
    $('.signUpContent').toggleClass('hidden');
});
$('#closeSignUp').on('click', function () {
    $('.signUpContent').toggleClass('hidden');
});

// SignIn User Account From Locale Storage
$('#signIN').on('click', function () {
    var userEmail = $('#userEmailsignIn').val();
    if (userEmail.length == 0) {
        $('#userEmailsignIn').attr('style', 'border: 1px solid red');
        $('#userEmailsignIn').attr('placeholder', 'Enter your email!');
        return
    } else {
        $('#userEmailsignIn').attr('style', 'border: none');
    }

    var userPassword = $('#userPassswordsignIn').val();
    if (userPassword.length == 0) {
        $('#userPassswordsignIn').attr('style', 'border: 1px solid red');
        $('#userPassswordsignIn').attr('placeholder', 'Enter your password!');
        return
    } else {
        $('#userPassswordsignIn').attr('style', 'border: none');
    }
    var User = signInAccount(userEmail, userPassword, userType)
    if (User != null) {
        alert(`Welcome back ${User.UserName}`);
        $('#userEmailsignIn').val("");
        $('#userPassswordsignIn').val("");
        $('.signInContent').toggleClass('hidden');
        localStorage.setItem("CurrentUser", JSON.stringify(User.ID));
        if (User.Type == "Tourist") {
            window.open('../Pages/touristHome.html', '_self');
        } else {
            window.open('../Pages/tourGuideHome.html', '_self');
        }
    } else {
        alert(`This User Not Found !!`);
    }
});

// Sign Up User Account IN Locale Storage
$('#signUP').on('click', function () {
    var userName = $('#userNamesignUp').val();
    if (userName.length == 0) {
        $('#userNamesignUp').attr('style', 'border: 1px solid red');
        $('#userNamesignUp').attr('placeholder', 'Enter your name!');
        return
    } else {
        $('#userNamesignUp').attr('style', 'border: none');
    }

    var userEmail = $('#userEmailsignUp').val();
    if (userEmail.length == 0) {
        $('#userEmailsignUp').attr('style', 'border: 1px solid red');
        $('#userEmailsignUp').attr('placeholder', 'Enter your email!');
        return
    } else {
        $('#userEmailsignUp').attr('style', 'border: none');
    }

    var userPassword = $('#userPasswordsignUp').val();
    if (userPassword.length == 0) {
        $('#userPasswordsignUp').attr('style', 'border: 1px solid red');
        $('#userPasswordsignUp').attr('placeholder', 'Enter your password!');
        return
    } else {
        $('#userPasswordsignUp').attr('style', 'border: none');
    }

    var userPhone = $('#userPhonesignUp').val();
    if (userName.length == 0) {
        $('#userPhonesignUp').attr('style', 'border: 1px solid red');
        $('#userPhonesignUp').attr('placeholder', 'Enter your phone!');
        return
    } else {
        $('#userPhonesignUp').attr('style', 'border: none');
    }

    var userID = new Date().getTime().toString();
    var user = {
        ID: userID,
        UserName: userName,
        Email: userEmail,
        Password: userPassword,
        Phone: userPhone,
        Type: userType,
        Brief: ""
    }

    signUpAccount(user);

    alert("Successfully SignUp ");
    $('#userNamesignUp').val("");
    $('#userEmailsignUp').val("");
    $('#userPasswordsignUp').val("");
    $('#userPhonesignUp').val("");
    $('.signUpContent').toggleClass('hidden');
});


function signUpAccount(user) {
    allUsers.push(user)
    localStorage.setItem("Users", JSON.stringify(allUsers));
}

function signInAccount(email, password, userType) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    if (Users != null) {
        for (let index = 0; index < Users.length; index++) {
            if (Users[index].Email == email && Users[index].Password == password && Users[index].Type == userType) {
                return Users[index];
            }
        }
        return null;
    }
    else {
        alert("No Users Found");
    }
}

function updateUserData(userData) {
    var Users = JSON.parse(localStorage.getItem("Users"));

    if (Users == null) {
        Users = [];
    }

    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == userData.ID) {
            Users[index] = userData;
            localStorage.setItem("Users", JSON.stringify(Users));
        }
    }
}

function getCurrentUser(ID) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == ID) {
            return Users[index];
        }
    }
}

function clearStorage() {
    localStorage.clear();
}

// clearStorage();

