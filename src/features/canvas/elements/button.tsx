import React, { PureComponent } from 'react';

import { Button } from '@grafana/ui';
import { DimensionContext } from 'features/dimensions/context';
import { TextDimensionEditor } from 'features/dimensions/editors/TextDimensionEditor';
import { TextDimensionConfig } from 'features/dimensions/types';
import { APIEditor, APIEditorConfig, callApi } from 'plugins/panel/canvas/editor/APIEditor';

import { CanvasElementItem, CanvasElementProps, defaultBgColor } from '../element';

interface ButtonData {
  text?: string;
  api?: APIEditorConfig;
}

interface ButtonConfig {
  text?: TextDimensionConfig;
  api?: APIEditorConfig;
}

class ButtonDisplay extends PureComponent<CanvasElementProps<ButtonConfig, ButtonData>> {
  render() {
    const { data } = this.props;
    const onClick = () => {
      if (data?.api) {
        callApi(data.api);
      }
    };

    return (
      <Button type="submit" onClick={onClick} style={{ background: defaultBgColor }}>
        {data?.text}
      </Button>
    );
  }
}

export const buttonItem: CanvasElementItem<ButtonConfig, ButtonData> = {
  id: 'button',
  name: 'Button',
  description: 'Button',

  display: ButtonDisplay,

  defaultSize: {
    width: 32,
    height: 32,
  },

  getNewOptions: (options) => ({
    ...options,
    background: {
      color: {
        fixed: 'transparent',
      },
    },
    placement: {
      width: 32,
      height: 32,
      top: 0,
      left: 0,
    },
  }),

  // Called when data changes
  prepareData: (ctx: DimensionContext, cfg: ButtonConfig) => {
    const data: ButtonData = {
      text: cfg?.text ? ctx.getText(cfg.text).value() : '',
      api: cfg?.api ?? undefined,
    };

    return data;
  },

  // Heatmap overlay options
  registerOptionsUI: (builder) => {
    const category = ['Button'];
    builder
      .addCustomEditor({
        category,
        id: 'textSelector',
        path: 'config.text',
        name: 'Text',
        editor: TextDimensionEditor,
      })
      .addCustomEditor({
        category,
        id: 'apiSelector',
        path: 'config.api',
        name: 'API',
        editor: APIEditor,
      });
  },
};
