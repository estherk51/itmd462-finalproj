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

// function displayUserWeightRecord () {
//     document.getElementById()
// }

function postWeight() {
    document.getElementById("").addEventListener("click", function(event) {
        event.preventDefault()
    });
}