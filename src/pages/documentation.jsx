"use client"

import { useState } from "react"
import {
    Book,
    Code,
    Copy,
    ExternalLink,
    FileText,
    Globe,
    Key,
    Lightbulb,
    Play,
    Search,
    Shield,
    Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState("getting-started")
    const [searchTerm, setSearchTerm] = useState("")
    const [copiedCode, setCopiedCode] = useState("")

    const copyToClipboard = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedCode(id)
            setTimeout(() => setCopiedCode(""), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const navigationItems = [
        {
            id: "getting-started",
            title: "Getting Started",
            icon: Play,
            items: [
                { id: "quick-start", title: "Quick Start" },
                { id: "authentication", title: "Authentication" },
                { id: "first-request", title: "Your First Request" },
            ],
        },
        {
            id: "api-reference",
            title: "API Reference",
            icon: Code,
            items: [
                { id: "chat-completions", title: "Chat Completions" },
                { id: "completions", title: "Completions" },
                { id: "embeddings", title: "Embeddings" },
                { id: "models", title: "Models" },
            ],
        },
        {
            id: "guides",
            title: "Guides",
            icon: Book,
            items: [
                { id: "best-practices", title: "Best Practices" },
                { id: "error-handling", title: "Error Handling" },
                { id: "rate-limiting", title: "Rate Limiting" },
                { id: "streaming", title: "Streaming Responses" },
            ],
        },
        {
            id: "sdks",
            title: "SDKs & Libraries",
            icon: Globe,
            items: [
                { id: "javascript", title: "JavaScript/Node.js" },
                { id: "python", title: "Python" },
                { id: "curl", title: "cURL" },
                { id: "php", title: "PHP" },
            ],
        },
    ]

    const codeExamples = {
        javascript: `import { DeepNexora } from 'deepnexora';

const client = new DeepNexora({
  apiKey: 'your-api-key-here'
});

const response = await client.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ]
});

console.log(response.choices[0].message.content);`,
        python: `from deepnexora import DeepNexora

client = DeepNexora(api_key="your-api-key-here")

response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": "Hello, world!"}
    ]
)

print(response.choices[0].message.content)`,
        curl: `curl -X POST https://api.deepnexora.com/v1/chat/completions \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4-turbo",
    "messages": [
      {"role": "user", "content": "Hello, world!"}
    ]
  }'`,
        php: `<?php
require_once 'vendor/autoload.php';

use DeepNexora\\Client;

$client = new Client('your-api-key-here');

$response = $client->chat()->completions()->create([
    'model' => 'gpt-4-turbo',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello, world!']
    ]
]);

echo $response['choices'][0]['message']['content'];
?>`,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
            <div className="flex">
                {/* Sidebar Navigation */}
                <div className="w-80 bg-slate-900/50 border-r border-slate-700/50 backdrop-blur-sm min-h-screen sticky top-0">
                    <div className="p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <FileText className="h-6 w-6 text-cyan-500" />
                            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                Documentation
                            </h1>
                        </div>

                        {/* Search */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search docs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
                            />
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-2">
                            {navigationItems.map((section) => (
                                <Collapsible key={section.id} defaultOpen>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-slate-800/50 rounded-md">
                                        <div className="flex items-center space-x-2">
                                            <section.icon className="h-4 w-4 text-cyan-500" />
                                            <span className="text-slate-200 font-medium">{section.title}</span>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="ml-6 mt-1 space-y-1">
                                        {section.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveSection(item.id)}
                                                className={`block w-full text-left p-2 text-sm rounded-md transition-colors ${
                                                    activeSection === item.id
                                                        ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500"
                                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                                                }`}
                                            >
                                                {item.title}
                                            </button>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </nav>

                        {/* Quick Links */}
                        <div className="mt-8 pt-6 border-t border-slate-700/50">
                            <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Links</h3>
                            <div className="space-y-2">
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>API Status</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>GitHub Repository</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Community Discord</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Getting Started Sections */}
                    {activeSection === "quick-start" && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">Quick Start Guide</h1>
                                <p className="text-xl text-slate-400">
                                    Get up and running with DeepNexora AI in minutes. Follow this guide to make your first API call.
                                </p>
                            </div>

                            {/* Steps */}
                            <div className="space-y-8">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <div className="w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                1
                                            </div>
                                            Create an Account
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 mb-4">
                                            Sign up for a DeepNexora account and create your first project to get started.
                                        </p>
                                        <Button className="bg-cyan-600 hover:bg-cyan-700">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Sign Up Now
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <div className="w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                2
                                            </div>
                                            Get Your API Key
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 mb-4">
                                            Navigate to your project dashboard and generate an API key. Keep this secure!
                                        </p>
                                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                            <code className="text-cyan-400">dk_live_sk_1a2b3c4d5e6f7g8h9i0j</code>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <div className="w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                3
                                            </div>
                                            Make Your First Request
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 mb-4">
                                            Use your API key to make your first request to the DeepNexora API.
                                        </p>
                                        <Tabs defaultValue="javascript" className="w-full">
                                            <TabsList className="bg-slate-800/50 p-1 mb-4">
                                                <TabsTrigger value="javascript" className="data-[state=active]:bg-slate-700">
                                                    JavaScript
                                                </TabsTrigger>
                                                <TabsTrigger value="python" className="data-[state=active]:bg-slate-700">
                                                    Python
                                                </TabsTrigger>
                                                <TabsTrigger value="curl" className="data-[state=active]:bg-slate-700">
                                                    cURL
                                                </TabsTrigger>
                                            </TabsList>
                                            {Object.entries(codeExamples).map(([lang, code]) => (
                                                <TabsContent key={lang} value={lang}>
                                                    <div className="relative">
                            <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                              <code className="text-slate-300 text-sm">{code}</code>
                            </pre>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="absolute top-2 right-2 border-slate-600"
                                                            onClick={() => copyToClipboard(code, lang)}
                                                        >
                                                            {copiedCode === lang ? "Copied!" : <Copy className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeSection === "authentication" && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">Authentication</h1>
                                <p className="text-xl text-slate-400">
                                    Learn how to authenticate your requests using API keys and best security practices.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Key className="h-5 w-5 mr-2" />
                                            API Key Authentication
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-slate-300">
                                            DeepNexora uses API keys for authentication. Include your API key in the Authorization header of
                                            every request.
                                        </p>
                                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                            <code className="text-cyan-400">Authorization: Bearer YOUR_API_KEY</code>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                            <div className="flex items-start space-x-2">
                                                <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
                                                <div>
                                                    <h4 className="text-amber-400 font-medium">Security Best Practices</h4>
                                                    <ul className="text-slate-300 text-sm mt-2 space-y-1">
                                                        <li>• Never expose your API key in client-side code</li>
                                                        <li>• Use environment variables to store your API key</li>
                                                        <li>• Rotate your API keys regularly</li>
                                                        <li>• Use different API keys for different environments</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">API Key Types</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h4 className="text-cyan-400 font-medium mb-2">Development Keys</h4>
                                                <p className="text-slate-300 text-sm mb-2">For testing and development environments.</p>
                                                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">dk_test_*</Badge>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h4 className="text-cyan-400 font-medium mb-2">Production Keys</h4>
                                                <p className="text-slate-300 text-sm mb-2">For live applications and production use.</p>
                                                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">dk_live_*</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeSection === "chat-completions" && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">Chat Completions</h1>
                                <p className="text-xl text-slate-400">
                                    Create conversational AI experiences with the chat completions endpoint.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-cyan-400">Endpoint</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                            <div className="flex items-center space-x-2">
                                                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">POST</Badge>
                                                <code className="text-cyan-400">https://api.deepnexora.com/v1/chat/completions</code>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Request Parameters</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                <tr className="border-b border-slate-700">
                                                    <th className="text-left p-3 text-slate-400">Parameter</th>
                                                    <th className="text-left p-3 text-slate-400">Type</th>
                                                    <th className="text-left p-3 text-slate-400">Required</th>
                                                    <th className="text-left p-3 text-slate-400">Description</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-3 text-cyan-400 font-mono">model</td>
                                                    <td className="p-3 text-slate-300">string</td>
                                                    <td className="p-3">
                                                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Required</Badge>
                                                    </td>
                                                    <td className="p-3 text-slate-300">The AI model to use for completion</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-3 text-cyan-400 font-mono">messages</td>
                                                    <td className="p-3 text-slate-300">array</td>
                                                    <td className="p-3">
                                                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Required</Badge>
                                                    </td>
                                                    <td className="p-3 text-slate-300">Array of message objects</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-3 text-cyan-400 font-mono">temperature</td>
                                                    <td className="p-3 text-slate-300">number</td>
                                                    <td className="p-3">
                                                        <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Optional</Badge>
                                                    </td>
                                                    <td className="p-3 text-slate-300">Controls randomness (0.0 to 2.0)</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-3 text-cyan-400 font-mono">max_tokens</td>
                                                    <td className="p-3 text-slate-300">integer</td>
                                                    <td className="p-3">
                                                        <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Optional</Badge>
                                                    </td>
                                                    <td className="p-3 text-slate-300">Maximum tokens to generate</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 text-cyan-400 font-mono">stream</td>
                                                    <td className="p-3 text-slate-300">boolean</td>
                                                    <td className="p-3">
                                                        <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/50">Optional</Badge>
                                                    </td>
                                                    <td className="p-3 text-slate-300">Enable streaming responses</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Example Request</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                      <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <code className="text-slate-300 text-sm">
                          {`{
  "model": "gpt-4-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 150
}`}
                        </code>
                      </pre>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="absolute top-2 right-2 border-slate-600"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        `{
  "model": "gpt-4-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 150
}`,
                                                        "chat-request",
                                                    )
                                                }
                                            >
                                                {copiedCode === "chat-request" ? "Copied!" : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Example Response</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                      <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <code className="text-slate-300 text-sm">
                          {`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 8,
    "total_tokens": 33
  }
}`}
                        </code>
                      </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeSection === "rate-limiting" && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">Rate Limiting</h1>
                                <p className="text-xl text-slate-400">
                                    Understand rate limits and how to handle them in your applications.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Zap className="h-5 w-5 mr-2" />
                                            Rate Limit Types
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h4 className="text-cyan-400 font-medium mb-2">Requests Per Minute (RPM)</h4>
                                                <p className="text-slate-300 text-sm mb-3">
                                                    Limits the number of API requests you can make per minute.
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Free Tier:</span>
                                                        <span className="text-slate-200">100 RPM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Pro Tier:</span>
                                                        <span className="text-slate-200">1,000 RPM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Enterprise:</span>
                                                        <span className="text-slate-200">Custom</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                <h4 className="text-cyan-400 font-medium mb-2">Tokens Per Minute (TPM)</h4>
                                                <p className="text-slate-300 text-sm mb-3">
                                                    Limits the total number of tokens processed per minute.
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Free Tier:</span>
                                                        <span className="text-slate-200">10,000 TPM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Pro Tier:</span>
                                                        <span className="text-slate-200">100,000 TPM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Enterprise:</span>
                                                        <span className="text-slate-200">Custom</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Rate Limit Headers</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 mb-4">
                                            Every API response includes headers that show your current rate limit status:
                                        </p>
                                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <pre className="text-slate-300 text-sm">
                        {`X-RateLimit-Limit-Requests: 1000
X-RateLimit-Remaining-Requests: 999
X-RateLimit-Reset-Requests: 1640995200
X-RateLimit-Limit-Tokens: 100000
X-RateLimit-Remaining-Tokens: 99500
X-RateLimit-Reset-Tokens: 1640995200`}
                      </pre>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Handling Rate Limits</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 mb-4">
                                            When you exceed rate limits, you'll receive a 429 status code. Here's how to handle it:
                                        </p>
                                        <Tabs defaultValue="javascript" className="w-full">
                                            <TabsList className="bg-slate-800/50 p-1 mb-4">
                                                <TabsTrigger value="javascript" className="data-[state=active]:bg-slate-700">
                                                    JavaScript
                                                </TabsTrigger>
                                                <TabsTrigger value="python" className="data-[state=active]:bg-slate-700">
                                                    Python
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="javascript">
                                                <div className="relative">
                          <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                            <code className="text-slate-300 text-sm">
                              {`async function makeRequestWithRetry(requestFn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await requestFn();
      return response;
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const retryAfter = error.headers['retry-after'] || Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      throw error;
    }
  }
}`}
                            </code>
                          </pre>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="python">
                                                <div className="relative">
                          <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                            <code className="text-slate-300 text-sm">
                              {`import time
import requests

def make_request_with_retry(request_fn, max_retries=3):
    for i in range(max_retries):
        try:
            response = request_fn()
            return response
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429 and i < max_retries - 1:
                retry_after = int(e.response.headers.get('retry-after', 2 ** i))
                time.sleep(retry_after)
                continue
            raise e`}
                            </code>
                          </pre>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>

                                <Card className="bg-blue-500/10 border-blue-500/30 rounded-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-3">
                                            <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                                            <div>
                                                <h4 className="text-blue-400 font-medium mb-2">Best Practices</h4>
                                                <ul className="text-slate-300 space-y-1">
                                                    <li>• Implement exponential backoff for retries</li>
                                                    <li>• Monitor rate limit headers in responses</li>
                                                    <li>• Use batch requests when possible</li>
                                                    <li>• Cache responses to reduce API calls</li>
                                                    <li>• Consider upgrading your plan for higher limits</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeSection === "javascript" && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">JavaScript SDK</h1>
                                <p className="text-xl text-slate-400">
                                    Official JavaScript/Node.js SDK for seamless integration with DeepNexora AI.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-cyan-400">Installation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Tabs defaultValue="npm" className="w-full">
                                            <TabsList className="bg-slate-800/50 p-1 mb-4">
                                                <TabsTrigger value="npm" className="data-[state=active]:bg-slate-700">
                                                    npm
                                                </TabsTrigger>
                                                <TabsTrigger value="yarn" className="data-[state=active]:bg-slate-700">
                                                    yarn
                                                </TabsTrigger>
                                                <TabsTrigger value="pnpm" className="data-[state=active]:bg-slate-700">
                                                    pnpm
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="npm">
                                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                                    <code className="text-cyan-400">npm install deepnexora</code>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="yarn">
                                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                                    <code className="text-cyan-400">yarn add deepnexora</code>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="pnpm">
                                                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                                    <code className="text-cyan-400">pnpm add deepnexora</code>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Basic Usage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                      <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <code className="text-slate-300 text-sm">
                          {`import { DeepNexora } from 'deepnexora';

// Initialize the client
const client = new DeepNexora({
  apiKey: process.env.DEEPNEXORA_API_KEY,
});

// Create a chat completion
async function createChatCompletion() {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

createChatCompletion();`}
                        </code>
                      </pre>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="absolute top-2 right-2 border-slate-600"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        `import { DeepNexora } from 'deepnexora';

// Initialize the client
const client = new DeepNexora({
  apiKey: process.env.DEEPNEXORA_API_KEY,
});

// Create a chat completion
async function createChatCompletion() {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

createChatCompletion();`,
                                                        "js-basic",
                                                    )
                                                }
                                            >
                                                {copiedCode === "js-basic" ? "Copied!" : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Streaming Responses</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                      <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <code className="text-slate-300 text-sm">
                          {`async function streamChatCompletion() {
  const stream = await client.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'user', content: 'Write a short story about AI.' }
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(content);
  }
}`}
                        </code>
                      </pre>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-slate-200">Error Handling</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                      <pre className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <code className="text-slate-300 text-sm">
                          {`import { DeepNexoraError, RateLimitError, AuthenticationError } from 'deepnexora';

try {
  const response = await client.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: 'Hello!' }]
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log('Rate limit exceeded. Retry after:', error.retryAfter);
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof DeepNexoraError) {
    console.log('API error:', error.message);
  } else {
    console.log('Unexpected error:', error);
  }
}`}
                        </code>
                      </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Default content when no section is selected */}
                    {!["quick-start", "authentication", "chat-completions", "rate-limiting", "javascript"].includes(
                        activeSection,
                    ) && (
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-slate-100 mb-4">DeepNexora Documentation</h1>
                                <p className="text-xl text-slate-400">
                                    Welcome to the DeepNexora AI platform documentation. Get started with our comprehensive guides and API
                                    reference.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-colors cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Play className="h-5 w-5 mr-2" />
                                            Quick Start
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300">Get up and running with DeepNexora in minutes.</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-colors cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Code className="h-5 w-5 mr-2" />
                                            API Reference
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300">Complete reference for all API endpoints and parameters.</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-colors cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Book className="h-5 w-5 mr-2" />
                                            Guides
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300">In-depth guides and best practices for using DeepNexora.</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-colors cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-cyan-400">
                                            <Globe className="h-5 w-5 mr-2" />
                                            SDKs
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300">Official SDKs and libraries for popular programming languages.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
