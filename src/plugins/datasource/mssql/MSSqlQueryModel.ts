import { ScopedVars } from '@grafana/data';
import { TemplateSrv } from '@grafana/runtime';
import { applyQueryDefaults } from 'features/plugins/sql/defaults';
import { SQLQuery, SqlQueryModel } from 'features/plugins/sql/types';
import { FormatRegistryID } from 'features/templating/formatRegistry';

export class MSSqlQueryModel implements SqlQueryModel {
  target: SQLQuery;
  templateSrv?: TemplateSrv;
  scopedVars?: ScopedVars;

  constructor(target?: SQLQuery, templateSrv?: TemplateSrv, scopedVars?: ScopedVars) {
    this.target = applyQueryDefaults(target || { refId: 'A' });
    this.templateSrv = templateSrv;
    this.scopedVars = scopedVars;
  }

  interpolate() {
    return this.templateSrv?.replace(this.target.rawSql, this.scopedVars, FormatRegistryID.sqlString) || '';
  }

  quoteLiteral(value: string) {
    return "'" + value.replace(/'/g, "''") + "'";
  }
}
