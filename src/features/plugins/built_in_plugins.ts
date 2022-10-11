import { config } from '@grafana/runtime';
import * as alertGroupsPanel from 'plugins/panel/alertGroups/module';
import * as alertListPanel from 'plugins/panel/alertlist/module';
import * as annoListPanel from 'plugins/panel/annolist/module';
import * as barChartPanel from 'plugins/panel/barchart/module';
import * as barGaugePanel from 'plugins/panel/bargauge/module';
import * as candlestickPanel from 'plugins/panel/candlestick/module';
import * as dashListPanel from 'plugins/panel/dashlist/module';
import * as debugPanel from 'plugins/panel/debug/module';
import * as flamegraphPanel from 'plugins/panel/flamegraph/module';
import * as gaugePanel from 'plugins/panel/gauge/module';
import * as gettingStartedPanel from 'plugins/panel/gettingstarted/module';
import * as histogramPanel from 'plugins/panel/histogram/module';
import * as livePanel from 'plugins/panel/live/module';
import * as logsPanel from 'plugins/panel/logs/module';
import * as newsPanel from 'plugins/panel/news/module';
import * as nodeGraph from 'plugins/panel/nodeGraph/module';
import * as pieChartPanel from 'plugins/panel/piechart/module';
import * as statPanel from 'plugins/panel/stat/module';
import * as stateTimelinePanel from 'plugins/panel/state-timeline/module';
import * as statusHistoryPanel from 'plugins/panel/status-history/module';
import * as tablePanel from 'plugins/panel/table/module';
import * as textPanel from 'plugins/panel/text/module';
import * as timeseriesPanel from 'plugins/panel/timeseries/module';
import * as tracesPanel from 'plugins/panel/traces/module';
import * as welcomeBanner from 'plugins/panel/welcome/module';
import * as xyChartPanel from 'plugins/panel/xychart/module';


const graphitePlugin = async () =>
  await import(/* webpackChunkName: "graphitePlugin" */ 'plugins/datasource/graphite/module');
const cloudwatchPlugin = async () =>
  await import(/* webpackChunkName: "cloudwatchPlugin" */ 'plugins/datasource/cloudwatch/module');
const dashboardDSPlugin = async () =>
  await import(/* webpackChunkName "dashboardDSPlugin" */ 'plugins/datasource/dashboard/module');
const elasticsearchPlugin = async () =>
  await import(/* webpackChunkName: "elasticsearchPlugin" */ 'plugins/datasource/elasticsearch/module');
const opentsdbPlugin = async () =>
  await import(/* webpackChunkName: "opentsdbPlugin" */ 'plugins/datasource/opentsdb/module');
const grafanaPlugin = async () =>
  await import(/* webpackChunkName: "grafanaPlugin" */ 'plugins/datasource/grafana/module');
const influxdbPlugin = async () =>
  await import(/* webpackChunkName: "influxdbPlugin" */ 'plugins/datasource/influxdb/module');
const lokiPlugin = async () => await import(/* webpackChunkName: "lokiPlugin" */ 'plugins/datasource/loki/module');
const jaegerPlugin = async () =>
  await import(/* webpackChunkName: "jaegerPlugin" */ 'plugins/datasource/jaeger/module');
const zipkinPlugin = async () =>
  await import(/* webpackChunkName: "zipkinPlugin" */ 'plugins/datasource/zipkin/module');
const mixedPlugin = async () =>
  await import(/* webpackChunkName: "mixedPlugin" */ 'plugins/datasource/mixed/module');
const mysqlPlugin = async () =>
  await import(/* webpackChunkName: "mysqlPlugin" */ 'plugins/datasource/mysql/module');
const postgresPlugin = async () =>
  await import(/* webpackChunkName: "postgresPlugin" */ 'plugins/datasource/postgres/module');
const prometheusPlugin = async () =>
  await import(/* webpackChunkName: "prometheusPlugin" */ 'plugins/datasource/prometheus/module');
const mssqlPlugin = async () =>
  await import(/* webpackChunkName: "mssqlPlugin" */ 'plugins/datasource/mssql/module');
const testDataDSPlugin = async () =>
  await import(/* webpackChunkName: "testDataDSPlugin" */ 'plugins/datasource/testdata/module');
const cloudMonitoringPlugin = async () =>
  await import(/* webpackChunkName: "cloudMonitoringPlugin" */ 'plugins/datasource/cloud-monitoring/module');
const azureMonitorPlugin = async () =>
  await import(
    /* webpackChunkName: "azureMonitorPlugin" */ 'plugins/datasource/grafana-azure-monitor-datasource/module'
  );
const tempoPlugin = async () =>
  await import(/* webpackChunkName: "tempoPlugin" */ 'plugins/datasource/tempo/module');
const alertmanagerPlugin = async () =>
  await import(/* webpackChunkName: "alertmanagerPlugin" */ 'plugins/datasource/alertmanager/module');

