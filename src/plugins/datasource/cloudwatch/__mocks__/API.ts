import { getBackendSrv, setBackendSrv } from '@grafana/runtime';
import { getTimeSrv } from 'features/dashboard/services/TimeSrv';
import { TemplateSrv } from 'features/templating/template_srv';
import { CustomVariableModel } from 'features/variables/types';

import { CloudWatchAPI } from '../api';

import { CloudWatchSettings, setupMockedTemplateService } from './CloudWatchDataSource';

export function setupMockedAPI({
  variables,
  response,
}: {
  response?: Array<{ text: string; label: string; value: string }>;
  variables?: CustomVariableModel[];
  mockGetVariableName?: boolean;
} = {}) {
  let templateService = variables ? setupMockedTemplateService(variables) : new TemplateSrv();

  const timeSrv = getTimeSrv();
  const api = new CloudWatchAPI(CloudWatchSettings, templateService);
  const resourceRequestMock = jest.fn().mockReturnValue(response);
  setBackendSrv({
    ...getBackendSrv(),
    get: resourceRequestMock,
  });

  return { api, resourceRequestMock, templateService, timeSrv };
}
