import React, { FC, useEffect, useState } from 'react';
import { VolumeMute } from '../icons/VolumeMute';
import { VolumeUp } from '../icons/VolumeUp';

interface ToggleMuteProps {
  muted?: boolean;
}

export const ToggleMute: FC<ToggleMuteProps> = ({
  muted: initialMuted = true,
}) => {
  const [mute, setMute] = useState(initialMuted);

  const toggle = () => {
    setMute(!mute);
  };

  return mute ? <VolumeMute onClick={toggle} /> : <VolumeUp onClick={toggle} />;
};
