import { ethers } from "https://cdn.skypack.dev/ethers@6";
import { MONAD_RPC_URL, MONAD_SYMBOL, MONAD_EXPLORER_URL } from './constants.js';

let signer = null;

export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    document.getElementById("walletInfo").innerHTML = `
      <p><b>Address:</b> ${address.slice(0, 6)}...${address.slice(-4)}</p>
      <p><b>Balance:</b> ${ethers.formatEther(balance)} ${MONAD_SYMBOL}</p>
      <div id="sendBox">
        <input id="recipient" placeholder="Recipient address" />
        <input id="amount" placeholder="Amount in ${MONAD_SYMBOL}" />
        <button id="sendMON">Send MON</button>
      </div>
    `;

    document.getElementById("sendMON").onclick = sendMON;
  } catch (error) {
    alert("Connection failed: " + error.message);
  }
}

async function sendMON() {
  const to = document.getElementById("recipient").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!ethers.isAddress(to)) {
    alert("Invalid address.");
    return;
  }

  if (!amount || isNaN(amount)) {
    alert("Enter a valid numeric amount.");
    return;
  }

  try {
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    alert("Transaction sent!\n\n" + tx.hash);
    window.open(`${MONAD_EXPLORER_URL}/tx/${tx.hash}`, "_blank");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
}
export async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not found");
    return;
  }

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    document.getElementById("walletInfo").innerText = "Connected: " + address;
  } catch (err) {
    alert("Connection failed");
  }
}
