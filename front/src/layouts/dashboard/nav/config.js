// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Рабочий стол',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Студенты',
    path: '/dashboard/students',
    icon: icon('ic_user'),
  },
  {
    title: 'Курсы',
    path: '/dashboard/courses',
    icon: icon('ic_cart'),
  },
  {
    title: 'Абонементы',
    path: '/dashboard/abonement',
    icon: icon('ic_blog'),
  },
  {
    title: 'Расписание занятий',
    path: '/schedules',
    icon: icon('ic_lock'),
  },
  {
    title: 'Расписание занятий1',
    path: '/schedules',
    icon: icon('ic_lock'),
  },
  {
    title: 'Расписание занятий2',
    path: '/schedules',
    icon: icon('ic_lock'),
  },
  {
    title: 'Расписание занятий3',
    path: '/schedules',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
