import React, { useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export function Terminal() {
  const [output, setOutput] = useState<string[]>([
    '> Welcome to the terminal',
    '> Type your commands here'
  ]);

  return (
    <div className="h-full bg-black text-green-400 p-4 font-mono overflow-auto">
      {output.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}