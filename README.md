# Micro Frontend with Next.js and Module Federation

This project demonstrates a micro frontend architecture using **Next.js** and **Module Federation**. The architecture consists of two applications:

1. **Main App (`main-app`)**: The host application that consumes shared components.
2. **List App (`list-app`)**: A remote application that exposes components to be consumed by the main app.

In this example, `list-app` exposes the `CardContainer` component, and `main-app` imports and uses this component.

## Project Structure

```
/list-app
  /pages
    ...
  /containers
    CardContainer.tsx
  /components
    Card.tsx
  next.config.ts
  package.json
  tsconfig.json
  yarn.lock
  ...

/main-app
  /pages
    ...
  /components
    Header.tsx
    Footer.tsx
  next.config.ts
  package.json
  tsconfig.json
  yarn.lock
  ...
```

### Dependencies:

- `next`: Next.js framework
- `@module-federation/nextjs-mf`: Module Federation plugin for Next.js
- `react`, `react-dom`: React library

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure that you have Node.js (>=16.x.x) installed on your machine.
2. **Yarn**: I am using Yarn as the package manager in this project. Install Yarn by following the instructions on the [official Yarn website](https://classic.yarnpkg.com/en/docs/install).

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Kr-Upendra/musical-palm-tree.git
cd micro-frontend-nextjs-mf
```

### Step 2: Install Dependencies

There are two applications: `main-app` and `list-app`. You will need to install dependencies for both:

#### Install dependencies for `list-app`:

```bash
cd list-app
yarn
```

#### Install dependencies for `main-app`:

```bash
cd ../main-app
yarn
```

### Step 3: Start the Development Servers

Now that dependencies are installed, you can start both apps locally.

1. **Start `list-app`** (runs on port 3001):

```bash
cd list-app
yarn dev
```

2. **Start `main-app`** (runs on port 3000):

```bash
cd ../main-app
yarn dev
```

Once both applications are running, you can access them in your browser:

- `main-app` will be available at [http://localhost:3000](http://localhost:3000).
- `list-app` will be available at [http://localhost:3001](http://localhost:3001).

### Step 4: Verify Module Federation Integration

- **In `list-app`**: The `CardContainer` component is exposed as a remote module using Module Federation. It is accessible from the `main-app`.
- **In `main-app`**: The `CardContainer` component is imported dynamically from `list-app` and used in the main app.

### Example:

In `main-app`, you might have something like this to import the `CardContainer`:

```tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const CardContainer = dynamic(() => import("list-app/CardContainer"));

export default function Home() {
  return (
    <>
      <Header />
      <CardContainer />
      <Footer />
    </>
  );
}
```

### Troubleshooting

If you encounter any issues while running the project, here are a few common troubleshooting steps:

1. **Missing Dependencies**:
   - Run `yarn install` in both `main-app` and `list-app` directories to ensure all dependencies are installed.
2. **Module Not Found Errors**:

   - Check that the paths for exposing and importing remote modules are correctly configured in both `next.config.js` files.
   - Ensure that both apps are running on their respective ports (`3000` for `main-app` and `3001` for `list-app`).

3. **WebPack Configuration Issues**:

   - If you encounter issues related to Webpack, ensure that both `next.config.js` files are correctly set up for Module Federation, including the `NextFederationPlugin` settings.

4. **Port Conflicts**:
   - Make sure that no other applications are using the same ports (`3000` and `3001`).

### Project Structure

#### `list-app/next.config.ts`

This file configures `list-app` as a remote module with Module Federation:

```js
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "list-app",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./CardContainer": "./containers/CardContainer",
          },
          remotes: {},
          shared: {
            react: { singleton: true },
            "react-dom": { singleton: true },
          },
        })
      );
    }
    return config;
  },
};
```

#### `main-app/next.config.ts`

This file configures `main-app` to consume the remote `CardContainer` component from `list-app`:

```js
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "main-app",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            "list-app": `http://localhost:3001/static/${
              isServer ? "ssr" : "chunks"
            }/remoteEntry.js`,
          },
          shared: {
            react: { singleton: true },
            "react-dom": { singleton: true },
          },
        })
      );
    }
    return config;
  },
};
```

### License

MIT License.
