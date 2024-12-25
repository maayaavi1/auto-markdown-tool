// Auto-Markdown Tool for Content Writers

// Import necessary libraries
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import "tailwindcss/tailwind.css";
import Split from 'react-split';
import { Controlled as CodeMirror } from 'react-codemirror2';

// Markdown parser setup
const md = new MarkdownIt();

// Main Application Component
function MarkdownEditor() {
  const [text, setText] = useState("# Welcome to Auto-Markdown Tool!\n\nEdit this text and see the magic happen in real-time.");
  const [htmlPreview, setHtmlPreview] = useState(md.render(text));

  const handleInputChange = (value) => {
    setText(value);
    setHtmlPreview(md.render(value));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: Header */}
      <header className="bg-gray-800 text-white p-4 text-center text-lg font-bold">
        Auto-Markdown Tool
      </header>

      {/* Main Content: Split Screen for Input and Preview */}
      <Split
        className="flex flex-grow"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={10}
      >
        {/* Input Area */}
        <div className="p-4 bg-gray-100 overflow-auto">
          <CodeMirror
            value={text}
            options={{
              mode: 'markdown',
              lineNumbers: true,
              lineWrapping: true,
              theme: 'default',
            }}
            onBeforeChange={(editor, data, value) => {
              handleInputChange(value);
            }}
          />
        </div>

        {/* Preview Area */}
        <div
          className="p-4 overflow-auto bg-white"
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        />
      </Split>

      {/* Bottom Section: Buttons */}
      <footer className="bg-gray-800 text-white p-4 flex justify-end space-x-4">
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Copy Markdown
        </button>
        <button
          onClick={() => {
            const blob = new Blob([text], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'markdown.md';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Download MD
        </button>
      </footer>
    </div>
  );
}

// Render Application
ReactDOM.render(<MarkdownEditor />, document.getElementById('root'));

