import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextareaAutosize from 'react-textarea-autosize';
import { Bold, Italic, List, ListOrdered, Link, Image, Code, Heading1, Heading2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  minRows = 10,
  maxRows = 50,
}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown('# ', '\n'), tooltip: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('## ', '\n'), tooltip: 'Heading 2' },
    { icon: Bold, action: () => insertMarkdown('**', '**'), tooltip: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), tooltip: 'Italic' },
    { icon: List, action: () => insertMarkdown('- ', '\n'), tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. ', '\n'), tooltip: 'Numbered List' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), tooltip: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), tooltip: 'Image' },
    { icon: Code, action: () => insertMarkdown('`', '`'), tooltip: 'Inline Code' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className="p-2 hover:bg-gray-200 rounded transition-colors duration-200"
              title={button.tooltip}
            >
              <button.icon className="h-4 w-4 text-gray-700" />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
              !showPreview
                ? 'bg-ocean-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
              showPreview
                ? 'bg-ocean-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="p-4">
        {!showPreview ? (
          <TextareaAutosize
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            minRows={minRows}
            maxRows={maxRows}
            className="w-full resize-none focus:outline-none font-mono text-sm leading-relaxed text-gray-900"
          />
        ) : (
          <div className="prose prose-lg prose-slate max-w-none min-h-[200px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              remarkRehypeOptions={{ handlers: {} }}
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
              }}
            >
              {value || '*No content to preview*'}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
        {value.length} characters | Supports{' '}
        <a
          href="https://www.markdownguide.org/basic-syntax/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ocean-500 hover:text-ocean-600 underline"
        >
          Markdown syntax
        </a>
      </div>
    </div>
  );
};

export default MarkdownEditor;
