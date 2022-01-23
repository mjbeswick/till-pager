import { FC } from 'react';
import { NotificationTitle } from './NotificationListItem';
import React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../components/Modal';
import { Button } from '../components/Button';
import { Notification } from '../views/Notifications';

interface NotificationActionModalProps {
  cancel: React.MouseEventHandler<HTMLButtonElement>;
  done: React.MouseEventHandler<HTMLButtonElement>;
  notification: Notification;
  show: boolean;
}
export const NotificationActionModal: FC<NotificationActionModalProps> = ({
  cancel,
  done,
  show,
  notification,
}) => {
  const content = NotificationTitle[notification.type];

  return (
    <Modal show={!!show}>
      <ModalHeader>Lane {notification.lane}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="blue" outline onClick={cancel}>
          Cancel
        </Button>
        <Button color="blue" onClick={done}>
          Done
        </Button>
      </ModalFooter>
    </Modal>
  );
};
