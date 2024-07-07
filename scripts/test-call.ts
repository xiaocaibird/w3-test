import { getContract, createWalletClient, http, parseEther } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import type { GetContractReturnType } from '@nomicfoundation/hardhat-viem/types';

import pk from '../.local/pk';

import { abi } from './abi';
import { Lock$Type } from '../artifacts/contracts/Lock.sol/Lock';

async function main() {
    const account = privateKeyToAccount(
        pk.account1,
    );
    const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(),
    });

    const contract = getContract({
        address: '0x9C720e1D73D88D47913e72018867405872B16258',
        abi,
        client,
    }) as unknown as GetContractReturnType<Lock$Type['abi']>;

    console.log(await contract.write.withdraw());
}

// 调用main函数来执行脚本
main();
