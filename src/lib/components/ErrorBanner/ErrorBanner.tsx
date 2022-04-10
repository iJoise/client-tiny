import React from 'react';
import { Alert } from 'antd';

interface ErrorBannerProps {
  message?: string;
  description?: string;
}

const defMessage = 'Uh oh! Something went wrong :(';
const defDescr =
  'Look like something went wrong. Please check your connection and/or try again later.';

export const ErrorBanner = ({
  message = defMessage,
  description = defDescr,
}: ErrorBannerProps) => (
  <Alert
    banner
    closable
    message={message}
    description={description}
    type="error"
    className="error-banner"
  />
);
