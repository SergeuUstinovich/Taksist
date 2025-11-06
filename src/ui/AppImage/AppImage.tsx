import {
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState,
} from "react";

interface AppImage extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactElement;
  className?: string;
  errFallback?: ReactElement;
}

export function AppImage(props: AppImage) {
  const { className, src, alt = "image", errFallback, fallback, ...otherProps } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasErr, setHasErr] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? "";
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasErr(true)
    }
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasErr && errFallback) {
    return errFallback;
  }

  return <img className={className} src={src} alt={alt} {...otherProps} />;
}
