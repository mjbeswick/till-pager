import React, {
  FC,
  Fragment,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { ViewBody, ViewFooter, ViewHeader } from '../components/Styled';
import { ToggleMute } from '../components/ToggleMute';
import { gunDB } from '../lib/gun';
import { NotificationActionModal } from '../partials/NotificationActionModal';
import {
  NotificationListItem,
  NotificationTitle,
  NotificationType,
} from '../partials/NotificationListItem';
import { PushToTalkButton } from '../partials/PushToTalkButton';

export interface Notification {
  id: string;
  lane: number;
  type: NotificationType;
  time: number;
}

export const Notifications: FC = () => {
  const [list, setList] = useState<{ [k: string]: Notification }>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cancel: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedId(null);
  };

  const done: MouseEventHandler<HTMLButtonElement> = () => {
    gunDB
      .get('notifications')
      .get(selectedId!)
      .put(null as any);

    setSelectedId(null);
  };

  useEffect(() => {
    gunDB.get('notifications').map((notification, id) => {
      console.log(notification);

      if (notification) {
        console.log('new notification', notification, id);

        list[id] = notification;
        setList({ ...list });
      } else {
        console.log('notification already exists');

        delete list[id];
        setList({ ...list });
      }
    });
  }, []);

  const [selectedItem, setSelectedItem] = useState({} as Notification);

  useEffect(() => {
    if (selectedId) {
      setSelectedItem(list[selectedId]);
    }
  }, [selectedId]);

  return (
    <Fragment>
      <NotificationActionModal
        notification={selectedItem}
        cancel={cancel}
        done={done}
        show={!!selectedId}
      ></NotificationActionModal>
      <ViewHeader>
        <span>Notifications</span>
        {selectedId}
        <ToggleMute />
      </ViewHeader>
      <ViewBody dark>
        {Object.entries(list).map(([id, notification]) => {
          const { lane, type, time } = notification;

          return (
            <NotificationListItem
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
      <ViewFooter>
        <PushToTalkButton />
      </ViewFooter>
    </Fragment>
  );
};
