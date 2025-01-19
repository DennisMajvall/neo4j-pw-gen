import clsx from "clsx";
import { useEffect, useReducer, useRef, KeyboardEvent } from "react";
import { clamp, roundToMaxDecimals } from "../../utils";
import { SliderThumb } from "./slider-thumb";
import { useSliderMouseEvents } from "./use-slider-mouse-events";

const MAX_DECIMALS = 2;
const FALLBACK_NUM_STEPS = 10;

export type SliderProps = {
  id: string;
  onChange: (newValue: number) => void;
  min: number;
  max: number;

  className?: string;
  isDisabled?: boolean;
  /** Defaults to 10% of max-min */
  step?: number;
  /** Defaults to min */
  defaultValue?: number;
};

export function Slider({
  id,
  className: propsClassName,
  min,
  max: propsMax,
  defaultValue: propsDefaultValue,
  onChange,
  isDisabled = false,
  step: propsStep,
}: SliderProps) {
  // Ensure that we never do division by zero
  const max = propsMax === min ? propsMax + 1 : propsMax;

  // Ensure that the default value is within the min-max range
  const defaultValue = clamp(propsDefaultValue ?? min, min, max);

  // Calculate default step size if not provided
  const step = propsStep ?? (max - min) / FALLBACK_NUM_STEPS;

  const sliderRef = useRef<HTMLDivElement>(null);

  /** Review note due to unorthodox use of "useReducer":
   *
   * Most people only use "useReducer" to dispatch actions because this is
   * what redux & the documentation taught them in their examples.
   *
   * However, useReducer is simply: a "useState" with a manually written "setter"-function.
   * Another way to view it as the Class/Function syntax "set": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes#accessor_fields
   *
   * This allows us to handle clamping, rounding and disabling in a single place
   * so that "the value" never becomes invalid.
   */
  const [currentValue, setCurrentValue] = useReducer(
    (prevValue: number, newValue: number) => {
      return isDisabled
        ? prevValue
        : roundToMaxDecimals(clamp(newValue, min, max), MAX_DECIMALS);
    },
    defaultValue
  );

  useEffect(() => onChange(currentValue), [currentValue]);

  const { onMouseDown, isDragging } = useSliderMouseEvents({
    setCurrentValue,
    min,
    max,
    step,
    isDisabled,
    sliderRef,
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") setCurrentValue(currentValue - step);
    else if (event.key === "ArrowRight") setCurrentValue(currentValue + step);
  };

  const valueAsPercentage = ((currentValue - min) / (max - min)) * 100;

  // Turn all bg-colors (identical) gray if disabled
  const disabledBgColor = isDisabled ? "n-bg-neutral-text-weakest" : "";

  return (
    <div
      ref={sliderRef}
      id={id}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-disabled={isDisabled}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      className={clsx(
        "n-w-full",
        "n-relative",
        "n-h-1",
        disabledBgColor || "n-bg-primary-border-weak",
        "n-rounded-full",
        isDisabled ? "n-cursor-not-allowed" : "n-cursor-pointer",
        propsClassName
      )}
    >
      <div
        className={clsx(
          "n-absolute",
          "n-left-0",
          "n-h-full",
          disabledBgColor || "n-bg-primary-bg-strong",
          "n-rounded-full"
        )}
        style={{
          width: `${valueAsPercentage}%`,
        }}
      >
        <SliderThumb
          disabledBgColor={disabledBgColor}
          isDragging={isDragging}
          onKeyDown={onKeyDown}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}
