import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CryptoAsset } from '../types/crypto';

interface SendCryptoProps {
  assets: CryptoAsset[];
  onSend: (amount: number, recipient: string, asset: CryptoAsset) => void;
}

export function SendCrypto({ assets, onSend }: SendCryptoProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) {
      toast.error('Please select a crypto asset');
      return;
    }
    if (!amount || !recipient) {
      toast.error('Please fill in all fields');
      return;
    }
    onSend(parseFloat(amount), recipient, selectedAsset);
    toast.success('Transaction initiated!');
    setAmount('');
    setRecipient('');
    setSelectedAsset(null);
    setStep(1);
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Send className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Send Crypto
          </h2>
          <p className="text-gray-600 text-sm">Transfer to any phone number</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={false}
          animate={{ opacity: step === 1 ? 1 : 0, height: step === 1 ? 'auto' : 0 }}
          className={step === 2 ? 'hidden' : ''}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Asset
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedAsset?.id || ''}
                onChange={(e) => setSelectedAsset(assets.find(a => a.id === e.target.value) || null)}
              >
                <option value="">Select a crypto</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.symbol}) - ${asset.value.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="button"
              onClick={() => selectedAsset && setStep(2)}
              disabled={!selectedAsset}
              className="w-full"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: step === 2 ? 1 : 0, height: step === 2 ? 'auto' : 0 }}
          className={step === 1 ? 'hidden' : ''}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount ({selectedAsset?.symbol})
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.000001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+1234567890"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Send {selectedAsset?.symbol}
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </Card>
  );
}