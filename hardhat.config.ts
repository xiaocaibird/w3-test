import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';

import pk from './.local/pk';

const config: HardhatUserConfig = {
    solidity: '0.8.24',
    defaultNetwork: 'sepolia',
    networks: {
        sepolia: {
            url: 'https://rpc.sepolia.org',
            accounts: [
                pk.account1,
            ],
            chainId: 11155111,
            gas: 'auto',
            gasPrice: 'auto',
        },
    },
};

export default config;
