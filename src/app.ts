import { envs } from "./config";
import { MongoDataBase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})()


async function main() {
    // await base de datos
    await MongoDataBase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    // inicio del server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start()
}