import { ReactNode } from "react";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.scss";
import { MagaCoinSvg } from "../../assets/svg/MagaCoinSvg/MagaCoinSvg";
import { formatCoins } from "../../helpers/formatCoin";
import { useSelector } from "react-redux";
import { getMainInfoSelector } from "../../providers/StoreProvider/selectors/getMainInfoSelector";
import { useIsFetching } from "@tanstack/react-query";
import { LoaderValue } from "../../ui/Loader/LoaderValue/LoaderValue";

interface HeaderProps {
  title: string;
  text?: string;
  svg?: ReactNode;
  path?: string;
}

export function Header({ title, text, svg, path }: HeaderProps) {
  const navigate = useNavigate();
  const mainInfo = useSelector(getMainInfoSelector);
  const isFetching = useIsFetching({ queryKey: ["info"] });

  const handleNavigate = () => {
    if (path) navigate(path);
  };

  const money = mainInfo?.money ?? 0;

  return (
    <div className={style.header}>
      <Button className={style.btn} onClick={handleNavigate}>
        <h1 className={style.title}>{title}</h1>
        {text && (
          <p className={style.text}>
            {text} {svg && svg}
          </p>
        )}
      </Button>
      <div className={style.balance}>
        <div className={style.boxSvg}>
          <MagaCoinSvg className={style.svg} />
        </div>
        {isFetching > 0 ? (
          <LoaderValue isBlack />
        ) : (
          <p className={style.value}>{formatCoins(money)}</p>
        )}
      </div>
    </div>
  );
}
