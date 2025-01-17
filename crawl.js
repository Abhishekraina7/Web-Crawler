export { normalizeURL }; // export makes the normalizedURL function available to be used in the other js files
export { getURLsfromHTML };
export { crawlPage };
import { JSDOM } from 'jsdom';
let currentUrl = '';

function normalizeURL(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname.replace(/\/$/, ''); // removes the trailing spaces
    const hostname = urlObject.hostname;
    currentUrl = `${hostname}${pathname}`;
    return currentUrl;
}



function getURLsfromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchorTags = dom.window.document.querySelectorAll('a');
    const urls = []; // arrays which contains final urls

    for (const anchor of anchorTags) { // extract all the href attributes
        const href = anchor.getAttribute('href');

        if (!href) continue; // if href is empty skip and move on to next href attribute
        if (
            href.trim() === '#' ||
            href.toLowerCase().startsWith('javascript:') ||
            href.trim() === ''

        ) {
            continue;
        }

        try {
            const urlObj = new URL(href, baseURL); // creates a new url using href extracted from htmlBody and baseURL inserted as argument

            if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') { // we only insert link into url array if they contain protocols
                urls.push(urlObj.toString());
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return urls;

}

//Step: 1 figure out whether the current Url is on the same domain as the base url

function isURlOnSameDomain(baseURl, currentUrl) {

    try {
        const baseUrlObj = new URL(baseURl);
        const currentUrlObj = new URL(currentUrl);
        if (baseUrlObj.hostname === currentUrlObj.hostname) {
            return true;
        }
    } catch (error) {
        console.error(`Error checking domain: ${error}`);
        return false;
    }
}


//Step2: currentURl ka HTML content samate lo jaldi se

async function fetchHTML(currentURL) {

    console.log(`Crawling: ${currentURL}`);

    try {

        const response = await fetch(currentURL);

        if (response.status >= 400) {
            console.error(`Error: HTTP status code ${response.status}`);
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.error("Error hai bhai eder - HTML toh ayi he ni re");
            return null;
        }

        return await response.text(); // agr sabkucch khushal mangal raha toh apun ko html return mai mil jayegei

    } catch (error) {
        console.error(`Error Crawling: ${currentURL} bhai teri url k sath system hang hogya re yrr`);
        return null;
    }

}



// Main function hai J bhai - iske pass boht power hoti

async function crawlPage(baseURL, currentUrl = baseURL, pages = {}) {

    //1. check  if URL is on the same Domain
    if (!isURlOnSameDomain(baseURL, currentUrl)) {
        return pages;
    }

    //2. Normalize the current URL

    const normalizedURL = normalizeURL(currentUrl);

    //3. Check if URL has already been crawled
    if (pages[normalizedURL]) {
        pages[normalizedURL]++;
        return pages;
    }

    //4. Add new URL to pages object 
    pages[normalizedURL] = 1;

    //5. Fetch HTML content
    const html = await fetchHTML(currentUrl);
    if (!html) {
        return pages;
    }

    //6. Get all urls from the HTML

    const urls = getURLsfromHTML(html, baseURL);

    //7. Recursively crawl each URL
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    //8. Return updated pages object
    return pages;


}



