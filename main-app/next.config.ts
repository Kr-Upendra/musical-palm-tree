import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Only apply Module Federation in the client-side build (not SSR)
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "main-app", // Host name (main-app)
          filename: "static/chunks/remoteEntry.js", // Remote entry file for mfe1 (main app)
          remotes: {
            // Define the remote (list-app) URL for consuming remote components
            "list-app": `http://localhost:3001/static/${
              isServer ? "ssr" : "chunks"
            }/remoteEntry.js`, // URL to load the remote entry from list-app
          },
          shared: {
            react: { singleton: true }, // React should be a singleton
            "react-dom": { singleton: true },
          },
          extraOptions: {
            enableImageLoaderFix: true, // Enable fixes for image loading
            exposePages: true,
            enableUrlLoaderFix: true, // Enable URL loader fixes for assets
          },
        })
      );
    }

    return config;
  },
};

export default nextConfig;
