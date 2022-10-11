import React from 'react';

import { Permissions } from 'core/components/AccessControl';
import { Page } from 'core/components/PageNew/Page';
import { contextSrv } from 'core/core';
import { AccessControlAction } from 'types';

import { SettingsPageProps } from '../DashboardSettings/types';

export const AccessControlDashboardPermissions = ({ dashboard, sectionNav }: SettingsPageProps) => {
  const canSetPermissions = contextSrv.hasPermission(AccessControlAction.DashboardsPermissionsWrite);

  return (
    <Page navModel={sectionNav}>
      <Permissions resource={'dashboards'} resourceId={dashboard.uid} canSetPermissions={canSetPermissions} />
    </Page>
  );
};
