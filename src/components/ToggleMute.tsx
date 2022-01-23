import styled from '@emotion/styled';
import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import { VolumeMute } from '../icons/VolumeMute';
import { VolumeUp } from '../icons/VolumeUp';

interface ToggleMuteProps {
  muted: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const ToggleMuteContainer = styled.div`
  cursor: pointer;
`;

export const ToggleMute: FC<ToggleMuteProps> = ({ muted, onClick }) => {
  return (
    <ToggleMuteContainer onClick={onClick}>
      {muted ? <VolumeMute /> : <VolumeUp />}
    </ToggleMuteContainer>
  );
};
