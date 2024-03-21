import { DateInput } from "./DateInput";

export function SidebarControls(props: {
  date: number;
  setDate: (v: number) => void;
}) {
  const { date, setDate } = props;

  return (
    <div className="sidebar_top py-2 px-5">
      <div className="flex flex-col">
        <DateInput date={date} setDate={setDate} />
      </div>
    </div>
  );
}
