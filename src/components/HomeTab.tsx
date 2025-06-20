import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const HomeTab: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Content Guardian Shield
          </CardTitle>
          <CardDescription className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Protecting Your Digital Assets with Blockchain Technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure your content, verify ownership, and protect your intellectual property with our advanced blockchain-based verification system.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <CardTitle className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              Blockchain Verification
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            This content has been immutably recorded on the <span className="font-semibold text-emerald-600 dark:text-emerald-400">Ethereum blockchain</span>. The record is <span className="font-semibold text-emerald-600 dark:text-emerald-400">permanent and verifiable</span>, ensuring authenticity and ownership protection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeTab; 