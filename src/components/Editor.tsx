import React from 'react';
import { Split } from 'lucide-react';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
}

export function Editor({ code, onChange }: EditorProps) {
  return (
    <div className="h-full w-full bg-gray-900 text-white p-4 font-mono">
      <textarea
        className="w-full h-full bg-transparent outline-none resize-none"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}