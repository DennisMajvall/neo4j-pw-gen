import clsx from "clsx";
import { KeyboardEvent } from "react";

export type Props = {
  disabledBgColor: string;
  isDragging: boolean;
  onKeyDown: (_: KeyboardEvent) => void;
  isDisabled?: boolean;
};

export function SliderThumb({
  isDisabled,
  disabledBgColor,
  isDragging,
  onKeyDown,
}: Props) {
  return (
    <span
      tabIndex={isDisabled ? undefined : 0}
      onKeyDown={onKeyDown}
      className={clsx(
        "n-absolute",
        "n-top-1/2",
        "n--translate-y-1/2",
        "-n-right-2",
        "n-w-4",
        "n-h-4",
        "n-rounded-[50%]",
        disabledBgColor || "n-bg-primary-bg-strong",
        "before:n-content-['']",
        "before:n-absolute",
        "before:n-top-1/2",
        "before:n-left-1/2",
        "before:n--translate-x-1/2",
        "before:n--translate-y-1/2",
        "before:n-w-9",
        "before:n-h-9",
        "before:n-rounded-full",
        "before:n-z-[-1]",
        !isDisabled && [
          "focus:n-outline",
          "focus:n-outline-2",
          "focus:n-outline-palette-primary-focus",
          "focus:n-bg-primary-pressed-strong",
          "before:focus:n-bg-primary-hover-weak",
          "before:hover:n-bg-primary-hover-weak",
          "before:active:n-bg-primary-pressed-weak",
          isDragging ? "n-cursor-grabbing" : "n-cursor-grab",
        ]
      )}
    >
      <span
        className={clsx(
          "n-absolute",
          "n-select-none",
          "n-overflow-hidden",
          "n-h-[1px]",
          "n-whitespace-nowrap"
        )}
      ></span>
    </span>
  );
}
