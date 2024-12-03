import { expect, jest } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

import { JSDOM } from 'jsdom';
import { getURLsfromHTML } from "./crawl.js";
// ES Module support is enabled using babel, because Babel to convert your ES module code to CommonJS syntax that Jest can understand
//Jest doesn't support ES modules out of the box.



// testing using jest

describe('normalizeURL', () => {
    //testCase #1
    it('removes protocol (http/https)', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    });
    //testCase #2
    it('removes trailing slashes', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    });
    //testCase #3
    it('handles URLs with no path', () => {
        expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
        expect(normalizeURL('http://blog.boot.dev')).toBe('blog.boot.dev');
    });
    //testCase #4
    it('handles URLs with query parameters', () => {
        expect(normalizeURL('https://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
    });
    //testCase #5
    it('handles URLs with fragments', () => {
        expect(normalizeURL('https://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
    });
});


//testSuit #2
describe('getURLsfromHTML', () => {

    //testCase #1
    it('extracts absolute urls', () => {
        //Prepare HTML with absolute URLs
        const htmlBody = `<html>
        <body>
          <a href="https://blog.boot.dev/path1">Link 1</a>
          <a href="https://blog.boot.dev/path2">Link 2</a>
        </body>
      </html>`;
        const baseURL = 'https://blog.boot.dev';
        const urls = getURLsfromHTML(htmlBody, baseURL); // called the function with proper arguments

        //checking the result returned by the function
        expect(urls).toEqual([
            'https://blog.boot.dev/path1',
            'https://blog.boot.dev/path2'
        ]);
    });

    //testCase #2
    it('converts relative Urls into absolute', () => {
        const htmlBody = `<html>
        <body>
          <a href="/path1">Relative Link 1</a>
          <a href="/path2">Relative Link 2</a>
        </body>
      </html>`;
        const baseURL = 'https://blog.boot.dev';
        const urls = getURLsfromHTML(htmlBody, baseURL);

        expect(urls).toEqual([
            'https://blog.boot.dev/path1',
            'https://blog.boot.dev/path2'
        ]);
    });

    //testCase #3
    it('handles mixed absolute and relative URLs', () => {
        // HTML with different URL types
        const htmlBody = `
          <html>
            <body>
              <a href="/local-path">Relative Local</a>
              <a href="https://blog.boot.dev/internal">Internal Absolute</a>
            </body>
          </html>`;

        const baseURL = 'https://blog.boot.dev';
        const urls = getURLsfromHTML(htmlBody, baseURL);

        expect(urls).toEqual([
            'https://blog.boot.dev/local-path',
            'https://blog.boot.dev/internal'
        ]);
    });

    //testCase #4
    it('skips invalid URLs', () => {
        // HTML with various invalid URLs
        const htmlBody = `
          <html>
            <body>
              <a href="javascript:void(0)">JavaScript Link</a>
              <a href="#">Empty Link</a>
            </body>
          </html>
        `;
        const baseURL = 'https://blog.boot.dev';
        const urls = getURLsfromHTML(htmlBody, baseURL);
        expect(urls).toEqual([]);
    });

    //testCase #5
    it('returns array for no links', () => {
        const htmlBody = '<html><body></body></html>';
        const baseURL = 'https://blog.boot.dev';

        const urls = getURLsfromHTML(htmlBody, baseURL);

        expect(urls).toEqual([]);

    })

    //testCase #6
    it('handles malformed URLs', () => {
        const htmlBody = `
          <html>
            <body>
              <a href="   ">Whitespace URL</a>
            </body>
          </html>
        `;
        const baseURL = 'https://blog.boot.dev';
        const urls = getURLsfromHTML(htmlBody, baseURL);
        expect(urls).toEqual([]);
    });


});
