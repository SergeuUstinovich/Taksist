import img from "../../assets/png/switchDevice.webp";
import { Button } from "../../ui/Button";
import style from "./BlockDevice.module.scss";

interface BlockDeviceProps {
  onClose: () => void;
}

export function BlockDevice({ onClose }: BlockDeviceProps) {
  return (
    <div className={style.box}>
      <div className={style.boxImg}>
        <img className={style.img} src={img} alt="switchDevice" />
        <div className={style.light} />
      </div>
      <p className={style.text}>Зайдите в приложение с мобильного устройства</p>
      <Button className={style.btnBlock} onClick={onClose} kind="three">
        Закрыть
      </Button>
    </div>
  );
}
