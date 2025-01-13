import { useState, useCallback } from "react";

const DEFAULT_DURATION_MS = 2000;

type TimeoutHandle = ReturnType<typeof setTimeout> | undefined;

export const useCopyToClipboard = (
  duration = DEFAULT_DURATION_MS
): [boolean, (text: string) => void] => {
  const [displayIsCopiedToClipboard, setDisplayIsCopiedToClipboard] =
    useState(false);

  const [timeoutHandle, setTimeoutHandle] = useState<TimeoutHandle>(undefined);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (!navigator.clipboard) return;

      navigator.clipboard.writeText(text).then(
        () => {
          clearTimeout(timeoutHandle);
          setDisplayIsCopiedToClipboard(true);

          setTimeoutHandle(
            setTimeout(() => setDisplayIsCopiedToClipboard(false), duration)
          );
        },
        (err) => {
          console.error("Failed to copy text to clipboard: ", err);
        }
      );
    },
    [duration, timeoutHandle]
  );

  return [displayIsCopiedToClipboard, copyToClipboard];
};
