import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/index.esm";
import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app"),
})

export default app
