import sveltePreprocess from "svelte-preprocess";
import { dirname } from "path";
import { fileURLToPath } from "url";

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/scss`;

export default {
    // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
    // for more information about preprocessors
    preprocess: sveltePreprocess({
        scss: {
			prependData: `@import "${sassPath}/custom.scss";`
		}
    }),
}
