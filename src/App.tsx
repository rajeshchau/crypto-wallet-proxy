import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Portfolio } from './components/Portfolio';
import { SendCrypto } from './components/SendCrypto';
import { TransactionHistory } from './components/TransactionHistory';
import { CryptoAsset, Transaction } from './types/crypto';

const mockAssets: CryptoAsset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 20000, change24h: 2.5 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 4.0, value: 8000, change24h: -1.2 },
  { id: '3', name: 'Solana', symbol: 'SOL', amount: 45.0, value: 4500, change24h: 5.8 },
  { id: '4', name: 'Cardano', symbol: 'ADA', amount: 1000.0, value: 2000, change24h: 3.2 },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 0.1,
    cryptoSymbol: 'BTC',
    timestamp: new Date('2024-03-10'),
    recipient: '+1234567890',
    status: 'completed'
  },
  {
    id: '2',
    type: 'receive',
    amount: 2.0,
    cryptoSymbol: 'ETH',
    timestamp: new Date('2024-03-09'),
    recipient: '+1987654321',
    status: 'completed'
  },
  {
    id: '3',
    type: 'send',
    amount: 100,
    cryptoSymbol: 'SOL',
    timestamp: new Date('2024-03-08'),
    recipient: '+1122334455',
    status: 'pending'
  }
];

function App() {
  const [assets] = useState<CryptoAsset[]>(mockAssets);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const handleSend = (amount: number, recipient: string, asset: CryptoAsset) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'send',
      amount,
      cryptoSymbol: asset.symbol,
      timestamp: new Date(),
      recipient,
      status: 'pending'
    };
    
    setTransactions([newTransaction, ...transactions]);
    console.log(`SMS sent to ${recipient}: You have sent ${amount} ${asset.symbol} from your wallet`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <Portfolio assets={assets} />
          </div>
          <div>
            <SendCrypto assets={assets} onSend={handleSend} />
          </div>
          <div className="lg:col-span-3">
            <TransactionHistory transactions={transactions} />
          </div>
        </motion.div>
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;