import { ConfigService } from '@nestjs/config';
import AppService from "@/app.service";
import AppController from "@/app.controller";

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService(new ConfigService());
    appController = new AppController(appService);
  });

  describe('getIndex', () => {
    it('should return information about service', async () => {
      const result = {
        version: '0.1.0',
        name: 'service-backend',
        hostname: 'host',
        started_at: new Date(),
        engines: <object>undefined,
        endpoints: <object>undefined,
      };

      jest.spyOn(appService, 'getIndex').mockImplementation(() => result);

      expect(await appController.getIndex()).toBe(result);
    });
  });
});
