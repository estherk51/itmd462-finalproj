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

// Supposed to display on the html page, but at least it prints out on the console...
function displayWeightRecord () {
    const weight_url = 'http://localhost:3000/weight_track/';
    $.get(weight_url, result => {
        $.each(result.weights, (i, item) => {
            var eachrow = "<p>" + item.weight.initial + "</p>"
                        + "<p>" + item.weight.goal + "</p>"
                        + "<p>" + item.weight.current + "</p>";
            $('#showProgess').append(eachrow);
            console.log(result);
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
    $.post();
}
