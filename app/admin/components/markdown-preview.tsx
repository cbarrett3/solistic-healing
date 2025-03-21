'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

// Custom renderer that completely avoids nesting issues
export default function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className={`text-muted-foreground text-sm italic ${className}`}>
        No content to preview
      </div>
    );
  }

  // Pre-process the content to extract images
  // This prevents images from being rendered inside paragraphs
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  const images: { alt: string; src: string; placeholder: string }[] = [];
  
  // Replace images with placeholders
  const processedContent = content.replace(imageRegex, (match, alt, src) => {
    const placeholder = `__IMAGE_PLACEHOLDER_${images.length}__`;
    images.push({ alt, src, placeholder });
    return placeholder;
  });

  // Custom image component that will be inserted separately
  const ImageComponent = ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-4">
      <img 
        src={src} 
        alt={alt || ''} 
        className="rounded-md max-w-full max-h-[400px] object-contain" 
      />
      {alt && (
        <div className="text-xs text-muted-foreground text-center mt-1">
          {alt}
        </div>
      )}
    </div>
  );

  // Split the content by image placeholders and render each part
  const renderParts = () => {
    // First render the markdown to HTML
    const markdownElement = (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-xl font-semibold mb-4 mt-6" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mb-3 mt-5" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-md font-semibold mb-2 mt-4" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-muted/30 p-3 rounded-md overflow-x-auto my-4">
                <code className="text-sm font-mono" {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    );

    // Get the HTML string representation
    const tempDiv = document.createElement('div');
    
    // Use a safer approach that doesn't rely on props access
    const htmlParts: string[] = [];
    
    // Process the content by splitting at image placeholders
    let currentContent = processedContent;
    
    images.forEach(image => {
      const parts = currentContent.split(image.placeholder);
      if (parts.length > 1) {
        htmlParts.push(parts[0]);
        currentContent = parts.slice(1).join(image.placeholder);
      }
    });
    
    // Add any remaining content
    if (currentContent) {
      htmlParts.push(currentContent);
    }
    
    // Create the final elements array with interspersed images
    const elements: React.ReactNode[] = [];
    
    htmlParts.forEach((part, index) => {
      // Add the text content
      if (part) {
        elements.push(
          <ReactMarkdown 
            key={`content-${index}`}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-xl font-semibold mb-4 mt-6" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mb-3 mt-5" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-md font-semibold mb-2 mt-4" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
              a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
              ),
              code: ({ node, className, children, ...props }: any) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-muted/30 p-3 rounded-md overflow-x-auto my-4">
                    <code className="text-sm font-mono" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {part}
          </ReactMarkdown>
        );
      }
      
      // Add the image if there is one
      if (index < images.length) {
        elements.push(
          <ImageComponent 
            key={`image-${index}`}
            src={images[index].src} 
            alt={images[index].alt} 
          />
        );
      }
    });
    
    return elements;
  };

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      {renderParts()}
    </div>
  );
}
