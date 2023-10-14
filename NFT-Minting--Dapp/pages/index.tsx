import { ConnectWallet, SmartContract, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
import { BaseContract, utils } from "ethers";
import { log } from "console";

const Home: NextPage = () => {

  const contractAddress = "0xc6E35af1953ED578031ADfee9be100259AA7762B";
  const address = useAddress();
  const [quantity, setQuantity] = useState("0");
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "priceForAddress", [address, quantity]);

  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
              <a
                href="https://thirdweb.com/goerli/0xc6E35af1953ED578031ADfee9be100259AA7762B/code"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dynamic Nft free Mint
              </a>
            </span>
          </h1>
          <p className={styles.description}>
            How to mint NFTs
          </p>

          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        <div>
          <label>
            Quantity:
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity((e.target.value))} 
            />
          </label>
        </div>
        <div style={{marginTop: "10px"}}>
        <Web3Button
      contractAddress= {contractAddress}
            action={(contract) => {
              contract.call("claim", [address, quantity])
            }}
          >
      Mint Free NFT
    </Web3Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
