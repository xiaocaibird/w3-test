import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { parseEther } from 'viem';

// const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = parseEther('0.00001');

const LockModule = buildModule('LockModule', m => {
    // const unlockTime = m.getParameter('unlockTime', JAN_1ST_2030);
    const lockedAmount = m.getParameter('lockedAmount', ONE_GWEI);

    const lock = m.contract('Lock', [], {
        value: lockedAmount,
    });

    return { lock };
});

export default LockModule;
