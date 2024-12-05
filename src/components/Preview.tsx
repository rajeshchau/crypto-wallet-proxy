import React from 'react';
import { Play } from 'lucide-react';

export function Preview() {
  return (
    <div className="h-full bg-white">
      <div className="h-8 bg-gray-100 border-b flex items-center px-4">
        <Play className="w-4 h-4 text-gray-600" />
        <span className="ml-2 text-sm text-gray-600">Preview</span>
      </div>
      <iframe
        title="preview"
        className="w-full h-[calc(100%-2rem)]"
        sandbox="allow-scripts"
        srcDoc={`
          <!DOCTYPE html>
          <html>
            <body>
              <div id="preview"></div>
            </body>
          </html>
        `}
      />
    </div>
  );
}