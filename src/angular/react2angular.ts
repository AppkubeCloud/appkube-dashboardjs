import { config } from '@grafana/runtime';
import coreModule from 'angular/core_module';
import { provideTheme } from 'core/utils/ConfigProvider';

export function react2AngularDirective(name: string, component: any, options: any) {
  coreModule.directive(name, [
    'reactDirective',
    (reactDirective) => {
      return reactDirective(provideTheme(component, config.theme2), options);
    },
  ]);
}
