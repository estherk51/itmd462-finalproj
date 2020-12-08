let exerciseArray = [];
let weightTrackArray = [];
$(document).ready(function() {
    // This is getting user input from the exercise.html page
    $("#exerciseBtn").click(function () {
        let info = {
            name: ($("#exerciseName").val()),
            duration: ($("#exerciseDuration").val()),
            reps: ($("#exerciseReps").val()),
            date: ($("#exerciseDate").val())
        };
        exerciseArray.push(info);
        console.log(exerciseArray);
        alert("Exercise saved!");
    });

    //This gets the weight info from the user on weight_tracking.html
    $("#weightBtn").click(function () {
        let weightInfo = {
            initial: ($("#initialWeight").val()),
            goal: ($("#goalWeight").val()),
            current:($("#currentWeight").val())
        };
        weightTrackArray.push(weightInfo);
        console.log(weightTrackArray);
    });
});

// gets all the records ...trying to figure out a way to just get specified record...
const weight_url = 'http://localhost:3000/weight_track/';
function displayWeightRecord () {
    $.get(weight_url, result => {
        $('#tbody tr').remove();
            $.each(result.weights, (i, item) => {
                var eachrow = "<tr>"
                            + "<td>" + item.weight.initial + "</td>"
                            + "<td>" + item.weight.goal + "</td>"
                            + "<td>" + item.weight.current + "</td>"
                            + "</tr>";
                $('#tbody').append(eachrow);
            });
    });
}

// This function is supposed to take the values from weight_track.html
// and post to mongodb....but its not working...cuz I don't know how to do it...yet
function postWeight() {
    document.getElementById("trackForm").addEventListener("click", function(event) {
        event.preventDefault()
    });
    var newWeight = new Weight_track(
        document.getElementById('initialWeight').value,
        document.getElementById('goalWeight').value,
        document.getElementById('currentWeight').value
    );
    console.log(newWeight);
    // $.post(weight_url, newWeight, result =>{

    // });
}

// I have no idea how to post with jQuery/ajax...
function newUser() {
    document.getElementById("signup").addEventListener("click", function(event) {
        event.preventDefault()
    });

    var newUser = new User(
        document.getElementById('newName').value,
        document.getElementById('newUsername').value,
        document.getElementById('newPassword').value
    );

    // this should let the user post, but it is not working...
    // the alert does not even appear
    $.post('http://localhost:3000/users', newUser, result => {
        console.log(result);
    });
}
