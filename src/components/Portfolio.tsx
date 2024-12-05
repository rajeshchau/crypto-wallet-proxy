import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { CryptoAsset } from '../types/crypto';

interface PortfolioProps {
  assets: CryptoAsset[];
}

export function Portfolio({ assets }: PortfolioProps) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + asset.change24h, 0) / assets.length;

  const chartData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.value,
    amount: asset.amount
  }));

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Overview
          </h2>
          <p className="text-gray-600 mt-1">Track your crypto assets</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span className={`font-semibold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white"
        >
          <Wallet className="w-8 h-8 mb-2" />
          <p className="text-indigo-100">Total Balance</p>
          <h3 className="text-3xl font-bold">${totalValue.toLocaleString()}</h3>
        </motion.div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorValue)" />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {assets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold">{asset.name}</p>
                <p className="text-sm text-gray-600">{asset.amount} {asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${asset.value.toLocaleString()}</p>
              <div className="flex items-center space-x-1">
                {asset.change24h >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}