import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Only apply Module Federation in the client-side build (not SSR)
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "list-app", // Remote name (list-app)
          filename: "static/chunks/remoteEntry.js", // Remote entry file that will be used by other apps
          exposes: {
            // Expose the CardContainer component from list-app
            "./CardContainer": "./components/CardContainer",
          },
          remotes: {}, // No remotes to load here since this is the remote app
          shared: {
            react: { singleton: true }, // Make sure react is a singleton across both apps
            "react-dom": { singleton: true },
          },
          extraOptions: {
            enableImageLoaderFix: true, // Enable fixes for image loading issues
            exposePages: true, // Optionally expose Next.js pages
            enableUrlLoaderFix: true, // Enable fixes for URLs in shared assets
          },
        })
      );
    }

    return config;
  },
};

export default nextConfig;

// const remotes = (isServer: any) => {
//   const location = isServer ? "ssr" : "chunks";
//   return {
//     shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
//     checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
//   };
// };

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   webpack(config, options) {
//     config.plugins.push(
//       new NextFederationPlugin({
//         name: "list-app",
//         filename: "static/chunks/remoteEntry.js",
//         dts: false,
//         exposes: {
//           "./CardContainer": "./containers/CardContainer",
//         },
//         remotes: remotes(options.isServer),
//         shared: {},
//         extraOptions: {
//           exposePages: true,
//         },
//       })
//     );
//     return config;
//   },
// };

// export default nextConfig;

// // new NextFederationPlugin({
// //   name: "list-app",
// //   filename: "static/chunks/remoteEntry.js",
// //   remotes: {
// //     "main-app": `http://localhost:3001/static/${
// //       options.isServer ? "ssr" : "chunks"
// //     }/remoteEntry.js`,
// //   },
// //   shared: {},
// //   extraOptions: {
// //     exposePages: true,
// //     enableImageLoaderFix: true,
// //     enableUrlLoaderFix: true,
// //   },
// // })
