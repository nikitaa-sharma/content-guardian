import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface Content {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  category: string;
}

const CATEGORIES = ["General", "Technology", "Entertainment", "Education", "Other"];

const DashboardPage = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedContents = localStorage.getItem("contents");
    if (savedContents) {
      setContents(JSON.parse(savedContents));
    } else {
      // Add sample content if no data exists
      const sampleContents: Content[] = [
        {
          id: "1",
          title: "Digital Art Collection",
          description: "A collection of unique digital artworks created using AI and traditional digital art techniques.",
          status: "approved",
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          category: "Technology"
        },
        {
          id: "2",
          title: "Educational Video Series",
          description: "A comprehensive series of educational videos covering various topics in science and technology.",
          status: "pending",
          createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          category: "Education"
        },
        {
          id: "3",
          title: "Music Album",
          description: "Original music compositions featuring electronic and acoustic elements.",
          status: "approved",
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          category: "Entertainment"
        },
        {
          id: "4",
          title: "Technical Documentation",
          description: "Detailed technical documentation for a new software framework.",
          status: "rejected",
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          category: "Technology"
        },
        {
          id: "5",
          title: "Photography Portfolio",
          description: "A collection of professional photographs showcasing urban landscapes.",
          status: "pending",
          createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          category: "General"
        }
      ];
      setContents(sampleContents);
      localStorage.setItem("contents", JSON.stringify(sampleContents));
    }
  }, []);

  // Save data to localStorage whenever contents change
  useEffect(() => {
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [contents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content: Content = {
      id: Date.now().toString(),
      title: newContent.title,
      description: newContent.description,
      status: "pending",
      createdAt: new Date().toISOString(),
      category: newContent.category,
    };
    setContents([...contents, content]);
    setNewContent({ title: "", description: "", category: "" });
    toast({
      title: "Content Added",
      description: "Your content has been submitted for review.",
    });
  };

  const handleStatusChange = (id: string, newStatus: Content["status"]) => {
    setContents(
      contents.map((content) =>
        content.id === id ? { ...content, status: newStatus } : content
      )
    );
    toast({
      title: "Status Updated",
      description: `Content status has been updated to ${newStatus}.`,
    });
  };

  const handleDelete = (id: string) => {
    setContents(contents.filter((content) => content.id !== id));
    toast({
      title: "Content Deleted",
      description: "The content has been deleted successfully.",
    });
  };

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || content.category === selectedCategory;
    const matchesStatus = activeTab === "all" || content.status === activeTab;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statistics = {
    total: contents.length,
    pending: contents.filter((c) => c.status === "pending").length,
    approved: contents.filter((c) => c.status === "approved").length,
    rejected: contents.filter((c) => c.status === "rejected").length,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statistics.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newContent.title}
                onChange={(e) =>
                  setNewContent({ ...newContent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newContent.category}
                onValueChange={(value) =>
                  setNewContent({ ...newContent, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newContent.description}
                onChange={(e) =>
                  setNewContent({ ...newContent, description: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Submit Content</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-6">
          {filteredContents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{content.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {content.category}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(content.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{content.description}</p>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    content.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : content.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {content.status}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(content.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(content.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 