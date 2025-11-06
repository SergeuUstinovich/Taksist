import { GarageSvg } from "../../assets/svg/GarageSvg/GarageSvg";
import { LeaderboarSvg } from "../../assets/svg/LeaderboarSvg/LeaderboarSvg";
import { ShopSvg } from "../../assets/svg/ShopSvg/ShopSvg";
import { TarifSvg } from "../../assets/svg/TarifSvg/TarifSvg";
import style from './NavBar.module.scss'

export const navData = [
    {
        id: '1',
        svg: <TarifSvg className={style.activeSvg} />,
        path: '/tarif',
        isDisabled: true,
    },
    {
        id: '2',
        svg: <ShopSvg className={style.activeSvg} />,
        path: '/shop',
        isDisabled: true,
    },
    {
        id: '3',
        svg: <GarageSvg className={style.activeSvg} />,
        path: '/',
        isDisabled: false,
    },
    {
        id: '4',
        svg: <LeaderboarSvg className={style.activeSvg} />,
        path: '/leaderboar',
        isDisabled: true,
    },
]