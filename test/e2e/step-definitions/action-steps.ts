import { binding, when, after} from 'cucumber-tsflow';
import request from 'supertest';
import {DataTable} from "@cucumber/cucumber";
import {Workspace} from "./workspace";

// tslint:disable-next-line:max-classes-per-file
@binding([Workspace])
export class ActionSteps {
  constructor(protected workspace: Workspace) {}

  @when(/Call POST to "([^"]*)" with the following body:$/)
  public async postCallToAPI(stringUrl: string, body: DataTable) {

    const url = stringUrl.replace("{uuid}", this.workspace?.response?.body?.uuid);

    const jsonBody = body.hashes()[0];
    // Remove null or empty fields
    Object.keys(jsonBody)
        .forEach((key) => (jsonBody[key] == null || jsonBody[key] == '') && delete jsonBody[key]);

    // Use boolean type
    Object.keys(jsonBody)
        .forEach((key) => {
          if (jsonBody[key] === 'true') {
            jsonBody[key] = true;
          } else if (jsonBody[key] === 'false') {
            jsonBody[key] = false;
          }
        });

    this.workspace.response = await request(this.workspace.app.getHttpServer())
      .post(url).send(jsonBody);
  }

  @when(/Call GET to "([^"]*)"$/)
  public async getCallToAPI(stringUrl: string) {

    const url = stringUrl.replace("{uuid}", this.workspace?.response?.body?.uuid);

    this.workspace.response = await request(this.workspace.app.getHttpServer())
        .get(url);
  }

  @when(/Call GET to "([^"]*)" with an offset of "([^"]*)" and a limit of "([^"]*)"$/)
  public async getCallToAPIWIthOffsetAndLimit(stringUrl: string, skip: string, limit: string) {

    const url = stringUrl.replace("{uuid}", this.workspace?.response?.body?.uuid);

    this.workspace.response = await request(this.workspace.app.getHttpServer())
        .get(`${url}?skip=${skip}&limit=${limit}`);
  }

  @when(/Call PATCH to "([^"]*)" with the following body:$/)
  public async patchCallToAPIWithUuid(stringUrl: string, body: DataTable) {

    const url = stringUrl.replace("{uuid}", this.workspace?.response?.body?.uuid);

    const jsonBody = body.hashes()[0];
    // Remove null or empty fields
    Object.keys(jsonBody).forEach((key) => (jsonBody[key] == null || jsonBody[key] == '') && delete jsonBody[key]);

    // Use boolean type
    Object.keys(jsonBody)
        .forEach((key) => {
          if (jsonBody[key] === 'true') {
            jsonBody[key] = true;
          } else if (jsonBody[key] === 'false') {
            jsonBody[key] = false;
          }
        });

    this.workspace.response = await request(this.workspace.app.getHttpServer())
        .patch(url).send(jsonBody);
  }

  @after()
  public async after() {
    await this.workspace.app.close();
  }
}
