import { useMemo } from 'react';

import { labelsMatchMatchers } from 'features/alerting/unified/utils/alertmanager';
import { AlertmanagerGroup, Matcher } from 'plugins/datasource/alertmanager/types';

export const useFilteredGroups = (groups: AlertmanagerGroup[], matchers: Matcher[]): AlertmanagerGroup[] => {
  return useMemo(() => {
    return groups.filter((group) => {
      return (
        labelsMatchMatchers(group.labels, matchers) ||
        group.alerts.some((alert) => labelsMatchMatchers(alert.labels, matchers))
      );
    });
  }, [groups, matchers]);
};
