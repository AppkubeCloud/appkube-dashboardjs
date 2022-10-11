import React, { useEffect } from 'react';

import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';
import { CustomScrollbar } from '@grafana/ui';
import { useUnifiedAlertingSelector } from 'features/alerting/unified/hooks/useUnifiedAlertingSelector';
import { fetchAlertGroupsAction } from 'features/alerting/unified/state/actions';
import { parseMatchers } from 'features/alerting/unified/utils/alertmanager';
import { NOTIFICATIONS_POLL_INTERVAL_MS } from 'features/alerting/unified/utils/constants';
import { initialAsyncRequestState } from 'features/alerting/unified/utils/redux';
import { AlertmanagerGroup, Matcher } from 'plugins/datasource/alertmanager/types';
import { useDispatch } from 'types';

import { AlertGroup } from './AlertGroup';
import { AlertGroupPanelOptions } from './types';
import { useFilteredGroups } from './useFilteredGroups';

export const AlertGroupsPanel = (props: PanelProps<AlertGroupPanelOptions>) => {
  const dispatch = useDispatch();
  const isAlertingEnabled = config.unifiedAlertingEnabled;

  const expandAll = props.options.expandAll;
  const alertManagerSourceName = props.options.alertmanager;

  const alertGroups = useUnifiedAlertingSelector((state) => state.amAlertGroups) || initialAsyncRequestState;
  const results: AlertmanagerGroup[] = alertGroups[alertManagerSourceName || '']?.result || [];
  const matchers: Matcher[] = props.options.labels ? parseMatchers(props.options.labels) : [];

  const filteredResults = useFilteredGroups(results, matchers);

  useEffect(() => {
    function fetchNotifications() {
      if (alertManagerSourceName) {
        dispatch(fetchAlertGroupsAction(alertManagerSourceName));
      }
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, NOTIFICATIONS_POLL_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, alertManagerSourceName]);

  const hasResults = filteredResults.length > 0;

  return (
    <CustomScrollbar autoHeightMax="100%" autoHeightMin="100%">
      {isAlertingEnabled && (
        <div>
          {hasResults &&
            filteredResults.map((group) => {
              return (
                <AlertGroup
                  alertManagerSourceName={alertManagerSourceName}
                  key={JSON.stringify(group.labels)}
                  group={group}
                  expandAll={expandAll}
                />
              );
            })}
          {!hasResults && 'No alerts'}
        </div>
      )}
    </CustomScrollbar>
  );
};
