var fs = require("fs");
var db = require("../../models");

fs.readFile("costTd.csv", "utf8", function(err, data) {
  var lines = data.split("\n");

  lines.forEach(function(line, index) {
    var vals = line.split(",");
    console.log(vals);

    if (vals.length !== 11) {
      return console.log(
        `Line ${index + 1}: Unexpected line length, skipping.`
      );
    }

    db.cost
      .create({
        city: vals[0].replace(/\"/g, "").trim(),
        state: vals[1].replace(/\"/g, "").trim(),
        country: vals[2].replace(/\"/g, "").trim(),
        cli_plus_rent: parseFloat(vals[3]),
        cli: parseFloat(vals[4])
      })
      .then(function(createdCost) {
        console.log(".");
      });
  });
});
