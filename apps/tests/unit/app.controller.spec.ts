import { ConfigService } from '@nestjs/config';
import ApiService from '../../../apps/api-gateway/src/api.service';
import ApiController from '../../../apps/api-gateway/src/api.controller';

describe('ApiController', () => {
  let apiController: ApiController;
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService(new ConfigService());
    apiController = new ApiController(apiService);
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

      jest.spyOn(apiService, 'getIndex').mockImplementation(() => result);

      expect(await apiController.getIndex()).toBe(result);
    });
  });
});
