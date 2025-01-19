import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = {
  setCurrentValue: React.Dispatch<number>;
  min: number;
  max: number;
  step: number;
  isDisabled: boolean;
  sliderRef: React.RefObject<HTMLDivElement>;
};
export const useSliderMouseEvents = ({
  setCurrentValue,
  min,
  max,
  step,
  isDisabled,
  sliderRef,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

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

  return {
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
