import { binding, when, after} from 'cucumber-tsflow';
import request from 'supertest';
import {DataTable} from "@cucumber/cucumber";
import {Workspace} from "./workspace";

// tslint:disable-next-line:max-classes-per-file
@binding([Workspace])
export class ActionSteps {
  constructor(protected workspace: Workspace) {}

  @when(/Call GET to "([^"]*)"$/)
  public async getCallToAPI(url: string) {

    this.workspace.response = await request(this.workspace.app.getHttpServer())
        .get(url);
  }

  @after()
  public async after() {
    await this.workspace.app.close();
  }
}
