import { AppRoutes } from "./presentation/routes";
import { connetionDB } from "./data";
import { envs } from "./config";
import { Server } from "./presentation/server";

(async() => {
    await connetionDB();

    const server = new Server({
        port: envs.PORT,
        publicPaht: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });

    server.start();
})();