import { getContract, createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import type { GetContractReturnType } from '@nomicfoundation/hardhat-viem/types';

import pk from '../.local/pk';

import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk';
import IUniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import IUniswapV3PoolAbi from './abi/IUniswapV3Pool';
import UniswapV3FactoryAbi from './abi/UniswapV3Factory';
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
    '0x35b38Ea412a200FbAa56c209542323986c146aa1',
    18,
    'GERALTTK',
    'GeraltToken',
);

export const CurrentConfig: ExampleConfig = {
    tokens: {
        in: WETH_TOKEN,
        out: G_TOKEN,
        poolFee: FeeAmount.MEDIUM,
    },
};

const currentPoolAddress = computePoolAddress({
    factoryAddress: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
});

async function createPool() {
    const account = privateKeyToAccount(pk.account1);
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(),
    });

    const contract = getContract({
        address: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
        abi: UniswapV3Factory.abi,
        client,
    }) as unknown as GetContractReturnType<typeof UniswapV3FactoryAbi>;

    console.log(
        await contract.write.createPool(
            [
                '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
                '0x35b38Ea412a200FbAa56c209542323986c146aa1',
                FeeAmount.MEDIUM,
            ],
        ),
    );
}

async function main() {
    const account = privateKeyToAccount(pk.account1);
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(),
    });

    const poolContract = getContract({
        address: currentPoolAddress as `0x${string}`,
        abi: IUniswapV3Pool.abi,
        client,
    }) as unknown as GetContractReturnType<typeof IUniswapV3PoolAbi>;

    console.log(
        // currentPoolAddress,
        await poolContract.read.token0(),
        // await (poolContract.read as any).token1(),
    );
}
// createPool().catch(e => console.log(e));
console.log(currentPoolAddress);
// 调用main函数来执行脚本
// main();
