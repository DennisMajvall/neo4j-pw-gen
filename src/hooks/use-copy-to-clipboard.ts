import { useState, useCallback } from "react";

const DEFAULT_DURATION_MS = 2000;

export const useCopyToClipboard = (
  duration = DEFAULT_DURATION_MS
): [boolean, (text: string) => void] => {
  const [displayIsCopiedToClipboard, setDisplayIsCopiedToClipboard] =
    useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (!navigator.clipboard) return;

      navigator.clipboard.writeText(text).then(
        () => {
          clearTimeout(timeoutHandle);
          setDisplayIsCopiedToClipboard(true);

          const newTimeoutHandle = setTimeout(
            () => setDisplayIsCopiedToClipboard(false),
            duration
          );
          setTimeoutHandle(newTimeoutHandle);
        },
        (err) => {
          console.error("Failed to copy text to clipboard: ", err);
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [duration]
  );

  return [displayIsCopiedToClipboard, copyToClipboard];
};
