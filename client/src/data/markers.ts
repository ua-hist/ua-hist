import { MarkerIcon, MarkerInfo } from "../api/get-markers";
import { TimedData } from "../utils/timed-data";
import { v4 as uuid } from "uuid";
import cityIconUrl from "../assets/fortress_icon.jpg";
import fireIconUrl from "../assets/fire_icon2.webp";
import battleIconUrl from "../assets/battle_icon.png";
import siegeIconUrl from "../assets/siege_icon.png";
import { markersTempKyivanRulers } from "./rulers/kyivan_rus/kyivan_rulers";
import { markersTempByzantineRulers } from "./rulers/byzantine/byzantine_rulers";

const cityIcon: MarkerIcon = {
  iconUrl: cityIconUrl,
  iconSize: [15, 15],
  iconAnchor: [0, 0],
};

const fireIcon: MarkerIcon = {
  iconUrl: fireIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
};

const battleIcon: MarkerIcon = {
  iconUrl: battleIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
};

const siegeIcon: MarkerIcon = {
  iconUrl: siegeIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
};

const markersTemp: TimedData<MarkerInfo>[] = [
  [
    {
      pos: [48.153889, 23.133056],
      desc: "Королевська стоянка",
      label: "Королевська стоянка",
      icon: cityIcon,
    },
    -1000000,
  ],
  [
    {
      pos: [46.981, 31.983],
      desc: "Місто людей кімерійських (Кімерополіс/Алібант)",
      label: "Кімерополіс",
      icon: cityIcon,
    },
    -1250,
  ],
  [
    {
      pos: [46.7, 31.9],
      desc: "О́львія (дав.-гр. Ὀλβία — «Щаслива») (Сабія, далі Борисфеніда, ще далі Ольвія чи Ольвіополіс) — найважливіша грецька колонія в Нижньому Побужжі, у дельті Гіпаніса (Бугу) та Борисфена (Дніпра), заснована вихідцями з Мілета в 647—646 р. до н. е.",
      label: "Ὀλβία",
      icon: cityIcon,
    },
    [-600, 270],
  ],
  [
    {
      pos: [46.7, 31.9],
      desc: "",
      label: "Ὀλβία",
      icon: fireIcon,
    },
    270,
  ],
  [
    {
      pos: [46.201111, 30.350556],
      desc: "",
      label: "Τύρας",
      icon: cityIcon,
    },
    [-502, 270],
  ],
  [
    {
      pos: [46.201111, 30.350556],
      desc: "",
      label: "Τύρας",
      icon: fireIcon,
    },
    270,
  ],
  [
    {
      pos: [45.350833, 36.468611],
      desc: "Пантікапе́й (грец. Παντικάπαιον  можливо від іранського Panti-Kapa рибний шлях) — давньогрецький поліс, що існував на місці сучасного міста Керч; столиця Боспорського царства.",
      label: "Παντικάπαιον",
      icon: cityIcon,
    },
    [-600, 378],
  ],
  [
    {
      pos: [45.350833, 36.468611],
      desc: "",
      label: "Παντικάπαιον",
      icon: fireIcon,
    },
    378,
  ],
  [
    {
      pos: [45.048889, 35.379167],
      desc: "",
      label: "Θεοδοσία",
      icon: cityIcon,
    },
    [-550, 378],
  ],
  [
    {
      pos: [45.048889, 35.379167],
      desc: "",
      label: "Θεοδοσία",
      icon: fireIcon,
    },
    378,
  ],
  [
    {
      pos: [45.188011, 33.373461],
      desc: "",
      label: "Κερκινίτις",
      icon: cityIcon,
    },
    [-550, 378],
  ],
  [
    {
      pos: [45.188011, 33.373461],
      desc: "",
      label: "Κερκινίτις",
      icon: fireIcon,
    },
    378,
  ],
  [
    {
      pos: [44.611667, 33.493333],
      desc: "",
      label: "Χερσόνησος",
      icon: cityIcon,
    },
    [-528, 378],
  ],
  [
    {
      pos: [44.611667, 33.493333],
      desc: "",
      label: "Χερσόνησος",
      icon: fireIcon,
    },
    378,
  ],
  [
    {
      pos: [49, 4.5],
      desc: "",
      label: "Battle of the Catalaunian Plains",
      icon: battleIcon,
    },
    451,
  ],
  [
    {
      pos: [41.0125, 28.98],
      desc: "",
      label: "Облога гунами Константинополя",
      icon: siegeIcon,
    },
    451,
  ],
  [
    {
      pos: [47.821667, 31.175],
      desc: "",
      label: "Битва на Південному Бузі",
      icon: battleIcon,
    },
    896,
  ],
  [
    {
      pos: [51.705222, 30.661667],
      desc: "",
      label: "Битва під Любечем",
      icon: battleIcon,
    },
    1016,
  ],
  ...markersTempKyivanRulers,
  ...markersTempByzantineRulers,
];

export const markersWithDates: TimedData<MarkerInfo>[] = markersTemp.map(
  ([marker, timeInfo]): TimedData<MarkerInfo> => [
    { ...marker, id: uuid() },
    timeInfo,
  ],
);
