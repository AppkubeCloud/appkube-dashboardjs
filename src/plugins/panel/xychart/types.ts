import { DataFrame, Field, FieldColorMode } from '@grafana/data';
import { LineStyle, VisibilityMode } from '@grafana/schema';
import { VizLegendItem } from '@grafana/ui';
import { ScaleDimensionConfig } from 'features/dimensions';

/**
 * @internal
 */
export type DimensionValues<T> = (frame: DataFrame, from?: number) => T | T[];

export interface ScatterHoverEvent {
  scatterIndex: number;
  xIndex: number;
  pageX: number;
  pageY: number;
}

export type ScatterHoverCallback = (evt?: ScatterHoverEvent) => void;

export interface LegendInfo {
  color: CanvasRenderingContext2D['strokeStyle'];
  text: string;
  symbol: string;
  openEditor?: (evt: any) => void;
}

// Using field where we will need formatting/scale/axis info
// Use raw or DimensionValues when the values can be used directly
export interface ScatterSeries {
  name: string;

  /** Finds the relevant frame from the raw panel data */
  frame: (frames: DataFrame[]) => DataFrame;

  x: (frame: DataFrame) => Field;
  y: (frame: DataFrame) => Field;

  legend: () => VizLegendItem[]; // could be single if symbol is constant

  showLine: boolean;
  lineWidth: number;
  lineStyle: LineStyle;
  lineColor: (frame: DataFrame) => CanvasRenderingContext2D['strokeStyle'];

  showPoints: VisibilityMode;
  pointSize: DimensionValues<number>;
  pointColor: DimensionValues<CanvasRenderingContext2D['strokeStyle']>;
  pointSymbol: DimensionValues<string>; // single field, multiple symbols.... kinda equals multiple series

  label: VisibilityMode;
  labelValue: DimensionValues<string>;
  show: boolean;

  hints: {
    pointSize: ScaleDimensionConfig;
    pointColor: {
      mode: FieldColorMode;
    };
  };
}
