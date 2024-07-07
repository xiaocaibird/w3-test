import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const GeraltTokenModule = buildModule('GeraltTokenModule', m => {
    const initialSupply = m.getParameter('initialSupply', BigInt(10000 * 10 ** 18));

    const geraltToken = m.contract('GeraltToken', [initialSupply]);

    return { geraltToken };
});

export default GeraltTokenModule;
