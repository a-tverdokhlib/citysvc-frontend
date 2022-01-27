import {
  DashboardOutlined,
  EnvironmentOutlined, AppstoreOutlined, UserOutlined, BranchesOutlined, ScheduleOutlined, SettingOutlined, UnorderedListOutlined, CalendarOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'



const adminMenu = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: AppstoreOutlined,
  breadcrumb: true,
  submenu: []
},
{
  key: 'bookings',
  path: `${APP_PREFIX_PATH}/bookings`,
  title: 'sidenav.bookings',
  icon: ScheduleOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'bookings-list',
      path: `${APP_PREFIX_PATH}/bookings-list`,
      title: 'sidenav.bookings.list',
      icon: UnorderedListOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'bookings-map',
      path: `${APP_PREFIX_PATH}/bookings-map`,
      title: 'sidenav.bookings.map',
      icon: EnvironmentOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
},
{
  key: 'myroute',
  path: `${APP_PREFIX_PATH}/my-routes`,
  title: 'sidenav.routeMaker',
  icon: BranchesOutlined,
  breadcrumb: false,
  submenu: []
},
// {
//   key: 'calendar',
//   path: `${APP_PREFIX_PATH}/calendar`,
//   title: 'sidenav.calendar',
//   icon: CalendarOutlined,
//   breadcrumb: true,
//   submenu: []
// },
{
  key: 'accounts',
  path: `${APP_PREFIX_PATH}/accounts`,
  title: 'sidenav.accounts',
  icon: UserOutlined,
  breadcrumb: true,
  submenu: []
},
{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/settings`,
  title: 'sidenav.settings',
  icon: SettingOutlined,
  breadcrumb: true,
  submenu: []
}
]
const clientMenu = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: AppstoreOutlined,
  breadcrumb: true,
  submenu: []
},
{
  key: 'bookings',
  path: `${APP_PREFIX_PATH}/bookings-list`,
  title: 'sidenav.bookings',
  icon: ScheduleOutlined,
  breadcrumb: false,
  submenu: [
  ]
},

]

const navigationConfig = [
  ...adminMenu
]

export const navigationConfigClient = [...clientMenu];
export default navigationConfig;
