import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code, Key, Server, Shield, Zap } from 'lucide-react';

const APIPage = () => {
  const navigate = useNavigate();

  const endpoints = [
    {
      title: "Content Registration",
      description: "Register new content on the blockchain",
      icon: <Shield className="h-6 w-6 text-guardian-primary" />,
      endpoint: "POST /api/v1/content/register",
      method: "POST",
      parameters: [
        { name: "title", type: "string", required: true, description: "Title of the content" },
        { name: "content", type: "string", required: true, description: "Content to register" },
        { name: "type", type: "string", required: true, description: "Content type (text/file)" },
        { name: "metadata", type: "object", required: false, description: "Additional metadata" }
      ],
      response: {
        success: {
          contentId: "string",
          timestamp: "string",
          transactionHash: "string"
        }
      }
    },
    {
      title: "Content Verification",
      description: "Verify content ownership",
      icon: <Zap className="h-6 w-6 text-guardian-secondary" />,
      endpoint: "POST /api/v1/content/verify",
      method: "POST",
      parameters: [
        { name: "content", type: "string", required: true, description: "Content to verify" },
        { name: "type", type: "string", required: true, description: "Content type (text/file)" }
      ],
      response: {
        success: {
          matchPercentage: "number",
          owner: "string",
          registrationDate: "string"
        }
      }
    },
    {
      title: "License Management",
      description: "Create and manage content licenses",
      icon: <Key className="h-6 w-6 text-guardian-accent" />,
      endpoint: "POST /api/v1/licenses/create",
      method: "POST",
      parameters: [
        { name: "contentId", type: "string", required: true, description: "ID of the content" },
        { name: "licenseType", type: "string", required: true, description: "Type of license" },
        { name: "permissions", type: "object", required: true, description: "License permissions" }
      ],
      response: {
        success: {
          licenseId: "string",
          licenseUrl: "string",
          expiryDate: "string"
        }
      }
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Server className="h-6 w-6 text-guardian-primary" />
            <CardTitle>Getting Started</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All API requests require authentication using an API key. Include your API key in the request header:
              </p>
              <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Base URL</h3>
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
                <code>https://api.contentguardian.com/v1</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Rate Limiting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                API requests are limited to 100 requests per minute per API key. Exceeding this limit will result in a 429 Too Many Requests response.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {endpoints.map((endpoint, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                {endpoint.icon}
                <CardTitle>{endpoint.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {endpoint.description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Endpoint</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
                  <code>{endpoint.method} {endpoint.endpoint}</code>
                </pre>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Required</th>
                        <th className="text-left p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.parameters.map((param, paramIndex) => (
                        <tr key={paramIndex} className="border-b">
                          <td className="p-2">{param.name}</td>
                          <td className="p-2">{param.type}</td>
                          <td className="p-2">{param.required ? "Yes" : "No"}</td>
                          <td className="p-2">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Response</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default APIPage; 