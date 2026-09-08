import Image from "next/image";

interface ImageLogoProps {
  src?: string;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const ImageLogo = ({
  src = "/logo.png",
  className,
  width = 50,
  height = 50,
  alt = "CloakShield logo",
}: ImageLogoProps) => {
  return (
    <Image
      loading="eager"
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ImageLogo;
