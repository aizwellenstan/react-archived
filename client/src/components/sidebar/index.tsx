import React, { useState, useCallback } from 'react';
import { styled } from 'client/src/styles';
import { sidebarWidth } from 'client/src/styles/constants';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import StorageIcon from '@material-ui/icons/Storage';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarContainer from './sidebarcontainer';

export interface SidebarProps {
  events: Event[];
}

interface WrapperProps {
  expanded: boolean;
}

const Wrapper = styled.aside<WrapperProps>`
  display: block;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: ${({ expanded }) => (expanded ? '100%' : '20%')};
  padding: 18px;
  overflow: scroll;
  transition: 0.3s ease-out;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({ theme }) => theme.backgroundDark};
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 -1.5px 3px rgba(0, 0, 0, 0.16);

  @media screen and (min-width: 700px) {
    display: block;
    z-index: auto;
    top: 0;
    left: 0;
    width: ${sidebarWidth}px;
    height: auto;
    border-radius: 0;
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
  }
`;

const ExpandButton = styled.button`
  display: block;
  width: 100%;
  margin-top: -8px;
  padding: 8px 0 12px;
  border: none;
  background-color: transparent;

  hr {
    display: block;
    width: 100px;
    height: 5px;
    margin: auto;
    border: none;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.foregroundLight};
  }

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Sidebar = () => {
  const [expanded, changeIfExpanded] = useState(false);

  const toggleIfExpanded = useCallback(() => changeIfExpanded(!expanded), [
    expanded,
  ]);

  function onClick(e: Error, item: any) {
    localStorage.setItem('pageNow', item.name);
    window.location.reload();
  }

  const items = [
    {
      name: 'managealarm',
      label: 'Manage Alarm',
      Icon: NotificationsIcon,
      items: [
        { name: 'AlarmList', label: 'Alarm List', onClick },
        { name: 'AlarmHistory', label: 'Alarm History', onClick },
        { name: 'AlarmSetting', label: 'Alarm Setting', onClick },
      ],
    },
    'divider',
    {
      name: 'pointcontrol',
      label: 'Point Control',
      Icon: StorageIcon,
      items: [
        {
          name: 'colddata',
          label: 'Cold Data',
          items: [
            { name: 'CreateCold', label: 'Create', onClick },
            { name: 'UpdateCold', label: 'Update', onClick },
            { name: 'QueryCold', label: 'Query', onClick },
            { name: 'DeleteCold', label: 'Delete', onClick },
          ],
        },
        { name: 'Schedule', label: 'Schedule', onClick },
      ],
    },
    'divider',
    {
      name: 'Assets',
      label: 'Manage Asset',
      Icon: WebAssetIcon,
      onClick,
    },
    'divider',
    {
      name: 'ManageEquip',
      label: 'Manage Equipment',
      Icon: WebAssetIcon,
      items: [
        { name: 'EquipList', label: 'Equipment List', onClick },
        { name: 'Maintance', label: 'Maintaince Record', onClick },
        { name: 'Notification', label: 'Notification', onClick },
        { name: 'Report', label: 'Report', onClick },
      ],
    },
    'divider',
    {
      name: 'manageaccount',
      label: 'Manage Account',
      Icon: SupervisorAccountIcon,
      items: [
        { name: 'CreateAccount', label: 'Create', onClick },
        { name: 'UpdateAccount', label: 'Update', onClick },
        { name: 'QueryAccount', label: 'Query', onClick },
        { name: 'DeleteAccount', label: 'Delete', onClick },
      ],
    },
    'divider',
    {
      name: 'settings',
      label: 'Settings',
      Icon: SettingsIcon,
      items: [
        { name: 'ModulePermission', label: 'ModulePermission', onClick },
      ]
    },
  ];

  return (
    <Wrapper id="sidebar" expanded={expanded} aria-expanded={expanded}>
      <ExpandButton aria-controls="sidebar" onClick={toggleIfExpanded}>
        <hr />
      </ExpandButton>

      <SidebarContainer items={items} />
    </Wrapper>
  );
};
