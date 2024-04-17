import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { toHex, hexToString, fromHex, parseEther } from "viem";

async function fixture() {
  const publicClient = await viem.getPublicClient();
  const [deployer, account1, account2] = await viem.getWalletClients();
  const myTokenContract = await viem.deployContract("MyToken", []);
  return {
    publicClient,
    deployer,
    account1,
    account2,
    myTokenContract,
  };
}

const expectedDeployerTokenAmount = 10000000000000000000n

describe("MyToken Contract", async () => {
  describe("When the MyToken Contract is Deployed", async () => {
    it("defines a contract with the MyToken name", async () => {
      const { myTokenContract } = await loadFixture(fixture);
      const tokenName = await myTokenContract.read.name();
      expect(tokenName).to.be.equal("MyToken");
    });
    it("gets the correct balanceOf Deployer", async()=>{
        const { myTokenContract, deployer } = await loadFixture(fixture); 
        const deployerBalance = await myTokenContract.read.balanceOf([deployer.account.address]);
        expect(deployerBalance).to.be.equal(expectedDeployerTokenAmount);
    })
  });
});
