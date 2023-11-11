import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

const BaseHtml = ({ children }: elements.Children) => (
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>This is BETH Stack</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@1.9.8" integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr" crossorigin="anonymous"></script>
    </head>

    ${children}
  </html>`);

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <BaseHtml>
      <body class="flex w-full h-screen justify-center items-center">
        <button hx-post="/clicked" hx-swap="outerHTML">Click Me</button>
      </body>
    </BaseHtml>)
  )
  .post('/clicked', () => <div class="text-blue-600">Blood in my eyes dog and I can't see</div>)
  .listen(3000);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
