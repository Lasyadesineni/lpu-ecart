import React, { useEffect, useState } from 'react';

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/api/wallet', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBalance(data.wallet.balance));
  }, []);

  const addFunds = async () => {
    await fetch('http://localhost:5050/api/wallet/add', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount) })
    });
    setAmount('');
    fetch('http://localhost:5050/api/wallet', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBalance(data.wallet.balance));
  };

  return (
    <div>
      <h2>Wallet</h2>
      <p>Balance: ₹{balance}</p>
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addFunds}>Add Funds</button>
    </div>
  );
}

export default Wallet;
