FROM oven/bun:1-alpine AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:1-alpine

ENV FLAG=flag{test_flag}
ENV NODE_ENV=production

RUN rm -rf /usr/local/bin/bun

WORKDIR /app
COPY --from=builder /app/dist/server /app/server

CMD ["./server"]

EXPOSE 3000