// Async loaded panels
const geomapPanel = async () => await import(/* webpackChunkName: "geomapPanel" */ 'plugins/panel/geomap/module');
const canvasPanel = async () => await import(/* webpackChunkName: "canvasPanel" */ 'plugins/panel/canvas/module');
const iconPanel = async () => await import(/* webpackChunkName: "iconPanel" */ 'plugins/panel/icon/module');
const graphPanel = async () => await import(/* webpackChunkName: "graphPlugin" */ 'plugins/panel/graph/module');
const heatmapPanel = async () =>
  await import(/* webpackChunkName: "heatmapPanel" */ 'plugins/panel/heatmap/module');
const heatmapPanelOLD = async () =>
  await import(/* webpackChunkName: "heatmapPanelOLD" */ 'plugins/panel/heatmap-old/module');

const tableOldPanel = async () =>
  await import(/* webpackChunkName: "tableOldPlugin" */ 'plugins/panel/table-old/module');

// Automatically migrate heatmap panel.
if (config.featureToggles.useLegacyHeatmapPanel) {
  const heatmap = config.panels['heatmap'];
  const legacy = config.panels['heatmap-old'];
  legacy.id = heatmap.id;
  legacy.module = heatmap.module;
  legacy.state = heatmap.state;
  config.panels['heatmap'] = legacy;
}
delete config.panels['heatmap-old'];

const builtInPlugins: any = {
  'plugins/datasource/graphite/module': graphitePlugin,
  'plugins/datasource/cloudwatch/module': cloudwatchPlugin,
  'plugins/datasource/dashboard/module': dashboardDSPlugin,
  'plugins/datasource/elasticsearch/module': elasticsearchPlugin,
  'plugins/datasource/opentsdb/module': opentsdbPlugin,
  'plugins/datasource/grafana/module': grafanaPlugin,
  'plugins/datasource/influxdb/module': influxdbPlugin,
  'plugins/datasource/loki/module': lokiPlugin,
  'plugins/datasource/jaeger/module': jaegerPlugin,
  'plugins/datasource/zipkin/module': zipkinPlugin,
  'plugins/datasource/mixed/module': mixedPlugin,
  'plugins/datasource/mysql/module': mysqlPlugin,
  'plugins/datasource/postgres/module': postgresPlugin,
  'plugins/datasource/mssql/module': mssqlPlugin,
  'plugins/datasource/prometheus/module': prometheusPlugin,
  'plugins/datasource/testdata/module': testDataDSPlugin,
  'plugins/datasource/cloud-monitoring/module': cloudMonitoringPlugin,
  'plugins/datasource/grafana-azure-monitor-datasource/module': azureMonitorPlugin,
  'plugins/datasource/tempo/module': tempoPlugin,
  'plugins/datasource/alertmanager/module': alertmanagerPlugin,

  'plugins/panel/text/module': textPanel,
  'plugins/panel/timeseries/module': timeseriesPanel,
  'plugins/panel/state-timeline/module': stateTimelinePanel,
  'plugins/panel/status-history/module': statusHistoryPanel,
  'plugins/panel/candlestick/module': candlestickPanel,
  'plugins/panel/graph/module': graphPanel,
  'plugins/panel/xychart/module': xyChartPanel,
  'plugins/panel/geomap/module': geomapPanel,
  'plugins/panel/canvas/module': canvasPanel,
  'plugins/panel/icon/module': iconPanel,
  'plugins/panel/dashlist/module': dashListPanel,
  'plugins/panel/alertlist/module': alertListPanel,
  'plugins/panel/annolist/module': annoListPanel,
  'plugins/panel/heatmap/module': config.featureToggles.useLegacyHeatmapPanel ? heatmapPanelOLD : heatmapPanel,
  'plugins/panel/table/module': tablePanel,
  'plugins/panel/table-old/module': tableOldPanel,
  'plugins/panel/news/module': newsPanel,
  'plugins/panel/live/module': livePanel,
  'plugins/panel/stat/module': statPanel,
  'plugins/panel/debug/module': debugPanel,
  'plugins/panel/flamegraph/module': flamegraphPanel,
  'plugins/panel/gettingstarted/module': gettingStartedPanel,
  'plugins/panel/gauge/module': gaugePanel,
  'plugins/panel/piechart/module': pieChartPanel,
  'plugins/panel/bargauge/module': barGaugePanel,
  'plugins/panel/barchart/module': barChartPanel,
  'plugins/panel/logs/module': logsPanel,
  'plugins/panel/traces/module': tracesPanel,
  'plugins/panel/welcome/module': welcomeBanner,
  'plugins/panel/nodeGraph/module': nodeGraph,
  'plugins/panel/histogram/module': histogramPanel,
  'plugins/panel/alertGroups/module': alertGroupsPanel,
};

export default builtInPlugins;
