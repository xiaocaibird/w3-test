import { task } from 'hardhat/config';
import pk from '../.local/pk';

import json from '../ignition/deployments/chain-11155111/deployed_addresses.json';
import { abi } from '../ignition/deployments/chain-11155111/artifacts/GeraltTokenModule#GeraltToken.json';

import {
    FeeAmount,
    computePoolAddress,
    FACTORY_ADDRESS,
} from '@uniswap/v3-sdk';
import IUniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import IUniswapV3PoolAbi from './abi/IUniswapV3Pool';
import UniswapV3FactoryAbi from './abi/UniswapV3Factory';
import wethabi from './abi/weth';
import { Token } from '@uniswap/sdk-core';

task('test111', 'Prints the current block number', async (_, { ethers }) => {
    interface ExampleConfig {
        tokens: {
            in: Token;
            out: Token;
            poolFee: number;
        };
    }

    // 创建代币实例
    const WETH_TOKEN = new Token(
        31337,
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        18,
        'WETH',
        'Wrapped Ether',
    );

    const G_TOKEN = new Token(
        31337,
        '0x00B0517de6b2b09aBD3a7B69d66D85eFdb2c7d94',
        18,
        'GERALTTK',
        'GeraltToken',
    );

    const CurrentConfig: ExampleConfig = {
        tokens: {
            in: WETH_TOKEN,
            out: G_TOKEN,
            poolFee: FeeAmount.MEDIUM,
        },
    };

    const currentPoolAddress = computePoolAddress({
        factoryAddress: FACTORY_ADDRESS,
        tokenA: CurrentConfig.tokens.in,
        tokenB: CurrentConfig.tokens.out,
        fee: CurrentConfig.tokens.poolFee,
    });

    const wallet = new ethers.Wallet(pk.account1);
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
    const signer = wallet.connect(provider);

    // const contract = new ethers.Contract(
    //     '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    //     wethabi,
    //     signer,
    // );
    // console.log(
    //     await contract.deposit({ value: ethers.parseUnits('100', 'ether') }),
    // );
    // console.log(
    //     await signer.sendTransaction({
    //         to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    //         from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    //         value: ethers.parseUnits('1000', 'ether'),
    //     }),
    // );
    // console.log(await provider.getBalance('0x70997970C51812dc3A010C7d01b50e0d17dc79C8'));
    // const gasPrice = ethers.parseUnits('40', 'gwei');
    // const res = signer.sendTransaction({
    //     to: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    //     data: '0xa1671295000000000000000000000000fff9976782d46cc05630d1f6ebab18b2324d6b1400000000000000000000000035b38ea412a200fbaa56c209542323986c146aa10000000000000000000000000000000000000000000000000000000000000bb8',
    //     from: '0x3398FB7a2B26299E931eDb7C067322920d352e99',
    //     gasPrice,
    // });
    // console.log(res);
    const contract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolAbi,
        signer,
    );
    console.log(await contract.token0());
});
