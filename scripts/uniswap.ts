import { getContract, createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

import pk from '../.local/pk';

import json from '../ignition/deployments/chain-11155111/deployed_addresses.json';

import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { Token } from '@uniswap/sdk-core';

interface ExampleConfig {
    tokens: {
        in: Token;
        out: Token;
        poolFee: number;
    };
}

// 创建代币实例
const WETH_TOKEN = new Token(
    11155111,
    '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    18,
    'WETH',
    'Wrapped Ether',
);

const G_TOKEN = new Token(
    11155111,
    json['GeraltTokenModule#GeraltToken'],
    18,
    'GERALTTK',
    'GeraltToken',
);

export const CurrentConfig: ExampleConfig = {
    tokens: {
        in: G_TOKEN,
        out: WETH_TOKEN,
        poolFee: FeeAmount.MEDIUM,
    },
};

const currentPoolAddress = computePoolAddress({
    factoryAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
});

async function main() {
    const account = privateKeyToAccount(pk.account1);
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(),
    });

    const poolContract = getContract({
        address: currentPoolAddress as `0x${string}`,
        abi: IUniswapV3PoolABI.abi,
        client,
    });

    console.log(currentPoolAddress, poolContract.read);
}

// 调用main函数来执行脚本
main();
