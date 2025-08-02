export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return;
  }

  try {
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("walletInfo").textContent =
      "Connected: " + account.slice(0, 6) + "..." + account.slice(-4);
  } catch (err) {
    alert("Connection failed.");
    console.error(err);
  }
}
