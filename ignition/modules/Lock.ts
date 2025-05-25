// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenTreasure2025Module = buildModule("TokenTreasure2025Module", (m) => {
  const tokenModule = m.contract("TokenTreasure2025");
  return { tokenModule };
});

export default TokenTreasure2025Module;
