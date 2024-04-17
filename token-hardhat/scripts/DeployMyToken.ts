import { formatEther } from "viem";
import { abi, bytecode } from "../artifacts/contracts/MyToken.sol/MyToken.json";
import { createClients } from "./helpers";

async function main() {
  const { deployer, publicClient } = createClients();

  // print the last block number
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);

  // print the deployer balance
  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log(
    "Deployer balance:",
    formatEther(balance),
    deployer.chain.nativeCurrency.symbol
  );

  //  use viem's deploycontract function to deploy
  console.log("\nDeploying MyToken contract");
  const hash = await deployer.deployContract({
    abi: abi,
    bytecode: bytecode as `0x${string}`,
  });

  // Get Contract Hash
  console.log("\nTransaction hash:", hash);
  console.log("Waiting for confirmations...");

  // Get Contract Address
  const txReceipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("\nMyToken contract deployed to:", txReceipt.contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
