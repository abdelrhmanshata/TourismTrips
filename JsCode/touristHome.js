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
var city = "All";
getTourGuideTrips(city);
getTourGuide();
$('.city').on('click', function () {
    city = $(this).val();
    console.log(city)
    $(".city").attr('style', 'background-color:none;')
    $(this).attr('style', 'background-color:#092635;color:white;')
    getTourGuideTrips(city);
});

function getTourGuideTrips(city) {
    var allTrips = JSON.parse(localStorage.getItem("Trips"));
    if (allTrips != null) {
        $('.tripsContanier').html("");
        for (let index = 0; index < allTrips.length; index++) {
            const trip = allTrips[index];
            if (city == "All") {
                var element = `
                <div class="contentTrips">
                <img id="tripImage" src=${trip.Image} alt="tripsImage">
                <div class="tripTitleContanier">
                    <span id="tripCity">${trip.City}</span>
                    <p id="tripPrice">${trip.Price} SAR</p>
                </div>
                 <h3 id="tripTitle">${trip.Title}</h3>
                 <p id="tripDescription">${trip.Description}</p>
                 <button onclick="bookTrip(${trip.ID})">Book</button>
            </div>`;
                $('.tripsContanier').append(element);
            } else {
                if (trip.City == city) {
                    var element = `
                    <div class="contentTrips">
                    <img id="tripImage" src=${trip.Image} alt="tripsImage">
                    <div class="tripTitleContanier">
                        <span id="tripCity">${trip.City}</span>
                        <p id="tripPrice">${trip.Price} SAR</p>
                    </div>
                     <h3 id="tripTitle">${trip.Title}</h3>
                     <p id="tripDescription">${trip.Description}</p>
                     <button onclick="bookTrip(${trip.ID})">Book</button>
                </div>`;
                    $('.tripsContanier').append(element);
                }
            }
        }
    }
}

function bookTrip(tripID) {
    console.log(tripID);
}


function getTourGuide() {
    var Users = JSON.parse(localStorage.getItem("Users"));
    $('.tourGuidesContanier').html("");
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].Type == "TourGuide") {
            var element = `
            <div class="contentTourGuides">
                <img src="../image/Tour_Guide.png" alt="">
                <h3>${Users[index].UserName}</h3>
                <p>${Users[index].Brief}</p>
            </div>`;
            $('.tourGuidesContanier').append(element);
        }
    }
}

