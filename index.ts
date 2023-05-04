import { PageRouter, ignoreExts } from "@stricjs/arrow";
import Bun from "bun";

// Ignore all assets import
Bun.plugin(ignoreExts("jpg"));

// Serve the app
new PageRouter({
    loader: { ".jpg": "file" }
}).serve();