#!/usr/bin/env -S bun run
import { $ } from 'bun';
import { readAndMinifyHTML } from './utils' with { type: 'macro' };

const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const u = new URL(req.url, 'http://localhost');
        if (u.pathname === '/' && req.method === 'GET') {
            return new Response(await readAndMinifyHTML('index.html'), {
                headers: { 'Content-Type': 'text/html' }
            });
        }
        if (u.pathname === '/' && req.method === 'POST') {
            const params = new URLSearchParams(await req.text());
            const pattern = params.get('pattern');
            const file = params.get('file');
            if (pattern === null || file === null) {
                return new Response('Bad request', { status: 400 });
            }
            if (!file) {
                return new Response('Please provide a file path', { status: 400 });
            }
            let r = await $`sed ${`s/{.*}/${pattern}/g`} ${file}`.nothrow().quiet();
            return Response.json({
                exit: r.exitCode,
                stdout: r.stdout.toJSON().data,
                stderr: r.stderr.toJSON().data,
            });
        }
        return new Response('Not found', { status: 404 });
    }
});

console.log(`Server running at http://localhost:${server.port}`);