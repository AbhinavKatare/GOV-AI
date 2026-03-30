import React from 'react';

const ScreenPortal = ({ children, variant = 'default' }) => {
  const stageClass = ['device-stage', variant ? `device-stage--${variant}` : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={stageClass}>
      <div className="device-shell" data-variant={variant}>
        <div className="device-notch" aria-hidden />
        <div className="device-content">{children}</div>
        <div className="device-home-indicator" aria-hidden />
      </div>
      <div className="device-shadow" aria-hidden />
    </div>
  );
};

export default ScreenPortal;
