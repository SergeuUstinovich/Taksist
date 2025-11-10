import toast from "react-hot-toast";
import { MenuSvg } from "../../assets/svg/MenuSvg/MenuSvg";
import { Button } from "../../ui/Button";
import style from "./NavBar.module.scss";
import { navData } from "./navData";
import { useLocation, useNavigate } from "react-router-dom";
import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const NavBar = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleNavigate = (path: string, isDisabled: boolean) => {
    if (!isDisabled) {
      navigate(path);
      if (path === '/' && location.pathname !== '/') {
        queryClient.invalidateQueries({ queryKey: ["info"] });
      }
    } else {
      toast.error('В разработке')
    }
  };
  return (
    <nav className={style.nav}>
      <ul className={style.list}>
        {navData.map((item) => (
          <li className={style.item} key={item.id}>
            <Button
              onClick={() => handleNavigate(item.path, item.isDisabled)}
              className={`${style.btn} ${location.pathname === item.path ? style.active : ""
                } ${item.isDisabled && style.disabled}`}
            >
              {item.svg}
            </Button>
          </li>
        ))}
        <li className={style.item}>
          <Button onClick={() => toast.error('В разработке')} className={`${style.btn} ${style.disabled}`}>
            <MenuSvg className={style.activeSvg} />
          </Button>
        </li>
      </ul>
    </nav>
  );
})
