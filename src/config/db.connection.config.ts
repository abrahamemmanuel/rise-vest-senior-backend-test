import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import dataSource from "./typeorm.config";

const handleGetRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
	const environment = process.env.NODE_ENV || "development";
	return environment === "test"
		? dataSource.manager.getRepository(entity)
		: dataSource.manager.getRepository(entity);
};

export default handleGetRepository;
