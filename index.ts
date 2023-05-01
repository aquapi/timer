import { PageRouter, ignoreExts } from "@stricjs/arrow";
import Bun from "bun";

// Ignore all assets import
Bun.plugin(ignoreExts("jpg"));

// Create and load the app
const router = await new PageRouter({
    loader: { ".jpg": "file" }
}).load();

// Serve the app
export default router.app;