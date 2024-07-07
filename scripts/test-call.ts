import { getContract, createWalletClient, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import type { GetContractReturnType } from '@nomicfoundation/hardhat-viem/types';

import pk from '../.local/pk';

import { abi } from '../ignition/deployments/chain-11155111/artifacts/GeraltTokenModule#GeraltToken.json';
import json from '../ignition/deployments/chain-11155111/deployed_addresses.json';
import { GeraltToken$Type } from '../artifacts/contracts/GeraltToken.sol/GeraltToken';

async function main() {
    const account = privateKeyToAccount(pk.account1);
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(),
    });

    const contract = getContract({
        address: json['GeraltTokenModule#GeraltToken'] as `0x${string}`,
        abi,
        client,
    }) as unknown as GetContractReturnType<GeraltToken$Type['abi']>;

    console.log(await contract.write.mint([BigInt(5 * 10 ** 18)]));
}

// 调用main函数来执行脚本
main();
