import { minify } from 'html-minifier';
import path from 'path';

export function readFile(p: string) {
    return Bun.readableStreamToText(Bun.file(path.resolve(import.meta.dir, p)).stream())
}

export function readAndMinifyHTML(p: string) {
    p = path.resolve(import.meta.dir, p)
    process.argv.length === 1 ? console.log(`Minifying ${p}`) : null;
    return readFile(p).then((data) => {
        return minify(data, {
            removeAttributeQuotes: true,
            minifyCSS: true,
            minifyJS: true,
            collapseWhitespace: true,
            removeComments: true
        })
    });
}