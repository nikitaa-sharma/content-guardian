import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Image, Database, Loader2, Copy } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface RegisteredContent {
  id: string;
  title: string;
  type: 'text' | 'file';
  content: string;
  timestamp: string;
}

const ContentRegistrationSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [registeredContent, setRegisteredContent] = useState<RegisteredContent | null>(null);
  const navigate = useNavigate();

  const generateContentId = () => {
    return `CG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }
    
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text content to register.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate blockchain registration
    setTimeout(() => {
      const contentId = generateContentId();
      const newContent: RegisteredContent = {
        id: contentId,
        title: title.trim(),
        type: 'text',
        content: text.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Get existing content from localStorage
      const existingContent = localStorage.getItem('registeredContent');
      const allContent = existingContent ? JSON.parse(existingContent) : [];
      
      // Add new content
      allContent.push(newContent);
      
      // Save to localStorage
      localStorage.setItem('registeredContent', JSON.stringify(allContent));
      
      setRegisteredContent(newContent);
      setIsUploading(false);
      
      toast({
        title: "Content Registered Successfully",
        description: `Your content has been registered with ID: ${contentId}`,
      });
    }, 2000);
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }
    
    if (!file) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate blockchain registration
    setTimeout(() => {
      const contentId = generateContentId();
      const newContent: RegisteredContent = {
        id: contentId,
        title: title.trim(),
        type: 'file',
        content: file.name,
        timestamp: new Date().toISOString()
      };
      
      // Get existing content from localStorage
      const existingContent = localStorage.getItem('registeredContent');
      const allContent = existingContent ? JSON.parse(existingContent) : [];
      
      // Add new content
      allContent.push(newContent);
      
      // Save to localStorage
      localStorage.setItem('registeredContent', JSON.stringify(allContent));
      
      setRegisteredContent(newContent);
      setIsUploading(false);
      
      toast({
        title: "Content Registered Successfully",
        description: `Your file "${file.name}" has been registered with ID: ${contentId}`,
      });
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const copyContentId = () => {
    if (registeredContent) {
      navigator.clipboard.writeText(registeredContent.id);
      toast({
        title: "Content ID Copied",
        description: "The content ID has been copied to your clipboard.",
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Register New Content</CardTitle>
              <CardDescription>
                Choose how you want to register your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Content</TabsTrigger>
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter content title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text">Content</Label>
                      <Textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your content"
                        className="min-h-[200px]"
                      />
                    </div>
                    <Button type="submit" disabled={isUploading} className="w-full">
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Register Content
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="file">
                  <form onSubmit={handleFileSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-title">Title</Label>
                      <Input
                        id="file-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter content title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">File</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="file"
                          type="file"
                          onChange={handleFileChange}
                          className="flex-1"
                        />
                        {file && (
                          <span className="text-sm text-gray-500">
                            {file.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button type="submit" disabled={isUploading} className="w-full">
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload & Register
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Registration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
              <CardDescription>
                View your registered content details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {registeredContent ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Content Registered Successfully
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Content ID:</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                            {registeredContent.id}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyContentId}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Title:</span>
                        <p className="mt-1">{registeredContent.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Type:</span>
                        <p className="mt-1 capitalize">{registeredContent.type}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Registered:</span>
                        <p className="mt-1">
                          {new Date(registeredContent.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/license')}
                      className="w-full mt-4"
                    >
                      Create License
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No content registered yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentRegistrationSection;
