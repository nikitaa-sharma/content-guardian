import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Search, Lock, CheckCircle, Code } from 'lucide-react';

const DocumentationPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Content Guardian Shield to protect your digital content.",
      icon: <Shield className="h-6 w-6 text-guardian-primary" />,
      content: [
        "Create an account and set up your profile",
        "Understand the dashboard interface",
        "Learn about content registration process",
        "Explore verification methods"
      ]
    },
    {
      title: "Content Registration",
      description: "Step-by-step guide to registering your content on the blockchain.",
      icon: <FileText className="h-6 w-6 text-guardian-secondary" />,
      content: [
        "Supported content types",
        "Registration process",
        "Content ID generation",
        "Storage options"
      ]
    },
    {
      title: "Verification Process",
      description: "How to verify content ownership and authenticity.",
      icon: <Search className="h-6 w-6 text-guardian-accent" />,
      content: [
        "Text verification",
        "File verification",
        "Image verification",
        "Verification results interpretation"
      ]
    },
    {
      title: "Licensing System",
      description: "Understanding and managing content licenses.",
      icon: <Lock className="h-6 w-6 text-guardian-primary" />,
      content: [
        "License types",
        "Creating licenses",
        "Managing permissions",
        "License tracking"
      ]
    },
    {
      title: "API Integration",
      description: "Technical documentation for developers.",
      icon: <Code className="h-6 w-6 text-guardian-secondary" />,
      content: [
        "API endpoints",
        "Authentication",
        "Request/Response formats",
        "Rate limiting"
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                {section.icon}
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-guardian-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentationPage; 