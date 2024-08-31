// function importAll(ctx: __WebpackModuleApi.RequireContext) {
//   ctx.keys().forEach(ctx);
// }

// const context = require.context("./packages", true, /index.module\.[j,t]sx?$/);

// importAll(context);

function loadComponent(url: string, scope: string, module: string) {
  return new Promise(async (resolve, reject) => {
    await __webpack_init_sharing__("default");

    const script = document.createElement("script");

    script.async = true;
    script.type = "text/javascript";
    script.src = url;

    script.onload = async () => {
      const container = window[scope]; // or get the container somewhere else
      // @ts-expect-error
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();

      script.parentElement?.removeChild(script);
      resolve(Module);
    };

    script.onerror = (e) => {
      script.parentElement?.removeChild(script);
      reject(e);
    };

    document.head.appendChild(script);
  });
}

(async () => {
  const remotes = [
    {
      url: "http://localhost:3001/remoteEntry.js",
      scope: "aApp",
      module: "./a",
    },
    {
      url: "http://localhost:3002/remoteEntry.js",
      scope: "bApp",
      module: "./b",
    },
    {
      url: "http://localhost:3003/remoteEntry.js",
      scope: "cApp",
      module: "./c",
    },
  ];

  const modules = await Promise.all(
    remotes.map(({ url, scope, module }) => loadComponent(url, scope, module))
  );
})();
