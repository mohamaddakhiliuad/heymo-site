import { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaRegCopy, FaPaperPlane } from 'react-icons/fa';

const IconButton = ({ onClick, children, title }: any) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 rounded-full hover:bg-gray-100 transition"
  >
    {children}
  </button>
);

const showToast = (message: string) => {
  alert(message);
};

const getCurrentUrl = () => (typeof window !== 'undefined' ? window.location.href : '');

export default function SocialShareButtons({ title = 'Check this out!', summary = '' }) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(getCurrentUrl());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center mt-6">
      <span className="text-sm text-gray-500">Share with others:</span>

      <IconButton onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}>
        <FaFacebook className="h-5 w-5" />
      </IconButton>

      <IconButton onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank')}>
        <FaTwitter className="h-5 w-5" />
      </IconButton>

      <IconButton onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`, '_blank')}>
        <FaLinkedin className="h-5 w-5" />
      </IconButton>

      <IconButton onClick={handleCopy}>
        <FaRegCopy className="h-5 w-5" />
      </IconButton>

      <IconButton onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${summary}\n\n${shareUrl}`)}`, '_blank')}>
        <FaPaperPlane className="h-5 w-5" />
      </IconButton>
    </div>
  );
}
