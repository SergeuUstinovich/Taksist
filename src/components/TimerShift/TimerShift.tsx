import { useState } from "react";
import { TimerSvg } from "../../assets/svg/TimerSvg/TimerSvg";
import { Button } from "../../ui/Button";
import { classNames } from "../../utils/classNames";
import style from "./TimerShift.module.scss";

interface ServerData {
  active: boolean;
  current_time: string;
  start_time: string | null;
};

export function TimerShift({active, current_time, start_time}: ServerData) {
  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive((prev) => !prev);
  };
  const mods = {
    [style.active]: isActive,
  };

  return (
    <Button onClick={handleActive} className={classNames(style.btn, mods, [])}>
      {isActive ? (
        <>
          <TimerSvg className={style.svg} /> 12:32 Завершить
        </>
      ) : (
        "Выйти на смену"
      )}
    </Button>
  );
}
