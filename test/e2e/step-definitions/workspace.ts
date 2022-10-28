import {NestFastifyApplication} from "@nestjs/platform-fastify";
import {Response} from "superagent";

export class Workspace {
    public app: NestFastifyApplication;
    public response: Response;
}
