import { minify } from 'html-minifier';

export function readFile(f: string) {
    return Bun.file(f).text();
}

export function readAndMinifyHTML(f: string) {
    return readFile(f).then((data) => {
        return minify(data, {
            removeAttributeQuotes: true,
            minifyCSS: true,
            minifyJS: true,
            collapseWhitespace: true,
            removeComments: true
        })
    });
}
