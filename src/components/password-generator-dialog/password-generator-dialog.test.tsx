import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PasswordGeneratorDialog } from ".";
import userEvent from "@testing-library/user-event";

const mockCopyToClipboardFunc = vi
  .fn()
  .mockImplementation(() => Promise.resolve());

vi.mock("../../hooks/use-copy-to-clipboard", () => ({
  useCopyToClipboard: () => {
    return [true, mockCopyToClipboardFunc];
  },
}));

describe("PasswordGeneratorDialog", () => {
  beforeEach(() => {
    render(<PasswordGeneratorDialog />);
  });

  it("Should display a copy icon button", async () => {
    const copyButton = await screen.findByTestId("copy-to-clipboard-button");
    expect(copyButton).toBeInTheDocument();
  });

  it("Clicking on the copy icon button should call copyToClipboard", async () => {
    const user = userEvent.setup();

    const textInput = screen.getByTestId("generated-password");
    await user.type(textInput, "abcdef");

    const copyButton = screen.getByTestId("copy-to-clipboard-button");
    await user.click(copyButton);

    expect(mockCopyToClipboardFunc).toHaveBeenCalledExactlyOnceWith("abcdef");
  });

  it("Clicking on the generate button should add textTo", async () => {
    const user = userEvent.setup();

    const generateButton = screen.getByTestId("generate-password-button");
    const textInput: HTMLInputElement =
      screen.getByTestId("generated-password");
    const includeUpperCaseCheckbox = screen.getByTestId(
      "include-upper-case-checkbox"
    );

    await user.click(includeUpperCaseCheckbox);

    const textBeforeGeneration = textInput.value;
    await user.click(generateButton);
    const textAfterGeneration = textInput.value;

    expect(textBeforeGeneration).not.toEqual(textAfterGeneration);
  });
});
