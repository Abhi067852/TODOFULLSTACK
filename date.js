module.exports = getdate;
function getdate() {
    var day = new Date();
    var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    var today = day.toLocaleDateString("en-US", option);
    return today;
}
