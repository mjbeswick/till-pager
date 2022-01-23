import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { TimePast } from '../components/TimePast';
import { Color } from '../constants';

export type NotificationType =
  | 'packing'
  | 'change'
  | 'security'
  | 'price'
  | 'product'
  | 'bags'
  | 'cleanup'
  | 'supervisor';

export const NotificationTitle: Record<NotificationType, string> = {
  packing: 'Packing Assistance',
  change: 'Change low',
  security: 'Security',
  price: 'Price Check',
  product: 'Item requested',
  bags: 'Bags low',
  cleanup: 'Cleanup',
  supervisor: 'Supervisor',
};

export type NotificationColor = 'default' | 'danger' | 'warning';

interface GetColorProps {
  selected?: boolean;
  color?: NotificationColor;
  disabled?: boolean;
}

const getColor = () => (props: GetColorProps) => {
  const { selected = false, color = 'default' } = props;

  if (selected) {
    return Color.white;
  }

  return Color.body;
};

const NotificationContainer = styled.div<{
  selected?: boolean;
  color?: NotificationColor;
  disabled?: boolean;
}>`
  flex-direction: row;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin: 0.25rem; */
  column-gap: 0.25rem;
  background: ${Color.white};
  background: ${({ selected = false, disabled = false }) => {
    return disabled ? Color.midGrey : selected ? Color.blue : Color.white;
  }};
  color: ${({ selected = false }) => (selected ? Color.white : Color.body)};
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  overflow: hidden;
  border-bottom: 1px solid ${Color.midGrey};
  user-select: none;
`;

const getLaneColor = () => (props: GetColorProps) => {
  const { selected = false, color = 'default', disabled = false } = props;

  if (selected) {
    return 'rgba(255, 255, 255, 0.1)';
  }

  if (disabled) {
    return 'rgba(0, 0, 0, 0.1)';
  }

  switch (color) {
    case 'default':
      return Color.lightBlue;
    case 'danger':
      return Color.lightRed;
    case 'warning':
      return Color.lightYellow;
  }
};

const Lane = styled.div<{
  selected?: boolean;
  color: NotificationColor;
  disabled?: boolean;
}>`
  width: 3rem;
  text-align: center;
  padding: 0;
  line-height: 3rem;
  background: ${getLaneColor()};
  border-radius: 100px;
  margin: 5px;
`;

const Time = styled.div`
  text-align: center;
  padding: 0 1rem;
  font-variant-numeric: tabular-nums;
  min-width: 2.5rem;
`;

const Title = styled.div`
  text-align: center;
  flex-grow: 1;
`;

interface NotificationListItemProps {
  id: string;
  lane: number;
  type: keyof typeof NotificationTitle;
  time: number;
  onClick: (id: string) => void;
  selected: boolean;
  disabled?: boolean;
}

export const NotificationItem: FC<NotificationListItemProps> = ({
  id,
  lane,
  type,
  time,
  onClick,
  selected,
  disabled,
}) => {
  const title = NotificationTitle[type];

  let color: NotificationColor;

  switch (type) {
    case 'security':
      color = 'danger';
      break;
    case 'supervisor':
    case 'cleanup':
      color = 'warning';
      break;
    default:
      color = 'default';
  }

  const toggle: React.MouseEventHandler<HTMLElement> = (el) => {
    el.preventDefault();

    if (disabled) {
      return;
    }

    onClick(id);
  };

  return (
    <NotificationContainer
      onClick={toggle}
      selected={selected}
      color={color}
      disabled={disabled}
    >
      <Lane selected={selected} color={color} disabled={disabled}>
        {lane}
      </Lane>
      <Title>{title}</Title>
      <Time>
        <TimePast time={time} />
      </Time>
    </NotificationContainer>
  );
};
