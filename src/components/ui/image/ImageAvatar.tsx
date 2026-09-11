"use client";
import Image from "next/image";
import { useState } from "react";

interface ImageAvatarProps {
  src: string;
  alt?: string;
  size?: number;
  fallbackText?: string;
}

const ImageAvatar = ({
  src,
  alt = "avatar",
  size = 48,
  fallbackText = "?",
}: ImageAvatarProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e7eb",
        border: "2px solid #ffffff",
        boxShadow: "0 0 0 1px #d1d5db",
        flexShrink: 0,
      }}
    >
      {!imgError && src ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <span
          style={{
            fontSize: size * 0.4,
            color: "#6b7280",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {fallbackText}
        </span>
      )}
    </div>
  );
};

export default ImageAvatar;
