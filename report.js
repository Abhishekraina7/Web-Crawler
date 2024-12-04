export { reportpages };

function reportpages(pages) {

    console.log('Report is starting');

    const SortedPages = Object.entries(pages).sort((a, b) => {
        return b[1] - a[1];
    });

    SortedPages.forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`);
    });

}