import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
  alt: string;
  fallbackSrc?: string;
  size?: number;
  className?: string;
}

const DEFAULT_AVATAR: string = '/avatars/default.svg';

const isValidUrl = (url: string | null | undefined): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const Avatar = ({
  src,
  alt,
  fallbackSrc = DEFAULT_AVATAR,
  size = 48,
  className = '',
}: AvatarProps) => {
  const [error, setError] = useState<boolean>(false);
  const imageUrl: string = isValidUrl(src) ? src : fallbackSrc;

  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={error ? fallbackSrc : imageUrl}
        alt={alt}
        fill
        sizes='100vw'
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}; 