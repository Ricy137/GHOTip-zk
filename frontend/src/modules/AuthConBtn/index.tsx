'use client';
import { ReactNode } from 'react';
import { ConnectKitButton } from 'connectkit';
import Button from '@/components/Button';

const AuthConBtn: React.FC<{
  children: ReactNode;
  color: 'purple' | 'green';
}> = ({ children, color }) => {
  return (
    <ConnectKitButton.Custom>
      {({ show, address }) => {
        if (address) return <>{children}</>;
        return (
          <Button fullWidth size="large" color={color} onClick={show}>
            Connect
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default AuthConBtn;
