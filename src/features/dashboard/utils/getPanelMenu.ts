import { PanelMenuItem } from '@grafana/data';
import { AngularComponent, getDataSourceSrv, locationService, reportInteraction } from '@grafana/runtime';
// import { PanelCtrl } from 'angular/panel/panel_ctrl';
import config from 'core/config';
import { t } from 'core/internationalization';
import { contextSrv } from 'core/services/context_srv';
import { getExploreUrl } from 'core/utils/explore';
import { DashboardModel } from 'features/dashboard/state/DashboardModel';
import { PanelModel } from 'features/dashboard/state/PanelModel';
import {
  addLibraryPanel,
  copyPanel,
  duplicatePanel,
  removePanel,
  sharePanel,
  toggleLegend,
  unlinkLibraryPanel,
} from 'features/dashboard/utils/panel';
import { InspectTab } from 'features/inspector/types';
import { isPanelModelLibraryPanel } from 'features/library-panels/guard';
import { store } from 'store/store';

import { navigateToExplore } from '../../explore/state/main';
import { getTimeSrv } from '../services/TimeSrv';

export function getPanelMenu(
  dashboard: DashboardModel,
  panel: PanelModel,
  angularComponent?: AngularComponent | null
): PanelMenuItem[] {
  const onViewPanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    locationService.partial({
      viewPanel: panel.id,
    });
  };

  const onEditPanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    locationService.partial({
      editPanel: panel.id,
    });
  };

  const onSharePanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    sharePanel(dashboard, panel);
  };

  const onAddLibraryPanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    addLibraryPanel(dashboard, panel);
  };

  const onUnlinkLibraryPanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    unlinkLibraryPanel(panel);
  };

  const onInspectPanel = (tab?: InspectTab) => {
    locationService.partial({
      inspect: panel.id,
      inspectTab: tab,
    });

    reportInteraction('grafana_panel_menu_inspect', {
      tab: tab ?? InspectTab.Data,
    });
  };

  const onMore = (event: React.MouseEvent<any>) => {
    event.preventDefault();
  };

  const onDuplicatePanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    duplicatePanel(dashboard, panel);
  };

  const onCopyPanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    copyPanel(panel);
  };

  const onRemovePanel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    removePanel(dashboard, panel, true);
  };

  const onNavigateToExplore = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    const openInNewWindow =
      event.ctrlKey || event.metaKey ? (url: string) => window.open(`${config.appSubUrl}${url}`) : undefined;
    store.dispatch(navigateToExplore(panel, { getDataSourceSrv, getTimeSrv, getExploreUrl, openInNewWindow }) as any);
  };

  const onToggleLegend = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleLegend(panel);
  };
  const menu: PanelMenuItem[] = [];

  if (!panel.isEditing) {
    const viewTextTranslation = t('panel.header-menu.view', `View`);
    menu.push({
      text: viewTextTranslation,
      iconClassName: 'eye',
      onClick: onViewPanel,
      shortcut: 'v',
    });
  }

  if (dashboard.canEditPanel(panel) && !panel.isEditing) {
    menu.push({
      text: 'Edit',
      iconClassName: 'edit',
      onClick: onEditPanel,
      shortcut: 'e',
    });
  }

  const shareTextTranslation = t('panel.header-menu.share', `Share`);

  menu.push({
    text: shareTextTranslation,
    iconClassName: 'share-alt',
    onClick: onSharePanel,
    shortcut: 'p s',
  });

  if (contextSrv.hasAccessToExplore() && !(panel.plugin && panel.plugin.meta.skipDataQuery)) {
    menu.push({
      text: 'Explore',
      iconClassName: 'compass',
      onClick: onNavigateToExplore,
      shortcut: 'x',
    });
  }

  const inspectMenu: PanelMenuItem[] = [];

  // Only show these inspect actions for data plugins
  if (panel.plugin && !panel.plugin.meta.skipDataQuery) {
    const dataTextTranslation = t('panel.header-menu.inspect-data', `Data`);

    inspectMenu.push({
      text: dataTextTranslation,
      onClick: (e: React.MouseEvent<any>) => onInspectPanel(InspectTab.Data),
    });

    if (dashboard.meta.canEdit) {
      inspectMenu.push({
        text: 'Query',
        onClick: (e: React.MouseEvent<any>) => onInspectPanel(InspectTab.Query),
      });
    }
  }

  const jsonTextTranslation = t('panel.header-menu.inspect-json', `Panel JSON`);

  inspectMenu.push({
    text: jsonTextTranslation,
    onClick: (e: React.MouseEvent<any>) => onInspectPanel(InspectTab.JSON),
  });

  const inspectTextTranslation = t('panel.header-menu.inspect', `Inspect`);

  menu.push({
    type: 'submenu',
    text: inspectTextTranslation,
    iconClassName: 'info-circle',
    onClick: (e: React.MouseEvent<any>) => onInspectPanel(),
    shortcut: 'i',
    subMenu: inspectMenu,
  });

  const subMenu: PanelMenuItem[] = [];
  const canEdit = dashboard.canEditPanel(panel);

  if (canEdit && !(panel.isViewing || panel.isEditing)) {
    subMenu.push({
      text: 'Duplicate',
      onClick: onDuplicatePanel,
      shortcut: 'p d',
    });

    subMenu.push({
      text: 'Copy',
      onClick: onCopyPanel,
    });

    if (isPanelModelLibraryPanel(panel)) {
      subMenu.push({
        text: 'Unlink library panel',
        onClick: onUnlinkLibraryPanel,
      });
    } else {
      subMenu.push({
        text: 'Create library panel',
        onClick: onAddLibraryPanel,
      });
    }
  }

  // add old angular panel options
  // if (angularComponent) {
  //   const scope = angularComponent.getScope();
  //   const panelCtrl: PanelCtrl = scope.$$childHead.ctrl;
  //   const angularMenuItems = panelCtrl.getExtendedMenu();

  //   for (const item of angularMenuItems) {
  //     const reactItem: PanelMenuItem = {
  //       text: item.text,
  //       href: item.href,
  //       shortcut: item.shortcut,
  //     };

  //     if (item.click) {
  //       reactItem.onClick = () => {
  //         scope.$eval(item.click, { ctrl: panelCtrl });
  //       };
  //     }

  //     subMenu.push(reactItem);
  //   }
  // }

  if (panel.options.legend) {
    subMenu.push({
      text: panel.options.legend.showLegend ? 'Hide legend' : 'Show legend',
      onClick: onToggleLegend,
      shortcut: 'p l',
    });
  }

  // When editing hide most actions
  if (panel.isEditing) {
    subMenu.length = 0;
  }

  if (canEdit && panel.plugin && !panel.plugin.meta.skipDataQuery) {
    subMenu.push({
      text: 'Get help',
      onClick: (e: React.MouseEvent) => onInspectPanel(InspectTab.Help),
    });
  }

  if (subMenu.length) {
    const moreTextTranslation = t('panel.header-menu.more', `More...`);
    menu.push({
      type: 'submenu',
      text: moreTextTranslation,
      iconClassName: 'cube',
      subMenu,
      onClick: onMore,
    });
  }

  if (dashboard.canEditPanel(panel) && !panel.isEditing && !panel.isViewing) {
    menu.push({ type: 'divider', text: '' });

    menu.push({
      text: 'Remove',
      iconClassName: 'trash-alt',
      onClick: onRemovePanel,
      shortcut: 'p r',
    });
  }

  return menu;
}
