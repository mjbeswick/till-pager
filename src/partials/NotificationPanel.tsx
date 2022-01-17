import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { TimePast } from '../components/TimePast';
import { Color } from '../constants';

export const NotificationType: Record<string, string> = {
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
  /* justify-content: space-between; */
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.25rem;
  column-gap: 0.25rem;
  background: ${Color.white};
  /* background: ${Color.body}; */
  background: ${({ selected }) => (selected ? Color.blue : Color.white)};
  color: ${({ selected }) => (selected ? Color.white : Color.body)};
`;

const Lane = styled.div<{ selected?: boolean }>`
  width: 3rem;
  text-align: center;
  padding: 0;
  line-height: 3rem;
  background: rgba(0, 0, 0, 0.1);
`;

const Time = styled.div`
  text-align: center;
  padding: 0 0.5rem;
  font-variant-numeric: tabular-nums;
  min-width: 2.5rem;
`;

const Title = styled.div`
  text-align: center;
  flex-grow: 1;
`;

interface NotificationProps {
  id: string;
  lane: number;
  type: keyof typeof NotificationType;
  time: number;
  onSelect: (id: string | null) => void;
  selected: boolean;
}

export const NotificationPanel: FC<NotificationProps> = ({
  id,
  lane,
  type,
  time,
  onSelect,
  selected,
}) => {
  const title = NotificationType[type as keyof typeof NotificationType];

  const toggle: React.MouseEventHandler<HTMLElement> = (el) => {
    el.preventDefault();

    onSelect(selected ? null : id);
  };

  return (
    <NotificationContainer onClick={toggle} selected={selected}>
      <Lane>{lane}</Lane>
      <Title>{title}</Title>
      <Time>
        <TimePast time={time} updateSeconds={5} />
      </Time>
    </NotificationContainer>
  );
};
