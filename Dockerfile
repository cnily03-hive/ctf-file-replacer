FROM oven/bun:1-slim AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

FROM alpine:3

ENV FLAG=flag{test_flag}
ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/dist/server /app/server

CMD ["./server"]

EXPOSE 3000