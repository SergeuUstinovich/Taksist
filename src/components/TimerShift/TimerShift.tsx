import { memo, useEffect, useMemo, useState } from "react";
import { TimerSvg } from "../../assets/svg/TimerSvg/TimerSvg";
import { Button } from "../../ui/Button";
import { classNames } from "../../utils/classNames";
import style from "./TimerShift.module.scss";
import { formatTime } from "../../helpers/formatTimer";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { goToLine } from "../../api/main";

interface ServerData {
  active: boolean;
  current_time: string;
  start_time: string | null;
}

export function TimerShift({ active, current_time, start_time }: ServerData) {
  const [isActive, setIsActive] = useState(active);
  const [display, setDisplay] = useState("00:00");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ["info"] });

  // Восстанавливаем состояние блокировки при монтировании
  useEffect(() => {
    const blockedUntil = localStorage.getItem("buttonBlockedUntil");
    if (blockedUntil) {
      const remainingTime = parseInt(blockedUntil) - Date.now();
      if (remainingTime > 0) {
        startCooldownTimer(remainingTime);
      } else {
        localStorage.removeItem("buttonBlockedUntil");
      }
    }
  }, []);

  useEffect(() => {
    if (!start_time || !active) return;

    const serverNow = new Date(current_time).getTime();
    const start = new Date(start_time).getTime();
    const offset = Date.now() - serverNow;

    const update = () => {
      const now = Date.now() - offset;
      const diff = Math.floor((now - start) / 1000);
      setDisplay(formatTime(diff));
    };
    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [active, current_time, start_time]);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const mutateGoTo = useMutation({
    mutationFn: () => goToLine(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["info"] });
      if (isButtonDisabled) return;
      const blockedUntil = Date.now() + 10000;
      localStorage.setItem("buttonBlockedUntil", blockedUntil.toString());
      setIsButtonDisabled(true);
      startCooldownTimer(10000);
    },
  });

  const startCooldownTimer = (duration: number) => {
    const endTime = Date.now() + duration;
    setIsButtonDisabled(true);

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setCooldownSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsButtonDisabled(false);
        localStorage.removeItem("buttonBlockedUntil");
      }
    }, 250); // можно чаще, чтобы точнее
  };

  const handleActive = () => {
    mutateGoTo.mutate();
  };

  const mods = {
    [style.active]: isActive,
  };

  return (
    <Button
      isLoading={mutateGoTo.isPending || isFetching > 0}
      isDisabled={isButtonDisabled}
      onClick={handleActive}
      className={classNames(style.btn, mods, [])}
    >
      {isActive ? (
        <>
          <TimerSvg className={style.svg} /> <FlipClock value={display} />{" "}
          Завершить
        </>
      ) : (
        <>
          <span className={style.span}>Выйти на смену</span>
          {isButtonDisabled && cooldownSeconds && (
            <span className={style.span}>
              {`(через ${cooldownSeconds} сек)`}
            </span>
          )}
        </>
      )}
    </Button>
  );
}

const FlipClock = memo(function FlipClock({ value }: { value: string }) {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value === prevValue) return;
    const timeout = setTimeout(() => setPrevValue(value), 500);
    return () => clearTimeout(timeout);
  }, [value, prevValue]);

  // вычисляем массив символов и флаги изменений только при смене value
  const digits = useMemo(() => {
    const current = value.split("");
    const previous = prevValue.split("");
    return current.map((char, i) => ({
      key: i,
      newValue: char,
      oldValue: previous[i] ?? "",
      isChanging: char !== previous[i],
    }));
  }, [value, prevValue]);

  return (
    <div className={style.flipClock}>
      {digits.map((d) => (
        <FlipDigit
          key={d.key}
          newValue={d.newValue}
          oldValue={d.oldValue}
          isChanging={d.isChanging}
        />
      ))}
    </div>
  );
});

const FlipDigit = memo(function FlipDigit({
  newValue,
  oldValue,
  isChanging,
}: {
  newValue: string;
  oldValue: string;
  isChanging: boolean;
}) {
  if (newValue === ":") {
    return <span className={style.separator}>:</span>;
  }

  return (
    <div className={style.digitWrapper}>
      {isChanging ? (
        <>
          <span className={`${style.digit} ${style.flipOut}`}>{oldValue}</span>
          <span className={`${style.digit} ${style.flipIn}`}>{newValue}</span>
        </>
      ) : (
        <span className={style.digit}>{newValue}</span>
      )}
    </div>
  );
});
