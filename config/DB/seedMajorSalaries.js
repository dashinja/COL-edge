const fs = require('fs');
const db = require('../../models');

fs.readFile('major-salories.csv', 'utf8', (err, data) => {
  let createdModels = [];
  data
    .split('\n')
    .map(record => record.split(','))
    .forEach(row => {
      if (row[0] === 'Undergraduate Major') return;
      createdModels.push(
        db.majorSalaries.create({
          major: row[0],
          startingSalaray: row[1],
          midCareerSalary: row[2]
        })
      );
    });
  Promise.all(createdModels).then(() => {
    process.exit();
  });
});
