import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-ethers';

import pk from './.local/pk';

import './scripts/ethers';

const config: HardhatUserConfig = {
    solidity: '0.8.24',
};

export default config;
