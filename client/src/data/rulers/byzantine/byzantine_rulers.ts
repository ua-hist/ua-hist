import { MarkerInfo } from "../../../api/get-markers";
import { TimedData } from "../../../utils/timed-data";
import basil1 from "../../../assets/basil1.png";
import leo6 from "../../../assets/leo6.jpg";
import alex from "../../../assets/alex.jpg";
import const7 from "../../../assets/constantine7.jpg";
import rom1 from "../../../assets/roman1.jpg";
import rom2 from "../../../assets/roman2.jpg";
import nikephoros from "../../../assets/nikephoros.jpg";
import basil2 from "../../../assets/basil_the_snd.png";
import john1 from "../../../assets/john_the_fst.jpg";
import { rulerIcon } from "../util";

const byzantineRulers: TimedData<MarkerInfo>[] = [
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: basil1 },
      desc: 'Basil I "the Macedonian"',
    },
    [867, 886],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: leo6 },
      desc: 'Leo VI "the Wise"',
    },
    [886, 912],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: alex },
      desc: "Alexander",
    },
    [912, 913],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: const7 },
      desc: "Constantine VII Porphyrogenitus",
    },
    [913, 959],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: rom1 },
      desc: "Romanos I Lekapenos",
    },
    [920, 944],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: rom2 },
      desc: 'Romanos II "the Purple-born"',
    },
    [959, 963],
  ],

  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: nikephoros },
      desc: "Nikephoros II Phokas",
    },
    [963, 969],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: john1 },
      desc: "John I Tzimiskes",
    },
    [969, 976],
  ],
  [
    {
      pos: [41.0125, 28.98],
      icon: { ...rulerIcon, iconUrl: basil2 },
      desc: 'Basil II "the Bulgar-Slayer"',
    },
    [976, 1025],
  ],
];

export const markersTempByzantineRulers = byzantineRulers.map(([m, t]) => [
  { ...m, desc: m.desc + ", " + (t as number[]).join("-") },
  t,
]) as TimedData<MarkerInfo>[];
