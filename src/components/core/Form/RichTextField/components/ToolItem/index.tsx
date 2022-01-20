import { Button, Tooltip } from 'antd';
import React from 'react';

export const ToolItem: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  trigger?: string;
}> = (props) => {
  return (
    // <Tooltip placement="top" title={props.title} trigger={props.trigger}>
    <Button
      title={props.title}
      size='small'
      style={{ marginRight: 2, height: 26, lineHeight: '26px' }}
      icon={props.icon}
      onClick={props.onClick}
    />
    // </Tooltip>
  );
};
