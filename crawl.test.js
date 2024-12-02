import pkg from '@jest/globals';
const { expect, jest } = pkg;
// import { expect, jest } from "@jest/globals";
import { normalizedURL } from "./crawl.js";

// ES Module support is enabled using babel, because Babel to convert your ES module code to CommonJS syntax that Jest can understand
//Jest doesn't support ES modules out of the box.

// normalizeURL.test.js



describe('normalizeURL', () => {
    it('removes protocol (http/https)', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    });
    it('removes trailing slashes', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    });

    it('handles URLs with no path', () => {
        expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
        expect(normalizeURL('http://blog.boot.dev')).toBe('blog.boot.dev');
    });

    it('handles URLs with query parameters', () => {
        expect(normalizeURL('https://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
    });

    it('handles URLs with fragments', () => {
        expect(normalizeURL('https://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
    });

    it('normalizes multiple examples of the same URL', () => {
        const urls = [
            'https://blog.boot.dev/path/',
            'https://blog.boot.dev/path',
            'http://blog.boot.dev/path/',
            'http://blog.boot.dev/path',
        ];
        const expected = 'blog.boot.dev/path';
        urls.forEach((url) => {
            expect(normalizeURL(url)).toBe(expected);
        });
    });
});