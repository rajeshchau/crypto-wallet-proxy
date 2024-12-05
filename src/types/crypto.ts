export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  cryptoSymbol: string;
  timestamp: Date;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
}