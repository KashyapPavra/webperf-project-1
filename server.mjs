import { createServer } from "http";
import staticHandler from "./staticHandler.mjs";
import express from "express";
import conpress from "compression";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(conpress());
app.use(staticHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = __dirname + "/dist/css";

app.use(
	express.static(staticPath, {
		etag: true,
		lastModified: true,
	})
);

const server = createServer(app);

server.listen(4000, () => {
	console.log("Server running at http://localhost:4000/");
});
