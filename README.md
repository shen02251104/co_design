# nuxt-vue

Nuxt.js full-stack application with server-side API capabilities, Vue 3, and Vite.

## Features

- 🚀 **Nuxt 4**: Latest Nuxt.js framework
- ⚡️ **Vite**: Lightning-fast development and build
- 🎨 **Vue 3**: Composition API and modern Vue features
- 🔥 **Server API**: Built-in server routes for backend logic
- 📁 **File-based Routing**: Automatic routing from file structure
- 🔧 **TypeScript**: Full TypeScript support
- 🛠️ **DevTools**: Nuxt DevTools enabled

## Setup

This project uses pnpm as the package manager. Make sure to install dependencies:

```bash
pnpm install
```

## Development

Start the development server on `http://localhost:5000`:

```bash
pnpm dev
```

The server will automatically restart when you make changes to your code.

## Production

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Project Structure

```
nuxt-vue/
├── app/              # Application source code
│   ├── app.vue       # Root component
│   ├── components/   # Vue components
│   └── layouts/      # Layout components
├── server/           # Server-side code (optional)
│   ├── api/          # API endpoints
│   └── middleware/   # Server middleware
├── public/           # Static assets
├── assets/           # CSS and other assets
├── nuxt.config.ts    # Nuxt configuration
└── package.json      # Project dependencies
```

## Server API (Optional)

You can add server API by creating files in `server/api/` directory. See [server/README.md](./server/README.md) for more details.

## Learn More

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
