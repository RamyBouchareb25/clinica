import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,

  },
  {
    title: 'patients',
    path: '/patients',
    icon: <IoIcons.IoMdPerson />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: 'Doctors',
    path: '/Doctors',
    icon: <IoIcons.IoMdPulse />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,


  },
  {
    title: 'Calendar',
    path: '/Calendar',
    icon: <IoIcons.IoMdCalendar />
  },
  {
    title: 'Dossiers Médicaux',
    path: '/MedicalRecords',
    icon: <IoIcons.IoMdFolder />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoMdSettings />
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <IoIcons.IoMdExit />
  }
];