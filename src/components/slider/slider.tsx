import clsx from "clsx";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import { clamp, roundToMaxDecimals } from "../../utils";
import { SliderThumb } from "./slider-thumb";

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

  const [currentValue, setCurrentValue] = useReducer(
    (prevValue: number, newValue: number) => {
      return isDisabled
        ? prevValue
        : roundToMaxDecimals(clamp(newValue, min, max), MAX_DECIMALS);
    },
    defaultValue
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => onChange(currentValue), [currentValue]);

  const moveSliderPosition = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (isDisabled || !sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const offsetX =
        (event as MouseEvent).clientX ??
        (event as TouchEvent).touches[0].clientX;

      const percentageOfSliderWidth =
        (offsetX - sliderRect.left) / sliderRect.width;

      // Without "steps" this would have been much easier:
      // const newValue = Math.round(percentageOfSliderWidth * (max - min) + min);

      // Calculate the value using "steps"
      const numStepsDisregardingMinMax = (percentageOfSliderWidth * 100) / step;
      const numSteps = numStepsDisregardingMinMax / (100 / (max - min));
      const numStepsRounded = Math.round(numSteps);
      const newValue = min + numStepsRounded * step;

      setCurrentValue(newValue);
    },
    [max, min]
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") setCurrentValue(currentValue - step);
    else if (event.key === "ArrowRight") setCurrentValue(currentValue + step);
  };

  const onMouseDown = (event: MouseEvent | TouchEvent) => {
    moveSliderPosition(event);
    setIsDragging(true);
  };

  const onMouseMove = useCallback(
    (event: Event) => {
      if (isDragging)
        moveSliderPosition(event as unknown as MouseEvent | TouchEvent);
    },
    [isDragging, moveSliderPosition]
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    // Re-using the same onMouseEvents for touch as the actions are the same.
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onMouseMove, {
        // Remove delay for touchmove in some browsers
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners
        // https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners
        passive: true,
      });
      window.addEventListener("touchend", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

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
