import { ReactNode, useState, useRef, useEffect, useLayoutEffect } from "react";
import style from "./SlidingPanel.module.scss";
import { classNames } from "../../utils/classNames";
import Portal from "../Portal/Portal";
// import { Button } from "../Button";

interface SlidingPanelProps {
  initialHeight?: string;
  fullHeight?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  darkened?: boolean;
  className?: string;
  lazy?: boolean;
  // cross?: boolean;
  paddingBot?: number;
  paddingRightLeft?: number;
  paddingTop?: number;
}

export function SlidingPanel(props: SlidingPanelProps) {
  const {
    initialHeight = "0",
    fullHeight = "0",
    children,
    isOpen,
    onClose,
    darkened,
    className = "",
    lazy,
    // cross,
    paddingBot = 16,
    paddingRightLeft = 16,
    paddingTop = 16,
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState(initialHeight);
  const [contentHeight, setContentHeight] = useState(initialHeight);
  // const panelRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();
  const direction = useRef<"up" | "down" | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Используем useLayoutEffect для синхронного обновления высоты
  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (!contentRef.current) return;
        const contentHeightPx = contentRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.9;

        if (initialHeight === "0") {
          if (contentHeightPx > maxHeight) {
            setCurrentHeight(parseInt(fullHeight) === 0 ? "90svh" : fullHeight);
          } else {
            setCurrentHeight(`${contentHeightPx + paddingBot + paddingTop}px`);
            setContentHeight(`${contentHeightPx + paddingBot + paddingTop}px`);
          }
        } else {
          setCurrentHeight(initialHeight);
        }
      });
      resizeObserver.observe(contentRef.current);

      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current);
        }
      };
    }
  }, [isOpen, children, paddingBot, paddingTop, isMounted]);

  // Логика для закрытия панели
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(style.bodyOpen);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
      document.body.classList.remove(style.bodyOpen);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = parseInt(currentHeight);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
  };

  const handleMouseMove = (e: TouchEvent) => {
    const deltaY = startY.current - e.touches[0].clientY;
    const newHeight = startHeight.current + deltaY;

    // Определяем направление движения
    if (deltaY > 0) {
      direction.current = "up";
    } else {
      direction.current = "down";
    }

    // Преобразуем fullHeight и initialHeight в числа
    const fullHeightValue = parseFloat(fullHeight);
    const initialHeightValue = parseFloat(initialHeight);

    if (!isNaN(fullHeightValue) && !isNaN(initialHeightValue)) {
      if (newHeight >= fullHeightValue && fullHeightValue !== 0) {
        setCurrentHeight(fullHeight);
      } else if (newHeight <= parseInt(currentHeight)) {
        if (initialHeight === "0") {
          setCurrentHeight(contentHeight);
        } else {
          setCurrentHeight(initialHeight);
        }
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("touchmove", handleMouseMove);
    document.removeEventListener("touchend", handleMouseUp);

    if (
      direction.current === "down" &&
      parseInt(currentHeight) ===
        parseInt(initialHeight === "0" ? contentHeight : initialHeight)
    ) {
      setCurrentHeight("0");
      if (onClose) {
        timeRef.current = setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      if (onClose) {
        timeRef.current = setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };

  const handlePopState = () => {
    if (isOpen) {
      if (onClose) {
        timeRef.current = setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCrossClose = () => {
    if (isOpen) {
      if (onClose) {
        setCurrentHeight("0");
        timeRef.current = setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };

  const mods: Record<string, boolean | undefined> = {
    [style.visible]: isOpen,
    [style.darkened]: !isOpen ? false : darkened,
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        onClick={handleCrossClose}
        // ref={panelRef}
        className={classNames(style.slidingPanel, mods, [
          "app_modal",
          className,
        ])}
        style={
          !darkened
            ? {
                height: isOpen ? currentHeight : "0",
                bottom: isOpen ? "0" : `-90vh`,
                transition: "height 0.3s ease",
              }
            : {}
        }
      >
        <div
          onClick={onContentClick}
          className={style.sliding}
          style={
            darkened
              ? {
                  height: isOpen ? currentHeight : "0",
                  bottom: isOpen ? "0" : `-90vh`,
                  transition: "height 0.3s ease",
                }
              : {}
          }
        >
          <div
            style={{
              paddingTop: `${paddingTop}px`,
            }}
            className={style.overlay}
          >
            <div onTouchStart={handleMouseDown} className={style.dragZone}>
              <div className={style.dragHandle} />
            </div>
            {/* {cross && (
              <Button onClick={handleCrossClose} className={style.closeCross}>
                <img className={style.img} src={imgCross} alt="" />
              </Button>
            )} */}
            <div className={style.panelContent}>
              <div
                style={{
                  padding: `0 ${paddingRightLeft}px`,
                  paddingBottom: `${paddingBot}px`,
                }}
                ref={contentRef}
                className={style.boxContent}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
