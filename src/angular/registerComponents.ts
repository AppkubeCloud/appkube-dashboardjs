import { getBackendSrv, getDataSourceSrv } from '@grafana/runtime';
import { contextSrv } from 'core/core';
import { getDashboardSrv } from 'features/dashboard/services/DashboardSrv';
import { validationSrv } from 'features/manage-dashboards/services/ValidationSrv';
import { getLinkSrv } from 'features/panel/panellinks/link_srv';

import coreModule from './core_module';
import { UtilSrv } from './services/UtilSrv';
import { AnnotationsSrv } from './services/annotations_srv';

export function registerComponents() {
  coreModule.factory('backendSrv', () => getBackendSrv());
  coreModule.factory('contextSrv', () => contextSrv);
  coreModule.factory('dashboardSrv', () => getDashboardSrv());
  coreModule.factory('datasourceSrv', () => getDataSourceSrv());
  coreModule.factory('linkSrv', () => getLinkSrv());
  coreModule.factory('validationSrv', () => validationSrv);
  coreModule.service('annotationsSrv', AnnotationsSrv);
  coreModule.service('utilSrv', UtilSrv);
}
