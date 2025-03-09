import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Navigation() {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="fixed left-0 right-0 top-4 z-50 mx-auto w-[80%] max-w-4xl rounded-full bg-transparent backdrop-blur-md border border-border/40 shadow-lg shadow-black/5"
    >
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-xl font-bold">SonnetAPI</span>
        </div>

        <div className="space-x-4">
          <button onClick={() => router.push('/')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </button>
          <button onClick={() => router.push('/docs')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Docs
          </button>
          <button onClick={() => router.push('https://github.com/AndresDevvv/free-sonnetapi')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Github
          </button>
        </div>

      </div>
    </motion.nav>
  );
}