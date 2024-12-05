import React from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Transaction } from '../types/crypto';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Transaction History
          </h2>
          <p className="text-gray-600 text-sm">Your recent transactions</p>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'receive' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {tx.type === 'receive' ? (
                  <ArrowDownLeft className={`w-5 h-5 text-green-600`} />
                ) : (
                  <ArrowUpRight className={`w-5 h-5 text-red-600`} />
                )}
              </div>
              <div>
                <p className="font-semibold capitalize">{tx.type}</p>
                <p className="text-sm text-gray-600">
                  {tx.recipient} • {new Date(tx.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${tx.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.cryptoSymbol}
              </p>
              <p className={`text-sm px-2 py-1 rounded-full inline-block ${
                tx.status === 'completed' ? 'bg-green-100 text-green-600' : 
                tx.status === 'failed' ? 'bg-red-100 text-red-600' : 
                'bg-yellow-100 text-yellow-600'
              }`}>
                {tx.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}