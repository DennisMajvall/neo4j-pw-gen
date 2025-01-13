import { useState } from "react";
import { Slider, SliderProps } from "./slider";

type Props = SliderProps & {
  text: string;
  displayCurrentValue: boolean;
};

export function SliderWithLabel(props: Props) {
  const { text, displayCurrentValue, ...sliderProps } = props;

  const [currentValue, setCurrentValue] = useState(
    props.defaultValue ?? props.min
  );

  const onChange = (newValue: number, previousValue: number) => {
    setCurrentValue(newValue);
    props.onChange?.(newValue, previousValue);
  };

  return (
    <div className="n-flex n-flex-col">
      <div className="n-flex n-justify-between">
        <label htmlFor={sliderProps.id} className="n-subheading-medium">
          {text}
        </label>
        {displayCurrentValue && (
          <p className="n-subheading-medium">{currentValue}</p>
        )}
      </div>

      <Slider {...sliderProps} onChange={onChange} />
    </div>
  );
}
