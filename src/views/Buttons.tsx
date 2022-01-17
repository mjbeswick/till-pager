import styled from '@emotion/styled';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ViewBody, ViewFooter, ViewHeader } from '../components/Styled';
import { ToggleMute } from '../components/ToggleMute';
import { NotificationType } from '../partials/NotificationPanel';
import { notificationsNode } from '../App';
import { Select } from '../components/Select';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  font-size: 1.5rem;
`;

const LaneContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  font-size: 1.5rem;
`;

interface NotificationTypeButtonProps {
  type: keyof typeof NotificationType;
  text: string;
  lane: number;
}

const NotificationTypeButton: FC<NotificationTypeButtonProps> = ({
  lane,
  type,
  text,
}) => {
  const [active, setActive] = useState(false);

  const addNotification = (
    lane: number,
    type: keyof typeof NotificationType
  ) => {
    notificationsNode.get(lane + '-' + type).put({
      time: Date.now(),
      lane,
      type,
    });
  };

  const removeNotification = (
    lane: number,
    type: keyof typeof NotificationType
  ) => {
    notificationsNode.get(lane + '-' + type).put(null as any);
  };

  const toggle = (lane: number, type: keyof typeof NotificationType) => {
    if (active) {
      removeNotification(lane, type);
    } else {
      addNotification(lane, type);
    }
  };

  useEffect(() => {
    notificationsNode.get(lane + '-' + type).on((data, key) => {
      if (data) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, [lane]);

  return (
    <Button color="blue" outline={!active} onClick={() => toggle(lane, type)}>
      {text}
    </Button>
  );
};

export const Buttons: FC = () => {
  const [lane, setLane] = useState(0);

  return (
    <Fragment>
      <ViewHeader>
        <span>Buttons</span>
        <ToggleMute />
      </ViewHeader>
      <ViewBody>
        <LaneContainer>
          <Select
            value={lane}
            onChange={(e) => setLane(parseInt(e.currentTarget.value))}
            options={Array(10)
              .fill(null)
              .reduce((o, x, i) => {
                i++;
                o[i] = 'Lane ' + i;
                return o;
              }, {})}
          />
        </LaneContainer>
        <ButtonsContainer>
          {Object.entries(NotificationType).map(([key, value]) => (
            <NotificationTypeButton
              key={key}
              text={value}
              type={key}
              lane={lane}
            />
          ))}
        </ButtonsContainer>
      </ViewBody>
    </Fragment>
  );
};
