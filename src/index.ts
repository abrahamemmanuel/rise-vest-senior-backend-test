import "dotenv/config";
import "module-alias/register";
import validateEnv from "@/utils/validateEnv";
import App from "./app";
import PostController from "@/resources/post/post.controller";
import UserController from "@/resources/user/user.controller";
import dataSource from "@/config/typeorm.config";

validateEnv();

const app = new App([new PostController(), new UserController()], Number(process.env.PORT));
(async () => {
	dataSource
		.initialize()
		.then(() => {
			app.listen();
			console.log("Connected to DB successfully.");
		})
		.catch((error) => console.error("DB connection failed : " + error));
})();
