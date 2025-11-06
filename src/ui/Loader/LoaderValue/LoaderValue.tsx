import { classNames } from "../../../utils/classNames";
import style from "./LoaderValue.module.scss";

interface LoaderValueProps {
  className?: string;
  isBlack: boolean;
}

export function LoaderValue({ className = "", isBlack }: LoaderValueProps) {
  return (
    <span
      style={
        isBlack
          ? { borderColor: "black", borderBottomColor: "transparent" }
          : { borderColor: "white", borderBottomColor: 'transparent' }
      }
      className={classNames(style.loader, {}, [className])}
    ></span>
  );
}
