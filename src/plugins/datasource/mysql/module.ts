import { DataSourcePlugin } from '@grafana/data';
import { SqlQueryEditor } from 'features/plugins/sql/components/QueryEditor';
import { SQLQuery } from 'features/plugins/sql/types';

import { MySqlDatasource } from './MySqlDatasource';
import { ConfigurationEditor } from './configuration/ConfigurationEditor';
import { MySQLOptions } from './types';

export const plugin = new DataSourcePlugin<MySqlDatasource, SQLQuery, MySQLOptions>(MySqlDatasource)
  .setQueryEditor(SqlQueryEditor)
  .setConfigEditor(ConfigurationEditor);
