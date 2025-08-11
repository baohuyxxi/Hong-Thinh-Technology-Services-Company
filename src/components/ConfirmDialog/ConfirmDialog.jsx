import './ConfirmDialog.scss';
import React from 'react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog__content">
        <h2 className="confirm-dialog__title">{title}</h2>
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button className="confirm-dialog__button confirm-dialog__button--confirm" onClick={onConfirm}>
            Xác nhận
          </button>
          <button className="confirm-dialog__button confirm-dialog__button--cancel" onClick={onCancel}>
            Trở lại
          </button>
        </div>
      </div>
    </div>
  );
}
