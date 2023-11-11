import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(baseHtmlStr))
  .listen(3000);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

const baseHtmlStr = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>This is BETH Stack</title>
  </head>

  <body>
    <h1>This is a basic app with the BETH Stack.</h1>
  </body>
</html>`;
