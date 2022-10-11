import { AnyAction, combineReducers } from 'redux';

import sharedReducers from 'core/reducers';
import ldapReducers from 'features/admin/state/reducers';
import alertingReducers from 'features/alerting/state/reducers';
import apiKeysReducers from 'features/api-keys/state/reducers';
import { publicDashboardApi } from 'features/dashboard/api/publicDashboardApi';
import panelEditorReducers from 'features/dashboard/components/PanelEditor/state/reducers';
import dashboardReducers from 'features/dashboard/state/reducers';
import dataSourcesReducers from 'features/datasources/state/reducers';
import exploreReducers from 'features/explore/state/main';
import foldersReducers from 'features/folders/state/reducers';
import invitesReducers from 'features/invites/state/reducers';
import importDashboardReducers from 'features/manage-dashboards/state/reducers';
import organizationReducers from 'features/org/state/reducers';
import panelsReducers from 'features/panel/state/reducers';
import { reducer as pluginsReducer } from 'features/plugins/admin/state/reducer';
import userReducers from 'features/profile/state/reducers';
import searchQueryReducer from 'features/search/reducers/searchQueryReducer';
import serviceAccountsReducer from 'features/serviceaccounts/state/reducers';
import teamsReducers from 'features/teams/state/reducers';
import usersReducers from 'features/users/state/reducers';
import templatingReducers from 'features/variables/state/keyedVariablesReducer';

import { alertingApi } from '../../features/alerting/unified/api/alertingApi';
import { cleanUpAction } from '../actions/cleanUp';

const rootReducers = {
  ...sharedReducers,
  ...alertingReducers,
  ...teamsReducers,
  ...apiKeysReducers,
  ...foldersReducers,
  ...dashboardReducers,
  ...exploreReducers,
  ...dataSourcesReducers,
  ...usersReducers,
  ...serviceAccountsReducer,
  ...userReducers,
  ...invitesReducers,
  ...organizationReducers,
  ...ldapReducers,
  ...importDashboardReducers,
  ...panelEditorReducers,
  ...panelsReducers,
  ...templatingReducers,
  ...searchQueryReducer,
  plugins: pluginsReducer,
  [alertingApi.reducerPath]: alertingApi.reducer,
  [publicDashboardApi.reducerPath]: publicDashboardApi.reducer,
};

const addedReducers = {};

export const addReducer = (newReducers: any) => {
  Object.assign(addedReducers, newReducers);
};

export const createRootReducer = () => {
  const appReducer = combineReducers({
    ...rootReducers,
    ...addedReducers,
  });

  return (state: any, action: AnyAction) => {
    if (action.type !== cleanUpAction.type) {
      return appReducer(state, action);
    }

    const { cleanupAction } = action.payload;
    cleanupAction(state);

    return appReducer(state, action);
  };
};
