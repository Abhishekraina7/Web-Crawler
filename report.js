export { reportpages };

function reportpages(pages) {

    console.log('Report is starting');

    const SortedPages = Object.entries(pages).sort((a, b) => {
        return b[1].inboundInternalLinks - a[1].inboundInternalLinks;
    });

    SortedPages.forEach(([url, data]) => {
        const count = data.inboundInternalLinks;
        console.log(`Found ${count} internal links to ${url}`);
    });

}