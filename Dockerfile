FROM oven/bun:1-alpine AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:1-alpine

ENV FLAG=flag{test_flag}
ENV NODE_ENV=production

RUN adduser -D -h /home/ctf -s /bin/sh ctf
WORKDIR /home/ctf

COPY --from=builder /app/example.txt /home/ctf/example.txt
COPY --from=builder /app/dist/index.js /usr/local/bin/ctf-server
RUN chmod +x /usr/local/bin/ctf-server

USER ctf

CMD ["/usr/local/bin/ctf-server"]

EXPOSE 3000