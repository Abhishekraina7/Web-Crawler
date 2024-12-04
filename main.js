// import { normalizeURL } from "./crawl.js";
// import { getURLsfromHTML } from "./crawl.js";
// import { argv } from 'node:process';
import { crawlPage } from "./crawl.js";
import { reportpages } from "./report.js";



// getURLsfromHTML("<a href=\"blog\">Learn Backend Development</a>", 'https://boot.dev');

async function main() {
    //process.argv contains the cmd line arguments
    //First two arguments are always:
    // - path to Nodejs executable
    // - path to the script being run

    const args = process.argv.slice(2);
    //check number of arguments

    if (args.length < 1) {
        console.error('Error: Please provide a link');
        process.exit(1);
    }

    if (args.length > 1) {
        console.error('Error: Too many arguments, Only one base URL is allowed');
        process.exit(1);
    }

    // base url = https://wagslane.dev
    const baseURl = args[0];

    try {
        new URL(baseURl);
        console.log(`Starting crawler at: ${baseURl}`);
        const pages = await crawlPage(baseURl);
        reportpages(pages);



    } catch (error) {
        console.log('Error: Invalid URL format');
        process.exit(1);
    }
}
main()

// Console.log(`Starting Crawling at: ${baseURl}`);
// crawlPage(baseURl);