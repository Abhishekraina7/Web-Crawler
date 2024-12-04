export { reportpages };
import fs from 'fs';
import path from 'path';

function reportpages(pages) {

    console.log('Report is starting');

    const SortedPages = Object.entries(pages).sort((a, b) => {
        return b[1] - a[1];
    });


    let csvContent = 'URL, Count\n'; // this is name of the header Row in spreadsheet
    SortedPages.forEach(([url, count]) => {
        csvContent += `${url}, ${count}\n`;
    });

    // path to a spreadsheet
    const outputPath = path.join(process.cwd(), 'report.csv');

    // Write the CSV content to a file
    fs.writeFile(outputPath, csvContent, (err) => {
        if (err) {
            console.log(`Error writing the report to cst `, err);
        }
        else {
            console.log(`Report saved at: ${outputPath}`);
        }
    });

}