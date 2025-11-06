import style from "./LoaderPage.module.scss";
import { classNames } from "../../../utils/classNames";

interface LoaderPageProps {
  className?: string
}

export const LoaderPage = ({className = ''}:LoaderPageProps) => (
  <div className={className}>
    <span className={classNames(style.loader, {}, [])}></span>
  </div>
  
);
