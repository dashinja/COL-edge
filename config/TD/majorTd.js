var fs = require("fs");
var db = require("../../models");

fs.readFile("majorTd.csv", "utf8", function(err, data) {
  var lines = data.split("\n");

  lines.forEach(function(line, index) {
    var vals = line.split(",");
    console.log(vals);

    if (vals.length !== 3) {
      return console.log(
        `Line ${index + 1}: Unexpected line length, skipping.`
      );
    }

    db.major
      .create({
        major: vals[0].replace(/\"/g, "").trim(),
        starting_salary: parseFloat(vals[1]),
        mid_career_salary: parseFloat(vals[2])
      })
      .then(function(createdMajor) {
        console.log(".");
      });
  });
});
