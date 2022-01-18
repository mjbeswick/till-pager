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
  change: 'Change',
  security: 'Security',
  price: 'Price Check',
  product: 'Product Request',
  bags: 'Bags',
  cleanup: 'Cleanup',
  supervisor: 'Supervisor',
};

const NotificationContainer = styled.div<{ selected?: boolean }>`
  flex-direction: row;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin: 0.25rem; */
  column-gap: 0.25rem;
  background: ${Color.white};
  background: ${({ selected }) => (selected ? Color.blue : Color.white)};
  color: ${({ selected }) => (selected ? Color.white : Color.body)};
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid ${Color.midGrey};
`;

const Lane = styled.div<{ selected?: boolean }>`
  width: 3rem;
  text-align: center;
  padding: 0;
  line-height: 3rem;
  background: ${({ selected }) =>
    selected ? 'rgba(255, 255, 255, 0.1)' : Color.lightBlue};
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
  onSelect: (id: string | null) => void;
  selected: boolean;
}

export const NotificationListItem: FC<NotificationListItemProps> = ({
  id,
  lane,
  type,
  time,
  onSelect,
  selected,
}) => {
  const title = NotificationTitle[type];

  const toggle: React.MouseEventHandler<HTMLElement> = (el) => {
    el.preventDefault();

    onSelect(selected ? null : id);
  };

  return (
    <NotificationContainer onClick={toggle} selected={selected}>
      <Lane selected={selected}>{lane}</Lane>
      <Title>{title}</Title>
      <Time>
        <TimePast time={time} />
      </Time>
    </NotificationContainer>
  );
};
