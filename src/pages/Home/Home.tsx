import { CloseSvg } from "../../assets/svg/CloseSvg/CloseSvg";
import { Header } from "../../components/Header/Header";
import { AppImage } from "../../ui/AppImage/AppImage";
import car from "../../assets/png/car.webp";
import style from "./Home.module.scss";
import { InfoMain } from "../../components/InfoMain/InfoMain";
import { TimerShift } from "../../components/TimerShift/TimerShift";
import { useSelector } from "react-redux";
import { getMainInfoSelector } from "../../providers/StoreProvider/selectors/getMainInfoSelector";
import { LoaderPage } from "../../ui/Loader/LoaderPage";

function Home() {
  const mainInfo = useSelector(getMainInfoSelector);
  const hours = mainInfo?.all_hours_on_line ?? 0;
  return (
    <div className={style.home}>
      <Header title={"Эконом"} text={"Сменить тариф"} svg={<CloseSvg />} />
      <AppImage src={car} />
      <InfoMain maga={100} rybl={50} hour={hours} raiting={"-"} />
      {mainInfo ? (
        <TimerShift
          active={mainInfo.active}
          current_time={mainInfo.current_time}
          start_time={mainInfo.start_time}
        />
      ) : (
        <LoaderPage className={style.loaderTime} />
      )}
    </div>
  );
}

export default Home;
