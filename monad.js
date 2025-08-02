export async function connectWallet(walletDisplayEl) {
  if (!window.ethereum) {
    alert("Please install MetaMask to connect your wallet.");
    return;
  }

  try {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (walletDisplayEl)
      walletDisplayEl.textContent = "Connected: " + account.slice(0, 6) + "..." + account.slice(-4);
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Connection failed.");
  }
}
