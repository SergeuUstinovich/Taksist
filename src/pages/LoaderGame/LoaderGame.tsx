import { useEffect, useState } from "react";
import { navigator } from "../../navigator";
import gif from "../../assets/gif/loaderGif.gif";
import style from "./LoaderGame.module.scss";
import LoadingBar from "./LoadingBar";
import { useQueryMain } from "../../utils/useQueryMain";
import { LoaderPage } from "../../ui/Loader/LoaderPage";

export function LoaderGame() {
  const { createSessionQuery, mainInfoQuery } = useQueryMain();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const updateRoute = () => {
        navigator.replace("/");
        navigator.push("/");
        navigator.push("/");
      };
      const timeot = setTimeout(() => {
        updateRoute();
      }, 300);
      return () => clearTimeout(timeot);
    }
  }, [isSuccess]);

  const handleIsState = () => {
    setIsSuccess(true);
  };

  useEffect(() => {
    createSessionQuery.refetch();
  }, []);

  return (
    <div className={style.box}>
      <div style={!loaded ? { width: '216px', height: '216px' } : {}} className={style.boxGif}>
        <img
          onLoad={() => setLoaded(true)}
          className={style.gif}
          src={gif}
          alt=""
        />
        {!loaded && <LoaderPage className={style.loader} />}
        <div className={style.light} />
      </div>
      <p className={style.text}>
        Загрузка
        <span className={style.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
      <LoadingBar
        onSuccess={handleIsState}
        isLoaded={mainInfoQuery.isSuccess}
      />
    </div>
  );
}
