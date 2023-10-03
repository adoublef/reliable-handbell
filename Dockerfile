ARG DENO_VERSION=1.37.0

FROM denoland/deno:${DENO_VERSION} AS deploy
WORKDIR /opt

USER deno

COPY deno.* deps.ts ./
RUN deno cache deps.ts

ADD . .

RUN deno cache cmd/deno-hono/main.ts

CMD ["task", "start"]

EXPOSE 8000
