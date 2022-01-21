import styled from '@emotion/styled';
import React, {
  FC,
  Fragment,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
} from 'react';
import { Modal, ModalBody } from '../components/Modal';
import { Spinner } from '../components/Spinner';
import { Color } from '../constants';
import { Microphone } from '../icons/Microphone';
import MicRecorder from 'mic-recorder-to-mp3';
import { gunDB } from '../lib/gun';
import { nanoid } from 'nanoid';
import { useDebouncedCallback } from 'use-debounce';
import { Speaker } from '../components/Speaker';

const recorder = new MicRecorder({
  bitRate: 64,
});

const TalkButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? Color.green : Color.midGrey)};
  color: ${({ active }) => (active ? Color.white : Color.darkGrey)};
  fill: ${({ active }) => (active ? Color.white : Color.darkGrey)};
  flex-grow: 1;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  z-index: 100;
`;

export const PushToTalkButton: FC = () => {
  const [isTalking, setIsTalking] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [playInfo, setPlayInfo] = React.useState<{ user: string } | null>(null);
  const isPlaying = !!playInfo;
  const maxRecordTimeout = useRef<any>();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    gunDB
      .get('audio')
      .map()
      .on((data: unknown, key: string) => {
        if (data) {
          console.log('audio received', key);
          const { audio, time, user } = data as {
            audio: any;
            time: number;
            user: string;
          };

          const isNew = Date.now() - time < 5000;
          const isRemote = user !== (gunDB as any)._.opt.pid;

          if (isRemote && isNew) {
            console.log('playing remote audio');
            var snd = new Audio(audio);

            snd.onplay = () => {
              console.log('playing');
              setPlayInfo({ user });
            };

            snd.onended = () => {
              console.log('audio ended');
              setPlayInfo(null);
            };

            snd.play();
          } else if (!isNew) {
            gunDB
              .get('audio')
              .get(key)
              .put(null as any);
          }
        }
      });
  }, []);

  useEffect(() => {
    recorder.stop();

    if (isTalking) {
      recorder
        .start()
        .then(() => {
          console.log('started recording');
          setIsRecording(true);
        })
        .catch((e: any) => {
          setIsRecording(false);

          console.error(e);
        });
    } else if (isRecording) {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]: any) => {
          console.log('stopped recording');

          var reader = new FileReader();
          reader.addEventListener('loadend', (e) => {
            gunDB
              .get('audio')
              .get(nanoid())
              .put({
                audio: null,
                time: Date.now(),
                user: (gunDB as any)._.opt.pid,
              })
              .get('audio')
              .put(e.target!.result as any, (ack) => {
                // alert(JSON.stringify(ack));
              });
          });
          reader.readAsDataURL(blob);
        })
        .catch((e: any) => {
          alert('We could not retrieve your message');
          console.log(e);
        })
        .finally(() => {
          setIsRecording(false);
        });
    }

    return () => recorder.stop();
  }, [isTalking]);

  const start = useDebouncedCallback(() => {
    clearTimeout(maxRecordTimeout.current);

    setIsTalking(true);

    maxRecordTimeout.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setIsTalking(false);
    }, 30000);
  }, 250);

  const stop = useDebouncedCallback(() => {
    clearTimeout(maxRecordTimeout.current);

    const stopTimeoutMs = Date.now() - startTimeRef.current < 1000 ? 1000 : 0;

    setTimeout(() => {
      setIsTalking(false);
    }, stopTimeoutMs);
  }, 500);

  return (
    <Fragment>
      <Modal show={isTalking} style={{ width: 200 }}>
        <ModalBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 100,
          }}
        >
          <Spinner />
          Recording
        </ModalBody>
      </Modal>

      <Modal show={isPlaying} style={{ width: 200 }}>
        <ModalBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 100,
          }}
        >
          <Speaker />
          Message from {playInfo?.user}
        </ModalBody>
      </Modal>

      <TalkButton
        onContextMenu={(e) => e.preventDefault()}
        active={isTalking}
        onMouseDown={start}
        onMouseUp={stop}
        onTouchStart={start}
        onTouchEnd={stop}
      >
        <Microphone />
        &nbsp;Push to talk
      </TalkButton>
    </Fragment>
  );
};
