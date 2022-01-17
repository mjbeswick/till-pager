import React, { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import { gun, notificationsNode } from '../App';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { ViewBody, ViewHeader } from '../components/Styled';
import { ToggleMute } from '../components/ToggleMute';
import {
  NotificationPanel,
  NotificationType,
} from '../partials/NotificationPanel';

interface Notification {
  id: string;
  lane: number;
  type: keyof typeof NotificationType;
  time: number;
}

const notificationTypes = [
  'packing',
  'change',
  'security',
  'price',
  'product',
  'bags',
  'cleanup',
  'supervisor',
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cancel: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedId(null);
  };

  const done: MouseEventHandler<HTMLButtonElement> = () => {
    notificationsNode.get(selectedId!).put(null as any);
    // setNotifications(notifications.filter((x) => x.id !== selected));
    setSelectedId(null);
  };

  useEffect(() => {
    let notificationsUpdated: Notification[] = [];

    notificationsNode.map((notification, id) => {
      console.log(notification, id);

      notificationsUpdated = notificationsUpdated.filter((x) => {
        return x.id !== id;
      });

      if (notification) {
        notificationsUpdated.push({
          id: notification.lane + '-' + notification.type,
          lane: notification.lane,
          type: notification.type,
          time: notification.time,
        });

        // const title = NotificationType[notification.type];
        // const message = `Lane ${notification.lane}, ${title}`;
        // var utterance = new SpeechSynthesisUtterance(message);
        // speechSynthesis.speak(utterance);
      }

      notificationsUpdated.sort((a, b) => a.time - b.time);

      setNotifications(notificationsUpdated);
    });
  }, []);

  return (
    <Fragment>
      <Modal show={!!selectedId}>
        <Button color="blue" outline onClick={cancel}>
          Cancel
        </Button>
        <Button color="blue" onClick={done}>
          Done
        </Button>
      </Modal>
      <ViewHeader>
        <span>Notifications</span>
        {selectedId}
        <ToggleMute />
      </ViewHeader>
      <ViewBody dark>
        {notifications.map(({ id, lane, type, time }) => {
          return (
            <NotificationPanel
              key={id}
              lane={lane}
              type={type}
              time={time}
              onSelect={setSelectedId}
              selected={id === selectedId}
              id={id}
            />
          );
        })}
      </ViewBody>
    </Fragment>
  );
};
