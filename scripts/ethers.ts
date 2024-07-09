import { task } from 'hardhat/config';
import pk from '../.local/pk';

import json from '../ignition/deployments/chain-11155111/deployed_addresses.json';
import { abi } from '../ignition/deployments/chain-11155111/artifacts/GeraltTokenModule#GeraltToken.json';

import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk';
import IUniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import IUniswapV3PoolAbi from './abi/IUniswapV3Pool';
import UniswapV3FactoryAbi from './abi/UniswapV3Factory';
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

    const CurrentConfig: ExampleConfig = {
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

    const wallet = new ethers.Wallet(pk.account1);
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8546');
    const signer = wallet.connect(provider);
    console.log(
        await signer.sendTransaction({
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            value: ethers.parseUnits('10', 'ether'),
        }),
    );
    // const gasPrice = ethers.parseUnits('40', 'gwei');
    // // const res = signer.sendTransaction({
    // //     to: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    // //     data: '0xa1671295000000000000000000000000fff9976782d46cc05630d1f6ebab18b2324d6b1400000000000000000000000035b38ea412a200fbaa56c209542323986c146aa10000000000000000000000000000000000000000000000000000000000000bb8',
    // //     from: '0x3398FB7a2B26299E931eDb7C067322920d352e99',
    // //     gasPrice,
    // // });
    // // console.log(res);
    // const contract = new ethers.Contract(
    //     '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    //     UniswapV3Factory.abi,
    //     signer,
    // );
    // console.log(
    //     await contract.createPool(
    //         '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    //         '0x35b38Ea412a200FbAa56c209542323986c146aa1',
    //         FeeAmount.MEDIUM,
    //         {
    //             gasPrice,
    //             gasLimit: 9000000,
    //         },
    //     ),
    // );
});
