import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { DEV_MODE } from "./config";
import {
  postEvent,
  useLaunchParams,
  on,
  initMiniApp,
} from "@telegram-apps/sdk-react";
import { navigator } from "./navigator";
import eruda from "eruda";
import { blockDevtools } from "./helpers/blockDevtools";
import { BlockOrientation } from "./components/BlockOrientation/BlockOrientation";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { LoaderPage } from "./ui/Loader/LoaderPage";
import style from "./styles/global/App.module.scss";
import { LoaderGame } from "./pages/LoaderGame/LoaderGame";
import { SlidingPanel } from "./ui/SlidingPanel/SlidingPanel";
import imgExit from "./assets/png/exitImg.webp";
import { Button } from "./ui/Button";
import { BlockDevice } from "./components/BlockDevice/BlockDevice";

const Layout = lazy(() => import("./pages/Layout/Layout"));
const Home = lazy(() => import("./pages/Home/Home"));

const [miniApp] = !DEV_MODE ? initMiniApp() : [{ close: () => {} }];

function App() {
  const [location, reactNavigator] = useIntegration(navigator);
  const [closeWindow, setCloseWindow] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const lp = useLaunchParams();

  useEffect(() => {
    const handleLoad = () => {
      blockDevtools(lp.platform);
    };
    postEvent("web_app_set_header_color", { color: "#161620" });
    postEvent("web_app_set_background_color", { color: "#161620" });
    postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
    postEvent("web_app_expand");

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const isMobile = lp.platform === "android" || lp.platform === "ios";
    if (!isMobile) {
      setBlocked(true);
    }
  }, [lp.platform]);

  useEffect(() => {
    if (DEV_MODE) {
      eruda.init();
    } else {
      navigator.attach();
    }
    const handleBackPress = () => {
      navigator.on(
        "change",
        (e) => {
          if (e.delta > -1) return;
          const isRootWithoutParams =
            e.from.pathname === "/" && !e.from.search && !e.from.hash;
          if (isRootWithoutParams) {
            navigator.push(e.from.pathname);
            setCloseWindow(true);
            return false;
          }
        },
        true
      );
    };

    const removeBackListener = on("back_button_pressed", handleBackPress);
    return () => {
      removeBackListener();
      navigator.detach();
    };
  }, []);

  const handleCloseExit = () => {
    setCloseWindow(false);
  };

  return (
    <>
      {!DEV_MODE && <BlockOrientation />}
      <Router location={location} navigator={reactNavigator}>
        {blocked ? (
          <BlockDevice onClose={() => miniApp.close()} />
        ) : (
          <Suspense fallback={<LoaderPage className={style.loaderPage} />}>
            <Routes>
              <Route path={"/"} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={"tarif"} element={<div>tarif</div>} />
                <Route path={"shop"} element={<div>shop</div>} />
                <Route path={"leaderboar"} element={<div>leaderboar</div>} />
                <Route path={"loader"} element={<LoaderGame />} />
              </Route>
            </Routes>
          </Suspense>
        )}
      </Router>
      <SlidingPanel
        paddingTop={24}
        paddingRightLeft={24}
        paddingBot={14}
        darkened
        isOpen={closeWindow}
        onClose={handleCloseExit}
      >
        <div className={style.boxExit}>
          <img src={imgExit} alt="exit" />
          <p className={style.textExit}>Вы действительно хотите выйти?</p>
          <div className={style.btnExitBox}>
            <Button onClick={handleCloseExit} kind="secondary">Остаться</Button>
            <Button onClick={() => miniApp.close()} kind="three">Выйти из приложения</Button>
          </div>
        </div>
      </SlidingPanel>
    </>
  );
}

export default App;
