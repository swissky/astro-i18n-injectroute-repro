import node from "@astrojs/node";
import { defineConfig } from "astro/config";

/** Stands in for any integration that ships its own UI, such as a CMS admin. */
const adminIntegration = {
	name: "admin-integration",
	hooks: {
		"astro:config:setup": ({ injectRoute }) => {
			injectRoute({
				pattern: "/_admin/[...path]",
				entrypoint: new URL("./integration/admin.astro", import.meta.url),
				prerender: false,
			});
			injectRoute({
				pattern: "/_admin/api/ping",
				entrypoint: new URL("./integration/ping.ts", import.meta.url),
				prerender: false,
			});
		},
	},
};

export default defineConfig({
	output: "server",
	adapter: node({ mode: "standalone" }),
	integrations: [adminIntegration],
	i18n: {
		defaultLocale: "en",
		locales: ["en", "fr"],
		routing: { prefixDefaultLocale: true },
	},
});
