// // // // // // // // // // // // // // // // // // // // // // // // // 
function clearStorage() {
    localStorage.clear();
}
// clearStorage();

// // // // // // // // // // // // // // // // // // // // // // // // // 
// Logout User
$('#logout').on('click', function () {
    localStorage.setItem("CurrentUser", JSON.stringify(null));
    window.open('../index/index.html', '_self');
});

// // // // // // // // // // // // // // // // // // // // // // // // // 
// get Current User is Found
var CurrentUserID = JSON.parse(localStorage.getItem("CurrentUser"));
if (CurrentUserID != null) {
    var CurrentUser = getCurrentUser(CurrentUserID);
    $('#tourGuideName').val(CurrentUser.UserName);
    $('#tourGuidePassword').val(CurrentUser.Password);
    $('#tourGuidePhone').val(CurrentUser.Phone);
    $('#tourGuideBrief').val(CurrentUser.Brief);
}
function getCurrentUser(ID) {
    var Users = JSON.parse(localStorage.getItem("Users"));
    for (let index = 0; index < Users.length; index++) {
        if (Users[index].ID == ID) {
            return Users[index];
        }
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // 
// Update Tour Guide Info
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
})

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

// // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // 
// get All Trips from local storage database
var allTrips = [];
if (localStorage.getItem("Trips") != undefined) {
    allTrips = JSON.parse(localStorage.getItem("Trips"));
    if (allTrips == null) {
        allTrips = [];
    } else {
        getTourGuideTrips();
    }
}

function getTourGuideTrips() {
    var allTrips = JSON.parse(localStorage.getItem("Trips"));
    if (allTrips != null) {
        $('.tripsContanier').html("");
        for (let index = 0; index < allTrips.length; index++) {
            const trip = allTrips[index];
            if (trip.TourGuideID == CurrentUserID) {
                var element = `
                <div class="contentTrips">
                    <div class="buttons">
                        <img id="editTrip" src="../image/edit.png" alt="" onclick="editTrip(${index})">
                        <img id="deleteTrip" src="../image/delete.png" alt="" onclick="deleteTrip(${trip.ID})">
                    </div>
                    <img id="tripImage" src=${trip.Image} alt="tripsImage">
                    <div class="tripTitleContanier">
                        <span id="tripCity">${trip.City}</span>
                        <p id="tripPrice">${trip.Price} SAR</p>
                    </div>
                    <h3 id="tripTitle">${trip.Title}</h3>
                    <p id="tripDescription">${trip.Description}</p>
                </div>`;

                $('.tripsContanier').append(element);
            }
        }
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // 
// Add New Trip in local storage
$('#addTrip').on('click', function () {
    $('.addTripContainer').toggleClass('hidden');
});

$('#closeAddTrip').on('click', function () {
    $('.addTripContainer').toggleClass('hidden');
});

$('#saveTrip').on('click', function () {

    var addTripCity = $('#addTripCity').val();

    var addTripImage = $('#addTripImage').val();
    if (addTripImage.length == 0) {
        $('#addTripImage').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#addTripImage').attr('style', 'border: none');
    }

    var addTripPrice = $('#addTripPrice').val();
    if (addTripPrice.length == 0) {
        $('#addTripPrice').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#addTripPrice').attr('style', 'border: none');
    }

    var addTripTitle = $('#addTripTitle').val();
    if (addTripTitle.length == 0) {
        $('#addTripTitle').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#addTripTitle').attr('style', 'border: none');
    }

    var addDescription = $('#addDescription').val();
    if (addDescription.length == 0) {
        $('#addDescription').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#addDescription').attr('style', 'border: none');
    }

    var tripID = new Date().getTime().toString();
    var trip = {
        ID: tripID,
        City: addTripCity,
        Image: addTripImage,
        Price: addTripPrice,
        Title: addTripTitle,
        Description: addDescription,
        TourGuideID: CurrentUserID
    }

    saveTrip(trip);

    $('#addTripImage').val("");
    $('#addTripPrice').val("");
    $('#addTripTitle').val("");
    $('#addDescription').val("");
    $('.addTripContainer').toggleClass('hidden');
    getTourGuideTrips();
});

function saveTrip(trip) {
    allTrips.push(trip)
    localStorage.setItem("Trips", JSON.stringify(allTrips));
    alert("Saved Successfully");
}

// // // // // // // // // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // // // // // // // // 
// Edit Trip 
var currentTripObj = null;
function editTrip(index) {
    currentTripObj = allTrips[index]
    $('.updateTripContainer').toggleClass('hidden');
    $('#updateTripCity').val(currentTripObj.City);
    $('#updateTripImage').val(currentTripObj.Image);
    $('#updateTripPrice').val(currentTripObj.Price);
    $('#updateTripTitle').val(currentTripObj.Title);
    $('#updateDescription').val(currentTripObj.Description);
}

$('#closeUpdate').on('click', function () {
    $('.updateTripContainer').toggleClass('hidden');
});

$('#updateTrip').on('click', function () {

    var updateTripCity = $('#updateTripCity').val();

    var updateTripImage = $('#updateTripImage').val();
    if (updateTripImage.length == 0) {
        $('#updateTripImage').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#updateTripImage').attr('style', 'border: none');
    }

    var updateTripPrice = $('#updateTripPrice').val();
    if (updateTripPrice.length == 0) {
        $('#updateTripPrice').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#updateTripPrice').attr('style', 'border: none');
    }

    var updateTripTitle = $('#updateTripTitle').val();
    if (updateTripTitle.length == 0) {
        $('#updateTripTitle').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#updateTripTitle').attr('style', 'border: none');
    }

    var updateDescription = $('#updateDescription').val();
    if (updateDescription.length == 0) {
        $('#updateDescription').attr('style', 'border: 1px solid red');
        return
    } else {
        $('#updateDescription').attr('style', 'border: none');
    }
    var trip = {
        ID: currentTripObj.ID,
        City: updateTripCity,
        Image: updateTripImage,
        Price: updateTripPrice,
        Title: updateTripTitle,
        Description: updateDescription,
        TourGuideID: currentTripObj.TourGuideID
    }

    updateTrip(trip);

    $('#updateTripImage').val("");
    $('#updateTripPrice').val("");
    $('#updateTripTitle').val("");
    $('#updateDescription').val("");
    $('.updateTripContainer').toggleClass('hidden');
    getTourGuideTrips();
    // alert("Update Successfully");
});

function updateTrip(trip) {
    var Trips = JSON.parse(localStorage.getItem("Trips"));
    for (let index = 0; index < Trips.length; index++) {
        if (Trips[index].ID == trip.ID) {
            Trips[index] = trip;
            localStorage.setItem("Trips", JSON.stringify(Trips));
        }
    }
    window.location.reload();
}
// // // // // // // // // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // // // // // // // // 
// Delete Trip 
function deleteTrip(TripID) {
    var Trips = JSON.parse(localStorage.getItem("Trips"));
    for (let index = 0; index < Trips.length; index++) {
        if (Trips[index].ID == TripID) {
            Trips.splice(index, 1);
            localStorage.setItem("Trips", JSON.stringify(Trips));
        }
    }
    window.location.reload();
    alert("Deleted Successfully");
}
// // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // //
//  











