import { useIsFetching } from "@tanstack/react-query";
import { HoursPerSvg } from "../../assets/svg/HoursPerSvg/HoursPerSvg";
import { LeaderboarSvg } from "../../assets/svg/LeaderboarSvg/LeaderboarSvg";
import { MagaCoinSvg } from "../../assets/svg/MagaCoinSvg/MagaCoinSvg";
import { RybleSvg } from "../../assets/svg/RybleSvg/RybleSvg";
import { formatCoins } from "../../helpers/formatCoin";
import style from "./InfoMain.module.scss";
import { LoaderValue } from "../../ui/Loader/LoaderValue/LoaderValue";

interface InfoMainProps {
  maga: number;
  rybl: number;
  hour: number;
  raiting: number | string;
}

export function InfoMain({ maga, rybl, hour, raiting }: InfoMainProps) {
  const isFetching = useIsFetching({ queryKey: ["info"] });

  return (
    <div className={style.box}>
      <div className={style.boxInfo}>
        <div className={style.boxDouble}>
          <div className={style.valueBox}>
            <MagaCoinSvg className={style.svg} />
            <p className={style.text}>MAGA в час</p>
            {isFetching ? (
              <LoaderValue isBlack={false} />
            ) : (
              <span className={style.value}>{formatCoins(maga)}</span>
            )}
          </div>
          <div className={style.valueBox}>
            <HoursPerSvg className={style.svg} />
            <p className={style.text}>Часов на смене</p>
            {isFetching ? (
              <LoaderValue isBlack={false} />
            ) : (
              <span className={style.value}>{formatCoins(hour)}</span>
            )}
          </div>
        </div>
        <div className={style.line} />
        <div className={style.boxDouble}>
          <div className={style.valueBox}>
            <RybleSvg className={style.svg} />
            <p className={style.text}>Руб в час</p>
            {isFetching ? (
              <LoaderValue isBlack={false} />
            ) : (
              <span className={style.value}>{rybl}</span>
            )}
          </div>
          <div className={style.valueBox}>
            <LeaderboarSvg className={`${style.svg} ${style.leaderboard}`} />
            <p className={style.text}>Место в рейтинге</p>
            <span className={style.value}>{raiting}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
