import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { config } from 'core/config';

export const getPanelInspectorStyles = stylesFactory(() => {
  return {
    wrap: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      flex: 1 1 0;
    `,
    toolbar: css`
      display: flex;
      width: 100%;
      flex-grow: 0;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: ${config.theme.spacing.sm};
    `,
    toolbarItem: css`
      margin-left: ${config.theme.spacing.md};
    `,
    content: css`
      flex-grow: 1;
      height: 100%;
      overflow: scroll;
    `,
    editor: css`
      font-family: monospace;
      height: 100%;
      flex-grow: 1;
    `,
    viewer: css`
      overflow: scroll;
    `,
    dataFrameSelect: css`
      flex-grow: 2;
    `,
    leftActions: css`
      display: flex;
      flex-grow: 1;

      max-width: 85%;
      @media (max-width: 1345px) {
        max-width: 75%;
      }
    `,
    options: css`
      padding-top: ${config.theme.spacing.sm};
    `,
    dataDisplayOptions: css`
      flex-grow: 1;
      min-width: 300px;
      margin-right: ${config.theme.spacing.sm};
    `,
    selects: css`
      display: flex;
      > * {
        margin-right: ${config.theme.spacing.sm};
      }
    `,
  };
});
