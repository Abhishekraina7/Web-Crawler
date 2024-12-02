export { normalizedURL }; // export makes the normalizedURL function available to be used in the other js files

let currentUrl = '';

function normalizedURL(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname.replace(/\/$/, ''); // removes the trailing spaces
    const hostname = urlObject.hostname;
    currentUrl = `${hostname}${pathname}`;
    console.log(currentUrl);
}
