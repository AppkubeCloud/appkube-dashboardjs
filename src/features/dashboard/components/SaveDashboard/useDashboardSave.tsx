import { useEffect } from 'react';
import useAsyncFn from 'react-use/lib/useAsyncFn';

import { locationUtil } from '@grafana/data';
import { locationService, reportInteraction } from '@grafana/runtime';
import appEvents from 'core/app_events';
import { useAppNotification } from 'core/copy/appNotification';
import { contextSrv } from 'core/core';
import { updateDashboardName } from 'core/reducers/navBarTree';
import { DashboardModel } from 'features/dashboard/state';
import { saveDashboard as saveDashboardApiCall } from 'features/manage-dashboards/state/actions';
import { useDispatch } from 'types';
import { DashboardSavedEvent } from 'types/events';

import { SaveDashboardOptions } from './types';

const saveDashboard = async (saveModel: any, options: SaveDashboardOptions, dashboard: DashboardModel) => {
  let folderId = options.folderId;
  if (folderId === undefined) {
    folderId = dashboard.meta.folderId ?? saveModel.folderId;
  }

  const result = await saveDashboardApiCall({ ...options, folderId, dashboard: saveModel });
  // fetch updated access control permissions
  await contextSrv.fetchUserPermissions();
  return result;
};

export const useDashboardSave = (dashboard: DashboardModel) => {
  const [state, onDashboardSave] = useAsyncFn(
    async (clone: any, options: SaveDashboardOptions, dashboard: DashboardModel) =>
      await saveDashboard(clone, options, dashboard),
    []
  );
  const dispatch = useDispatch();

  const notifyApp = useAppNotification();
  useEffect(() => {
    if (state.error && !state.loading) {
      notifyApp.error(state.error.message ?? 'Error saving dashboard');
    }
    if (state.value) {
      dashboard.version = state.value.version;
      dashboard.clearUnsavedChanges();

      // important that these happen before location redirect below
      appEvents.publish(new DashboardSavedEvent());
      notifyApp.success('Dashboard saved');
      reportInteraction(`grafana_dashboard_${dashboard.id ? 'saved' : 'created'}`, {
        name: dashboard.title,
        url: state.value.url,
      });

      const currentPath = locationService.getLocation().pathname;
      const newUrl = locationUtil.stripBaseFromUrl(state.value.url);

      if (newUrl !== currentPath) {
        setTimeout(() => locationService.replace(newUrl));
      }
      if (dashboard.meta.isStarred) {
        dispatch(
          updateDashboardName({
            id: dashboard.uid,
            title: dashboard.title,
            url: newUrl,
          })
        );
      }
    }
  }, [dashboard, state, notifyApp, dispatch]);

  return { state, onDashboardSave };
};
