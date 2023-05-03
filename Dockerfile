FROM oven/bun

COPY . .
RUN bun install

ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["bun", "index.ts"];