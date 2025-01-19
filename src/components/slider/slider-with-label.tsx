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

  const onChange = (newValue: number) => {
    setCurrentValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div className="n-flex n-flex-col n-gap-6">
      <div className="n-flex n-justify-between">
        <label
          id={`${sliderProps.id}__label`}
          htmlFor={sliderProps.id}
          className="n-subheading-medium"
        >
          {text}
        </label>

        {displayCurrentValue && (
          <p
            id={`${sliderProps.id}__label_value`}
            className="n-subheading-medium"
          >
            {currentValue}
          </p>
        )}
      </div>

      <Slider {...sliderProps} onChange={onChange} />
    </div>
  );
}
