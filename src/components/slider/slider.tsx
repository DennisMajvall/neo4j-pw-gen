import "./neo4j-slider.css";
import clsx from "clsx";
import { useState } from "react";

export type SliderProps = {
  id: string;
  onChange: (newValue: number, previousValue: number) => void;
  min: number;
  max: number;

  className?: string;
  isDisabled?: boolean;
  /** Defaults to 10% of max */
  step?: number;
  /** Defaults to min */
  defaultValue?: number;
};

export function Slider(props: SliderProps) {
  const step = props.step ?? props.max / 10;
  const min = Math.min(props.min, props.max);
  const max = Math.max(props.min, props.max);
  const defaultValue = props.defaultValue ?? min;
  const { className, id, isDisabled } = props;

  const [currentValue, setCurrentValue] = useState(defaultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
    props.onChange?.(newValue, currentValue);
  };

  const valueAsPercentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div
      className={clsx(
        "neo4j-slider-css",
        "n-bg-primary-border-weak",
        "n-my-2",
        "n-rounded-xl",
        "n-w-full"
      )}
    >
      <div
        className="neo4j-slider-css-bg-filled n-bg-primary-bg-strong n-rounded-xl"
        style={{ marginRight: `${100 - valueAsPercentage}%` }}
      ></div>

      <input
        id={id}
        className={clsx(
          "neo4j-slider-css-input",
          "n-absolute",
          "n-bg-transparent",
          "n-outline-none",
          "n-overflow-hidden",
          "n-w-full",
          className
        )}
        tabIndex={0}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={isDisabled}
      ></input>
    </div>
  );
}
