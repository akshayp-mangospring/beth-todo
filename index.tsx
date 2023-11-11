import { Elysia, t } from "elysia";
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

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

const db: Todo[] = [
  { id: 1, content: 'Learn React', completed: true },
  { id: 2, content: 'Learn BETH stack', completed: false }
];

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <BaseHtml>
      <body
        class="flex w-full h-screen justify-center items-center"
        hx-get="/todos"
        hx-trigger="load"
        hx-swap="innerHTML"
      />
    </BaseHtml>)
  )
  .post('/clicked', () => <div class="text-blue-600">Blood in my eyes dog and I can't see</div>)
  .get('/todos', () => <TodoList todos={db} />)
  .post('/todos/toggle/:id', ({ params }) => {
    const todo = db.find((todo) => params.id === todo.id);

    if (todo) {
      todo.completed = !todo.completed;
      return <TodoItem {...todo} />
    }
  },
  {
    params: t.Object({
      id: t.Numeric(),
    })
  })
  .delete('/todos/:id', ({params}) => {
    const todo = db.find((todo) => params.id === todo.id);

    if (todo) {
      db.splice(db.indexOf(todo), 1)
    }
  },{
    params: t.Object({
      id: t.Numeric(),
    })
  })
  .listen(3000);

function TodoItem({ id, content, completed }: Todo) {
  return (
    <li data-id={id} class="flex flex-row space-x-3">
      <input hx-post={`/todos/toggle/${id}`} hx-target="closest li" hx-swap="outerHTML" type="checkbox" checked={completed} />
      <span>{content}</span>
      <button hx-delete={`/todos/${id}`} hx-swap="outerHTML" hx-target="closest li" class="text-red-500">X</button>
    </li>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </ul>
  );
}

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
