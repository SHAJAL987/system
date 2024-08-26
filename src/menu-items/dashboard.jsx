// assets
import { DashboardOutlined } from '@ant-design/icons';
import { DatabaseOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  DatabaseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'application',
      title: 'Application',
      type: 'item',
      url: '/application',
      icon: icons.DatabaseOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
