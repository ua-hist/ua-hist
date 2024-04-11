import oleg from "../../../assets/oleg_the_wise.jpg";
import igor from "../../../assets/igor_the_old.jpg";
import olha from "../../../assets/olga_the_fst.jpg";
import sviatoslav from "../../../assets/sviatoslav_the_fst.png";
import yaropolk from "../../../assets/yaropolk_the_fst.jpg";
import volodymyr from "../../../assets/volodymyr_the_great.jpg";
import sviatopolk from "../../../assets/sviatopolk_the_fst.jpg";
import yaroslav from "../../../assets/yaroslav_the_wise.jpg";
import askold from "../../../assets/askold.png";
import { TimedData } from "../../../utils/timed-data";
import { MarkerInfo } from "../../../api/get-markers";
import { rulerIcon } from "../util";

export const markersTempKyivanRulers: TimedData<MarkerInfo>[] = [
  [
    {
      pos: [50.45, 30.523333],
      desc: "Askold and Dir",
      icon: { ...rulerIcon, iconUrl: askold },
      type: "ruler",
    },
    [860, 882],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Oleh the Wise, Prince of Kyiv 882-912",
      icon: { ...rulerIcon, iconUrl: oleg },
      type: "ruler",
    },
    [882, 912],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Ihor the Old, Prince of Kyiv 912-945",
      icon: { ...rulerIcon, iconUrl: igor },
      type: "ruler",
    },
    [912, 945],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Olha I, Princess of Kyiv 945-964",
      icon: { ...rulerIcon, iconUrl: olha },
      type: "ruler",
    },
    [945, 964],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Sviatoslav I, Prince of Kyiv 964-972",
      icon: { ...rulerIcon, iconUrl: sviatoslav },
      type: "ruler",
    },
    [964, 972],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Yaropolk I, Prince of Kyiv 972-980",
      icon: { ...rulerIcon, iconUrl: yaropolk },
      type: "ruler",
    },
    [972, 980],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Volodymyr I the Great, Prince of Kyiv 980-1015",
      icon: { ...rulerIcon, iconUrl: volodymyr },
      type: "ruler",
    },
    [980, 1015],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Sviatopolk I the Accursed, Prince of Kyiv 1015-1019",
      icon: { ...rulerIcon, iconUrl: sviatopolk },
      type: "ruler",
    },
    [1015, 1019],
  ],
  [
    {
      pos: [50.45, 30.523333],
      desc: "Yaroslav the Wise, Prince of Kyiv 1019-1054",
      icon: { ...rulerIcon, iconUrl: yaroslav },
      type: "ruler",
    },
    [1019, 1054],
  ],
];
