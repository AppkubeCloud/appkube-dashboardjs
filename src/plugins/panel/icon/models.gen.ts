//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// NOTE: This file will be auto generated from models.cue
// It is currenty hand written but will serve as the target for cuetsy
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { CanvasElementOptions } from 'features/canvas';
import { IconConfig } from 'features/canvas/elements/icon';
import { ResourceDimensionMode } from 'features/dimensions';

export interface PanelOptions {
  root: Omit<CanvasElementOptions<IconConfig>, 'type' | 'name'>; // type is forced
}

export const defaultPanelOptions: PanelOptions = {
  root: {
    config: {
      path: {
        mode: ResourceDimensionMode.Fixed,
        fixed: 'img/icons/unicons/analysis.svg',
      },
      fill: {
        fixed: 'green'
      }
    },
  },
};
