import styled from '@emotion/styled';
import React, {
  ChangeEventHandler,
  FC,
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ToggleMute } from '../components/ToggleMute';
import { NotificationTitle } from '../partials/NotificationListItem';
import { Select } from '../components/Select';
import { ViewBody, ViewFooter, ViewHeader } from '../components/Styled';
import { Button } from '../components/Button';
import { Notification } from './Notifications';
import { nanoid } from 'nanoid';
import { PushToTalkButton } from '../partials/PushToTalkButton';
import { gunDB } from '../lib/gun';

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

const laneOptions = Array(30)
  .fill(null)
  .reduce((o, x, i) => {
    i += 1;
    o[i] = 'Lane ' + i;
    return o;
  }, {});

export const Buttons: FC = () => {
  const [lane, setLane] = useState(1);
  const activeRef = useRef<{ [k: string]: Notification }>({});
  const { current: active } = activeRef;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const laneChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLane(parseInt(e.currentTarget.value));
  };

  useEffect(() => {
    gunDB.get('notifications').map((data: Notification, key: string) => {
      if (data?.lane === lane) {
        active[key] = data;
      } else if (active[key]) {
        delete active[key];
      }
      forceUpdate();
    });
  }, [lane]);

  const toggle = (lane: number, type: string, id?: string) => {
    if (id && active[id]) {
      const node = gunDB.get('notifications').get(id);

      (gunDB.get('notifications') as any).unset(node);

      gunDB
        .get(lane)
        .get(id)
        .put(null as any);
    } else {
      const id = nanoid();

      const node = gunDB.get(lane).get(id).put({
        id: nanoid(),
        time: Date.now(),
        lane,
        type,
      });

      gunDB.get('notifications').set(node);
    }
  };

  return (
    <Fragment>
      <ViewHeader>
        <span>Buttons</span>
        <ToggleMute />
      </ViewHeader>
      <ViewBody>
        <LaneContainer>
          <Select value={lane} onChange={laneChange} options={laneOptions} />
        </LaneContainer>
        <ButtonsContainer>
          {Object.entries(NotificationTitle).map(([type, value]) => {
            const [id] =
              Object.entries(active).find(([k, x]) => x.type === type) ?? [];
            return (
              <Button
                key={type}
                color="blue"
                outline={!id}
                onClick={() => toggle(lane, type, id)}
              >
                {value}
              </Button>
            );
          })}
        </ButtonsContainer>
      </ViewBody>
      <ViewFooter>
        <PushToTalkButton />
      </ViewFooter>
    </Fragment>
  );
};
