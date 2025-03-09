"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { FloatingElements } from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CodeHighlight } from "@/components/CodeHighlight";

export default function App() {
  const router = useRouter();

  return (
    <div 
      className="relative min-h-screen bg-background text-foreground overflow-hidden" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navigation />
      <FloatingElements />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-1.5 mb-8 border border-border/50 backdrop-blur-sm">
              <span className="text-sm font-medium">⚡ Claude 3.7 Sonnet</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/80 to-secondary tracking-tight">
              AI API for developers
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              SonnetAPI offers Claude 3.5/3.7 Sonnet APIs.
              It is free to use and easy to integrate.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <div className="" />
                <Button 
                  size="lg" 
                  onClick={() => router.push('/docs')}
                  className="relative bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                Get Started
                </Button>
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => router.push('https://github.com/AndresDevvv/free-sonnetapi')}
                className="shadow-md hover:bg-secondary/80 backdrop-blur-sm"
              >
                Github
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => router.push('/docs')}
                className="border-primary/20 bg-background/50 hover:bg-accent/30 backdrop-blur-sm"
              >
                Documentation
              </Button>
            </div>
          </motion.div>
          
          <CodeHighlight />
        </div>
      </main>
    </div>
  );
}
