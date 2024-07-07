import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const GeraltTokenModule = buildModule('GeraltTokenModule', m => {
    const initialSupply = m.getParameter('initialSupply', BigInt(10000 * 10 ** 18));

    const geralt = m.contract('GeraltToken', [initialSupply]);

    return { geralt };
});

export default GeraltTokenModule;
