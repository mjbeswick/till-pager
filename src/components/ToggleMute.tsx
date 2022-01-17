import React, { FC, useEffect, useState } from 'react';
import { VolumeMute } from '../icons/VolumeMute';
import { VolumeUp } from '../icons/VolumeUp';

interface ToggleMuteProps {
  muteState?: boolean;
}

export const ToggleMute: FC<ToggleMuteProps> = ({ muteState = true }) => {
  const [mute, setMute] = useState(muteState);

  // useEffect(() => {
  //   const message = mute ? 'Mute on' : 'Mute off';
  //   var utterance = new SpeechSynthesisUtterance(message);
  //   speechSynthesis.speak(utterance);
  // }, [mute]);

  const toggle = () => {
    setMute(!mute);
  };

  return mute ? <VolumeMute onClick={toggle} /> : <VolumeUp onClick={toggle} />;
};
