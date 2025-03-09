"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { FloatingElements } from "@/components/FloatingElements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DocsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [demoModel, setDemoModel] = useState("claude3.5");
    const [demoSource, setDemoSource] = useState("puter");
    const [demoStream, setDemoStream] = useState(false);
    const [demoPrompt, setDemoPrompt] = useState("Hello, how are you today?");

    const handleDemoSubmit = async () => {
        setIsLoading(true);
        setApiResponse(null);
        setApiError(null);

        try {
            const response = await fetch("https://realsonnetapi.andresdev.org/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: demoModel,
                    source: demoSource,
                    stream: demoStream,
                    messages: [
                        {
                            role: "user",
                            content: demoPrompt
                        }
                    ]
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "An error occurred");
            }

            setApiResponse(data);
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

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
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/80 to-secondary tracking-tight">
                            Documentation
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                            Everything you need to know about using SonnetAPI with Claude 3.5/3.7 Sonnet, GPT-4o Mini, and more.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Tabs defaultValue="quickstart" className="w-full">
                            <TabsList className="mb-8 grid grid-cols-4 w-full md:w-[500px] bg-background/10 backdrop-blur-sm border border-border/40">
                                <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
                                <TabsTrigger value="api">API Reference</TabsTrigger>
                                <TabsTrigger value="models">Models</TabsTrigger>
                                <TabsTrigger value="demo">Try It</TabsTrigger>
                            </TabsList>

                            <TabsContent value="quickstart" className="space-y-6">
                                <div className="rounded-lg bg-background/30 backdrop-blur-md border border-border/40 p-6 shadow-xl">
                                    <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
                                    <p className="mb-4">Getting started with SonnetAPI is simple. Follow these steps to make your first API call:</p>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">Make a Request</h3>
                                        <p className="mb-2">Use the /v1/chat/completions endpoint to send prompts to Claude. No authentication is required.</p>
                                        <div className="bg-black/50 p-4 rounded-md font-mono text-sm mt-2">
                                            <pre>{`curl -X POST https://realsonnetapi.andresdev.org/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude3.5",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you today?"
      }
    ],
    "source": "puter"
  }'`}</pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Parse the Response</h3>
                                        <p className="mb-2">The API returns a JSON response with the model's output and token usage statistics.</p>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold mb-3">Using DuckAI Source</h3>
                                        <p className="mb-2">You can also use the DuckAI source to access additional models like GPT-4o Mini:</p>
                                        <div className="bg-black/50 p-4 rounded-md font-mono text-sm mt-2">
                                            <pre>{`curl -X POST https://realsonnetapi.andresdev.org/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you today?"
      }
    ],
    "source": "duckai"
  }'`}</pre>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="api" className="space-y-6">
                                <div className="rounded-lg bg-background/30 backdrop-blur-md border border-border/40 p-6 shadow-xl">
                                    <h2 className="text-2xl font-bold mb-4">API Reference</h2>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">Endpoints</h3>

                                        <div className="mb-4">
                                            <h4 className="text-lg font-medium mb-2">POST /v1/chat/completions</h4>
                                            <p className="mb-2">Create a completion for the chat message</p>

                                            <h5 className="text-base font-medium mt-4 mb-2">Request Parameters</h5>
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                    <span className="font-medium">model</span>
                                                    <span>string</span>
                                                    <span className="text-muted-foreground">The model to use (required): "claude3.5", "claude3.7", "gpt-4o-mini", "o3-mini", or "claude-3-haiku"</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                    <span className="font-medium">messages</span>
                                                    <span>array</span>
                                                    <span className="text-muted-foreground">The messages to generate completions for (required)</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                    <span className="font-medium">source</span>
                                                    <span>string</span>
                                                    <span className="text-muted-foreground">API source to use: "puter" (default), "trae", or "duckai"</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                    <span className="font-medium">stream</span>
                                                    <span>boolean</span>
                                                    <span className="text-muted-foreground">Whether to stream the response (default: false)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-lg font-medium mb-2">Response Format</h4>
                                            <div className="bg-black/50 p-4 rounded-md font-mono text-sm">
                                                <pre>{`{
  "model": "claude3.5",
  "content": "The generated response text",
  "usage": {
    "prompt_tokens": 120,
    "completion_tokens": 45,
    "total_tokens": 165
  }
}`}</pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">API Sources</h3>
                                        <p className="mb-2">SonnetAPI supports three different API sources that you can specify in your requests:</p>
                                        
                                        <div className="space-y-4 mt-4">
                                            <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                                <h4 className="text-lg font-medium mb-2">Puter</h4>
                                                <p className="mb-2">The default source that uses Puter's API to access Claude models.</p>
                                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                                    <li>Good reliability and response quality</li>
                                                    <li>Supports both Claude 3.5 and 3.7</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                                <h4 className="text-lg font-medium mb-2">Trae</h4>
                                                <p className="mb-2">Alternative source that uses Trae's API to access Claude models.</p>
                                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                                    <li>Different response formatting</li>
                                                    <li>Serves as fallback when Puter is unavailable</li>
                                                    <li>May provide different token usage reporting</li>
                                                </ul>
                                            </div>

                                            <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                                <h4 className="text-lg font-medium mb-2">DuckAI</h4>
                                                <p className="mb-2">New source that uses DuckDuckGo's AI API to access various models.</p>
                                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                                    <li>Supports additional models: gpt-4o-mini, o3-mini, claude-3-haiku</li>
                                                    <li>Different response formatting</li>
                                                    <li>No token usage reporting (returns zeros)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4">
                                            <p className="mb-2">The API will automatically try the alternate source if the primary source fails. You can specify your preferred source using the <code className="bg-background/30 px-1 rounded">source</code> parameter:</p>
                                            <div className="bg-black/50 p-4 rounded-md font-mono text-sm mt-2">
                                                <pre>{`{
  "model": "claude3.7",
  "source": "trae",
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }
  ]
}`}</pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">Error Handling</h3>
                                        <p className="mb-2">The API returns standard HTTP status codes to indicate success or failure.</p>
                                        <div className="space-y-2 mt-4">
                                            <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                <span className="font-medium">400</span>
                                                <span>Bad Request</span>
                                                <span className="text-muted-foreground">Invalid parameters were provided</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-black/30">
                                                <span className="font-medium">500</span>
                                                <span>Server Error</span>
                                                <span className="text-muted-foreground">Something went wrong on our end</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="models" className="space-y-6">
                                <div className="rounded-lg bg-background/30 backdrop-blur-md border border-border/40 p-6 shadow-xl">
                                    <h2 className="text-2xl font-bold mb-4">Available Models</h2>
                                    <p className="mb-6">SonnetAPI currently supports the following Claude models:</p>

                                    <div className="space-y-6">
                                        <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">claude3.5</h3>
                                                    <p className="text-muted-foreground mt-1">Claude 3.5 Sonnet model (claude-3-5-sonnet-20241022)</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                                                    Legacy
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Context window</p>
                                                    <p className="font-medium">200K tokens</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Training data</p>
                                                    <p className="font-medium">Up to April 2023</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">claude3.7</h3>
                                                    <p className="text-muted-foreground mt-1">Claude 3.7 Sonnet model (claude-3-7-sonnet-latest)</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                                                    Recommended
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Context window</p>
                                                    <p className="font-medium">200K tokens</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Training data</p>
                                                    <p className="font-medium">Up to October 2024</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">gpt-4o-mini</h3>
                                                    <p className="text-muted-foreground mt-1">OpenAI's GPT-4o Mini model (DuckAI source only)</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                                                    New
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Context window</p>
                                                    <p className="font-medium">128K tokens</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Source</p>
                                                    <p className="font-medium">DuckAI only</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">o3-mini</h3>
                                                    <p className="text-muted-foreground mt-1">OpenAI's o3-mini model (DuckAI source only)</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                                                    New
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Context window</p>
                                                    <p className="font-medium">128K tokens</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Source</p>
                                                    <p className="font-medium">DuckAI only</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-border/50 rounded-lg p-4 bg-background/20">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-semibold">claude-3-haiku</h3>
                                                    <p className="text-muted-foreground mt-1">Claude 3 Haiku model (claude-3-haiku-20240307)</p>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
                                                    New
                                                </div>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Context window</p>
                                                    <p className="font-medium">200K tokens</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Source</p>
                                                    <p className="font-medium">DuckAI only</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4">Model Selection</h3>
                                        <p className="mb-2">Specify the model you want to use in the request by setting the <code className="bg-background/30 px-1 rounded">model</code> parameter:</p>
                                        <div className="bg-black/50 p-4 rounded-md font-mono text-sm mt-2">
                                            <pre>{`{
  "model": "claude3.5",
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }]
}`}</pre>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4">System Messages</h3>
                                        <p className="mb-4">You can include a system message to set context for the conversation:</p>
                                        <div className="bg-black/50 p-4 rounded-md font-mono text-sm mt-2">
                                            <pre>{`{
  "model": "claude3.7",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant that specializes in technology."
    },
    {
      "role": "user",
      "content": "What's new in web development?"
    }]
}`}</pre>
                                        </div>
                                        <p className="mt-4 text-sm text-muted-foreground">If you don't include a system message, a default one will be added automatically.</p>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                                        <p className="mb-4">SonnetAPI pricing is based on token usage. Current rates per 1,000 tokens:</p>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-700">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Model</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Input</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Output</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Source</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-800">
                                                    <tr>
                                                        <td className="px-4 py-3 text-sm">claude3.5</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Puter, Trae</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 text-sm">claude3.7</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Puter, Trae</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 text-sm">gpt-4o-mini</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">DuckAI</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 text-sm">o3-mini</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">DuckAI</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 text-sm">claude-3-haiku</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">Free</td>
                                                        <td className="px-4 py-3 text-sm">DuckAI</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="demo" className="space-y-6">
                                <div className="rounded-lg bg-background/30 backdrop-blur-md border border-border/40 p-6 shadow-xl">
                                    <h2 className="text-2xl font-bold mb-4">API Demo</h2>
                                    <p className="mb-6">Test the API with real requests.</p>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <Label htmlFor="model" className="md:col-span-1">Model</Label>
                                            <div className="md:col-span-3">
                                                <Select value={demoModel} onValueChange={setDemoModel}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a model" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="claude3.5">claude3.5</SelectItem>
                                                        <SelectItem value="claude3.7">claude3.7</SelectItem>
                                                        <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                                                        <SelectItem value="o3-mini">o3-mini</SelectItem>
                                                        <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <Label htmlFor="source" className="md:col-span-1">Source</Label>
                                            <div className="md:col-span-3">
                                                <Select value={demoSource} onValueChange={setDemoSource}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a source" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="puter">Puter</SelectItem>
                                                        <SelectItem value="trae">Trae</SelectItem>
                                                        <SelectItem value="duckai">DuckAI</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            <Label htmlFor="stream" className="md:col-span-1">Stream</Label>
                                            <div className="md:col-span-3 flex items-center">
                                                <Switch checked={demoStream} onCheckedChange={setDemoStream} id="stream" />
                                                <span className="ml-2 text-sm text-muted-foreground">
                                                    {demoStream ? "Enabled" : "Disabled"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                            <Label htmlFor="prompt" className="md:col-span-1 mt-2">Prompt</Label>
                                            <div className="md:col-span-3">
                                                <Textarea 
                                                    id="prompt"
                                                    value={demoPrompt} 
                                                    onValueChange={setDemoPrompt}
                                                    rows={4}
                                                    placeholder="Type your message to Claude..."
                                                    className="resize-y"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button 
                                            onClick={handleDemoSubmit} 
                                            disabled={isLoading}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                        >
                                            {isLoading ? "Sending..." : "Send Request"}
                                        </Button>
                                    </div>

                                    {apiResponse && (
                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold mb-4">Response</h3>
                                            <div className="rounded-md bg-black/50 p-4 overflow-auto max-h-[500px]">
                                                <div className="mb-4 pb-4 border-b border-gray-700">
                                                    <h4 className="text-base font-medium text-primary mb-2">Response from {apiResponse.model}</h4>
                                                    <div className="whitespace-pre-wrap text-sm">
                                                        {apiResponse.content}
                                                    </div>
                                                </div>
                                                <div className="text-xs font-mono">
                                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Usage Statistics</h4>
                                                    <pre className="text-xs overflow-x-auto">
                                                        {JSON.stringify(apiResponse.usage, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {apiError && (
                                        <div className="mt-6">
                                            <div className="bg-red-900/30 text-red-300 p-4 rounded-md">
                                                <h3 className="text-base font-medium mb-1">Error</h3>
                                                <p>{apiError}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}