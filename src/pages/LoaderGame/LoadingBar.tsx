import { useEffect, useState } from "react";
import style from "./LoaderGame.module.scss";

interface LoadingBarProps {
  isLoaded: boolean;
  onSuccess: () => void;
}

export default function LoadingBar({ isLoaded, onSuccess }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  // фейковая загрузка до 69%
  useEffect(() => {
    if (!isLoaded) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p < 80) return p + 1;
          clearInterval(interval);
          return p;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  // когда пришёл ответ с сервера — плавно добиваем до 100%
  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p < 100) return p + 1;
          clearInterval(interval);
          return p;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (progress === 100) {
      onSuccess();
    }
  }, [progress]);

  const totalBars = 12;
  const filledBars = Math.round((progress / 100) * totalBars);

  return (
    <div className={style.boxBar}>
      {Array.from({ length: totalBars }).map((_, i) => {
        const isFilled = i < filledBars;
        const intensity = (i + 1) / totalBars;

        const topLightness = 62 - intensity * 12;
        const bottomLightness = 42 - intensity * 8;

        const topColor = `hsl(45, 100%, ${topLightness}%)`;
        const bottomColor = `hsl(42, 95%, ${bottomLightness}%)`;

        const filledStyle = isFilled
          ? {
              background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
              boxShadow:
                "0 0 10px rgba(255,215,100,0.28), 0 0 30px rgba(255,200,60,0.12)",
            }
          : undefined;
        return (
          <div
            key={i}
            className={`${style.item} ${isFilled ? style.filled : ""}`}
            style={filledStyle}
          />
        );
      })}
    </div>
  );
}
