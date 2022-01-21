import React, {
  FC,
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ViewBody, ViewFooter, ViewHeader } from '../components/Styled';
import { ToggleMute } from '../components/ToggleMute';
import { gunDB } from '../lib/gun';
import { useMute } from '../lib/state';
import { NotificationActionModal } from '../partials/NotificationActionModal';
import {
  NotificationItem,
  NotificationTitle,
  NotificationType,
} from '../partials/NotificationListItem';
import { PushToTalkButton } from '../partials/PushToTalkButton';

export interface Notification {
  id: string;
  lane: number;
  type: NotificationType;
  time: number;
  assignedTo: string;
}

export const Notifications: FC = () => {
  const [list, setList] = useState<{ [k: string]: Notification }>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const spokenRef = useRef<string[]>([]);
  const { isMuted } = useMute();

  useEffect(() => {
    gunDB.get('notifications').map((data: unknown, id) => {
      if (data) {
        const notification = data as Notification;
        const isNew = Date.now() - notification.time < 5000;

        console.log('new notification', notification, id);

        list[id] = notification as Notification;
        setList({ ...list });

        if (isNew && !spokenRef.current.includes(id)) {
          spokenRef.current.push(id);

          const utterance = new SpeechSynthesisUtterance();

          utterance.text = `Lane ${notification.lane}, ${
            NotificationTitle[`${notification.type}`]
          }`;

          speechSynthesis.speak(utterance);
        }
      } else {
        const index = spokenRef.current.indexOf(id);

        if (index > -1) {
          spokenRef.current.splice(index, 1);
        }

        if (list[id]) {
          delete list[id];
          setList({ ...list });
        }
      }
    });
  }, []);

  const [selectedModalItem, setSelectedModalItem] = useState(
    {} as Notification
  );

  useEffect(() => {
    if (selectedId) {
      setSelectedModalItem(list[selectedId]);
    }
  }, [selectedId]);

  const click = (id: string) => {
    const isCurrentlySelected = selectedId === id;

    setSelectedId(isCurrentlySelected ? null : id);

    if (!isCurrentlySelected) {
      gunDB
        .get('notifications')
        .get(id)
        .put({ assignedTo: (gunDB as any)._.opt.pid });
    }
  };

  const cancel: MouseEventHandler<HTMLButtonElement> = () => {
    gunDB
      .get('notifications')
      .get(selectedId!)
      .get('assignedTo')
      .put(null as any);

    setSelectedId(null);
  };

  const done: MouseEventHandler<HTMLButtonElement> = () => {
    gunDB
      .get('notifications')
      .get(selectedId!)
      .put(null as any);

    setSelectedId(null);
  };

  return (
    <Fragment>
      <NotificationActionModal
        notification={selectedModalItem}
        cancel={cancel}
        done={done}
        show={!!selectedId}
      />
      <ViewHeader>
        <span>Notifications</span>
        {selectedId}
        <ToggleMute muted={isMuted} />
      </ViewHeader>
      <ViewBody dark>
        {Object.entries(list).map(([id, notification]) => {
          const { lane, type, time, assignedTo } = notification;

          return (
            <NotificationItem
              key={id}
              lane={lane}
              type={type}
              time={time}
              onClick={click}
              selected={id === selectedId}
              disabled={!!assignedTo && assignedTo !== (gunDB as any)._.opt.pid}
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
