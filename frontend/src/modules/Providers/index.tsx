'use client';
import { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { WagmiConfig, createConfig } from 'wagmi';
import { sepolia } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

export const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,
    appName: 'GHOTip',
    autoConnect: false,
    chains: [sepolia],
  })
);

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </JotaiProvider>
  );
};

export default Providers;
