import { classNames } from "../../../utils/classNames";
import style from "./LoaderButton.module.scss";

interface LoaderBtnProps {
  className?: string
}

export const LoaderButton = ({className = ''}: LoaderBtnProps) => (
    <span className={classNames(style.loader, {}, [className])}></span>
);
