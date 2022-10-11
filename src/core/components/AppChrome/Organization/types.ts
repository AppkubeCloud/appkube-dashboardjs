import { SelectableValue } from '@grafana/data';
import { UserOrg } from 'types';

export interface OrganizationBaseProps {
  orgs: UserOrg[];
  onSelectChange: (option: SelectableValue<UserOrg>) => void;
}
