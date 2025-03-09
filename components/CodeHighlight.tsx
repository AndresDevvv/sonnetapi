import React, { useState } from 'react';
import { motion } from 'framer-motion';

// SVG icons directly included instead of importing from @heroicons/react
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export function CodeHighlight() {
  const [requestCopied, setRequestCopied] = useState<boolean>(false);
  const [responseCopied, setResponseCopied] = useState<boolean>(false);
  
  const requestText = `POST /v1/chat/completions HTTP/1.1
Host: localhost:3032
Content-Type: application/json

{
  "model": "claude3.5",
  "messages": [
    {
      "role": "user",
      "content": "Hi!"
    }
  ]
}`;

  const responseText = `{
  "model": "claude-3-5-sonnet-20241022",
  "content": "Hello! How can I help you today?",
  "usage": {
    "input_tokens": 120,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "output_tokens": 12
  }
}`;

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-12 space-y-6"
    >
      {/* Request Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg overflow-hidden shadow-lg border border-indigo-500/30 bg-gradient-to-br from-black/70 to-indigo-950/30 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-indigo-500/20">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <h3 className="text-indigo-300 font-medium">Request</h3>
          </div>
          <button
            onClick={() => copyToClipboard(requestText, setRequestCopied)}
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1 text-sm p-1 rounded hover:bg-white/10"
            aria-label="Copy request"
          >
            {requestCopied ? (
              <>
                <CheckIcon />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4 text-sm font-mono text-left overflow-x-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-purple-400">POST</span>{' '}
            <span className="text-green-400">/v1/chat/completions</span>{' '}
            <span className="text-white">HTTP/1.1</span>
            <br />
            <span className="text-blue-400">Host:</span>{' '}
            <span className="text-white">localhost:3032</span>
            <br />
            <span className="text-blue-400">Content-Type:</span>{' '}
            <span className="text-white">application/json</span>
            <br />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            <span className="text-white">{`{
  "model": `}</span>
            <span className="text-green-400">"claude3.5"</span>
            <span className="text-white">,</span>
            <span className="text-white">{`
  "messages": [
    {
      "role": `}</span>
            <span className="text-green-400">"user"</span>
            <span className="text-white">,</span>
            <span className="text-white">{`
      "content": `}</span>
            <span className="text-green-400">"Hi!"</span>
            <span className="text-white">{`
    }
  ]
}`}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Response Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-lg overflow-hidden shadow-lg border border-emerald-500/30 bg-gradient-to-br from-black/70 to-emerald-950/30 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-emerald-500/20">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center">
              <h3 className="text-emerald-300 font-medium">Response</h3>
              <span className="ml-2 text-xs text-emerald-300/70">(Within 3.57s)</span>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(responseText, setResponseCopied)}
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1 text-sm p-1 rounded hover:bg-white/10"
            aria-label="Copy response"
          >
            {responseCopied ? (
              <>
                <CheckIcon />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4 text-sm font-mono text-left overflow-x-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-white">{`{
  "model": `}</span>
            <span className="text-green-400">"claude-3-5-sonnet-20241022"</span>
            <span className="text-white">,</span>
            <span className="text-white">{`
  "content": `}</span>
            <span className="text-green-400">"Hello! How can I help you today?"</span>
            <span className="text-white">,</span>
            <span className="text-white">{`
  "usage": {
    "input_tokens": 120,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "output_tokens": 12
  }
}`}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
