<p align="center">
  <img src="src/assets/Images/Oli-Nat-Logo-Banner.png" alt="Oli-Nat Programming Language" width="auto" />
</p>

<p align="center">
  <strong>The documentation site and in-browser playground for the Oli-Nat programming language.</strong>
</p>

<p align="center">
  <a href="https://olinat.net"><strong>olinat.net</strong></a> ·
  <a href="https://olinat.net/playground">Playground</a> ·
  <a href="https://github.com/NateTheGrappler/OliNat-Programming-Language">Language source</a>
</p>

---

## About

[Oli-Nat](https://github.com/NateTheGrappler/OliNat-Programming-Language) is a small, statically typed programming language with a hand-written bytecode virtual machine, built from scratch in C. This repository is its home on the web: the documentation site and a playground where anyone can write and run Oli-Nat code without installing anything.

The playground doesn't use a simplified version of the language or send code to a server. It runs the **real C interpreter, compiled to WebAssembly**, entirely in your browser.

The documentation goes beyond syntax. Alongside guides for using the language, it explains how each stage of the interpreter is implemented, from the scanner and Pratt parser to the type checker, virtual machine, and garbage collector.

## Features

- **In-browser playground.** A code editor, a set of sample programs, and a retro pixel art terminal that shows program output. It runs the actual interpreter through WebAssembly.
- **Interactive programs.** Programs that read input with `intake()` pause and wait for you to type in the terminal, so games like the tic tac toe sample are fully playable.
- **Implementation-focused docs.** Pages cover the language from basic syntax through the standard library, plus how each part of the interpreter works under the hood.
- **Config-driven docs.** Every page is an MDX file, and the sidebar, routing, and page loading all come from a single config file.
- **Responsive layout.** On smaller screens the playground switches to a stacked layout, with the terminal above the editor.

## Tech Stack

| Area | Tools |
| ---- | ----- |
| Framework | [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org), [Vite](https://vite.dev) |
| Routing | [React Router](https://reactrouter.com) |
| Docs content | [MDX](https://mdxjs.com), [remark-gfm](https://github.com/remarkjs/remark-gfm) for tables |
| Code highlighting | [Shiki](https://shiki.style) via [rehype-pretty-code](https://rehype-pretty.pages.dev) |
| Editor | [CodeMirror](https://codemirror.net) via `@uiw/react-codemirror` |
| Interpreter | Oli-Nat's C source compiled with [Emscripten](https://emscripten.org) |
| Linting | [oxlint](https://oxc.rs) |

## How the Playground Works

The Oli-Nat interpreter is plain C11 with no dependencies, so most of it compiles to WebAssembly unchanged. The playground loads the compiled module (`src/WASM/Oli_Nat.mjs` and `Oli_Nat.wasm`) and calls a single exported function, `runFromSource`, with the contents of the editor.

The interesting part is **input**. In a terminal, `intake()` reads a line with `fgets` and blocks until the user presses Enter. A web page can't block like that without freezing the tab. The browser build replaces the read with an async JavaScript function and is compiled with Emscripten's [Asyncify](https://emscripten.org/docs/porting/asyncify.html), which lets the virtual machine:

1. pause in the middle of running a program,
2. hand control back to React while the user types into the terminal,
3. resume exactly where it left off once they press Enter.

From the C code's point of view, `intake()` is still an ordinary blocking call.

Output from the interpreter arrives through Emscripten's print hooks. It's buffered on the React side and flushed on each newline, and also right before an input prompt, so that `print()` without a newline still shows up correctly.

## Getting Started

You'll need [Node.js](https://nodejs.org) (a current LTS release) and npm.

```bash
git clone https://github.com/NateTheGrappler/Oli-Nat-Programming-Language-Docs-Playground.git
cd Oli-Nat-Programming-Language-Docs-Playground
npm install
npm run dev
```

The site will be running at `http://localhost:5173`.

| Command |  |
| ------- | ------------ |
| `npm run dev` | Start the development server with hot reloading |
| `npm run build` | Type check and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint the project with oxlint |

## Project Showcase

https://github.com/user-attachments/assets/7efd7589-cc98-48d9-8e0e-75ab0c108bd1


## Common Tasks

### Adding a documentation page

1. Create an `.mdx` file in `src/docs/<section-id>/`, for example `src/docs/guides/classes.mdx`.
2. Add an entry for it to that section's `pages` array in `src/config/sections.ts`:

   ```ts
   { slug: 'classes', title: 'Classes' },
   ```

The `slug` must exactly match the file name, including capitalization. The page is then available at the section's route plus the slug (for example `/docs/guides/classes`), and it appears in the sidebar automatically.

### Adding a sample program

Drop an `.oli` file into `src/testCases/`. It's picked up automatically and shown in the playground's sample list, using the file name as its label.

### Updating the interpreter

The files in `src/WASM/` are build output from the [language repository](https://github.com/NateTheGrappler/OliNat-Programming-Language). After changing the C interpreter, rebuild it with Emscripten and copy both `Oli_Nat.mjs` and `Oli_Nat.wasm` into `src/WASM/`, always together. See the [contributing guide](https://olinat.net/docs/contributing/getting-started) for the full build steps.

`Oli_Nat.d.mts` is a hand-written TypeScript description of the module, and only needs updating if the exported `runFromSource` function changes.

## Deployment

`npm run build` produces a fully static site in `dist/` that can be hosted anywhere. Because routing happens on the client, the host must serve `index.html` for any path that doesn't match a file, so that links like `/docs/guides/types` work when opened directly.

## Contributing

Contributions are welcome, whether that's fixing a typo, improving an explanation, adding a sample program, or working on the playground itself. Start with the [contributing guide](https://olinat.net/docs/contributing/getting-started) on the site, and feel free to open an issue to ask a question or suggest an idea before writing any code.

Changes to the language itself belong in the [interpreter repository](https://github.com/NateTheGrappler/OliNat-Programming-Language).

## Acknowledgments

Oli-Nat's virtual machine design is inspired by Robert Nystrom's [*Crafting Interpreters*](https://craftinginterpreters.com). Thank you to everyone who has contributed test cases, bug fixes, and standard library additions to the language.
