import { RefObject } from "react";

export function useScrollIntoEvent(
  listRef: RefObject<HTMLDivElement>,
  selectedEventId: string,
) {
  return async function scrollIntoEvent() {
    const list = listRef.current;

    if (!list) {
      return;
    }

    await new Promise((r) => setTimeout(r, 100));

    const selectedEventEl = list.querySelector(
      `[data-id="${selectedEventId}"]`,
    );

    if (selectedEventEl) {
      selectedEventEl.scrollIntoView();
    }
  };
}
