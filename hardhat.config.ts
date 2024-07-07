import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';

import pk from './.local/pk.json';

const config: HardhatUserConfig = {
    solidity: '0.8.24',
    defaultNetwork: 'sepolia',
    networks: {
        sepolia: {
            url: 'https://sepolia.base.org',
            accounts: [
                pk.account1,
            ],
            chainId: 84532,
            gas: 'auto',
            gasPrice: 'auto',
        },
    },
};

export default config;
