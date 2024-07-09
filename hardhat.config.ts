import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-ethers';

import pk from './.local/pk';

import './scripts/ethers';

const config: HardhatUserConfig = {
    solidity: '0.8.24',
    defaultNetwork: 'local',
    networks: {
        local: {
            url: 'http://127.0.0.1:8546',
            accounts: [pk.account1],
            chainId: 1,
            gas: 'auto',
            gasPrice: 'auto',
        },
    },
};

export default config;
