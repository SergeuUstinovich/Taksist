import { Outlet } from "react-router-dom";
import style from "./Layout.module.scss";
import { FooterBgSvg } from "../../assets/svg/FooterBgSvg/FooterBgSvg";
import { NavBar } from "../../components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { useQueryMain } from "../../utils/useQueryMain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mainActions } from "../../providers/StoreProvider/slice/mainSlice";

function Layout() {
  const { mainInfoQuery } = useQueryMain();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (mainInfoQuery.data) {
      dispatch(mainActions.initAuthData(mainInfoQuery.data));
    }
  }, [mainInfoQuery.data]);

  return (
    <div className={style.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <main className={style.main}>
        <Outlet />
      </main>
      <footer className={style.footer}>
        <div className={style.boxFooter}>
          <FooterBgSvg className={style.footerBg} />
          <NavBar />
        </div>
      </footer>
      <div className={style.helpBg} />
    </div>
  );
}

export default Layout;
