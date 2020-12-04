// This is getting user input from the exercise.html page
let exerciseArray = [];
$(document).ready(function() {
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
});