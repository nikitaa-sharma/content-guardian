import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Content Guardian Shield?",
          answer: "Content Guardian Shield is a blockchain-based platform that helps content creators protect their digital assets by registering them on the Ethereum blockchain. It provides proof of ownership, verification tools, and licensing management capabilities."
        },
        {
          question: "How does blockchain protection work?",
          answer: "When you register your content, we create a unique digital fingerprint (hash) of your content and store it on the Ethereum blockchain. This creates an immutable record of your ownership that can be verified at any time."
        },
        {
          question: "What types of content can I protect?",
          answer: "You can protect various types of digital content including text, images, documents, and other digital files. The platform supports multiple file formats and content types."
        }
      ]
    },
    {
      category: "Registration & Verification",
      questions: [
        {
          question: "How do I register my content?",
          answer: "You can register your content through our user-friendly interface. Simply upload your file or paste your text content, provide a title and description, and our system will handle the blockchain registration process."
        },
        {
          question: "How long does registration take?",
          answer: "Registration typically takes a few minutes. The exact time depends on the size of your content and current network conditions. You'll receive a confirmation once the registration is complete."
        },
        {
          question: "How do I verify content ownership?",
          answer: "You can verify content ownership by uploading the content you want to check. Our system will compare it against registered content in our database and provide a match percentage and ownership details."
        }
      ]
    },
    {
      category: "Licensing & Usage",
      questions: [
        {
          question: "What licensing options are available?",
          answer: "We offer various licensing options including standard, exclusive, and creative commons licenses. You can customize permissions for commercial use, modifications, and set royalty percentages."
        },
        {
          question: "How do I manage my licenses?",
          answer: "You can manage your licenses through the dashboard. View active licenses, modify terms, and track usage all in one place."
        },
        {
          question: "Can I transfer ownership of my content?",
          answer: "Yes, you can transfer ownership of your registered content to another user. This process requires both parties to confirm the transfer and is recorded on the blockchain."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "Is my content stored on the blockchain?",
          answer: "No, only the content hash and metadata are stored on the blockchain. The actual content is stored securely on our servers and IPFS network."
        },
        {
          question: "What happens if the blockchain network is congested?",
          answer: "Our system includes fallback mechanisms and queue management to handle network congestion. We also provide status updates during the registration process."
        },
        {
          question: "How secure is my content?",
          answer: "We implement multiple layers of security including encryption, secure storage, and blockchain verification. Your content is protected both during storage and transmission."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      <div className="grid gap-6">
        {faqs.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQPage; 