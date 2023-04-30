const fs = require('fs');

async function writeScrapedDataToFile(data, filename) {
  const fields = 'Website,Similarweb_Monthly_Traffic,Avg_Visit_Duration\n';
  await fs.writeFileSync(filename, fields, 'utf-8');

  const csv = data.map((row) => Object.values(row).join(',')).join('\n');
  await fs.appendFileSync(filename, csv + '\n', 'utf-8');
}

module.exports = writeScrapedDataToFile;
