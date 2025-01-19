import { renderHook } from "@testing-library/react";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  it("should attempt to write to navigator.clipboard when called", () => {
    const mockFunction = vi.fn().mockImplementation(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockFunction,
      },
    });

    const { result } = renderHook(() => useCopyToClipboard(10));
    const [_displayIsCopiedToClipboard, copyToClipboard] = result.current;

    copyToClipboard("the text that needs to be copied");

    // eslint-disable-next-line
    const writeTextFunc = window.navigator.clipboard.writeText;
    expect(writeTextFunc).toHaveBeenCalledWith(
      "the text that needs to be copied"
    );
  });
});
