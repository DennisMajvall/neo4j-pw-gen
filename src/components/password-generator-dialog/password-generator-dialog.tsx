import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  TextInput,
  Tooltip,
} from "@neo4j-ndl/react";
import { SliderWithLabel } from "../slider/slider-with-label";
import { Square2StackIconOutline } from "@neo4j-ndl/react/icons";
import { useCallback, useState } from "react";
import {
  generateRandomPassword,
  DEFAULT_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../../services/password-generator";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";

/*
  onClick & onChange triggers on spacebar, I'm not sure if that's what the criteria
  "keyboard navigation" entails or if I need to add a listener for the ENTER key / keyCode 13.
  The slider is keyboard accessible by default (arrow keys) due to the native HTML input element.
*/

export function PasswordGeneratorDialog() {
  const [password, setPassword] = useState("");

  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [length, setLength] = useState(DEFAULT_LENGTH);

  const [displayIsCopiedToClipboard, copyToClipboard] = useCopyToClipboard();

  const onGenerateClick = useCallback(() => {
    const newPassword = generateRandomPassword({
      includeUpperCase,
      includeLowerCase,
      includeSymbols,
      length,
    });
    setPassword(newPassword);
  }, [includeUpperCase, includeLowerCase, includeSymbols, length]);

  const copyToClipboardElement = navigator.clipboard ? (
    <Tooltip
      type="simple"
      isOpen={displayIsCopiedToClipboard}
      isPortaled={false}
    >
      <Tooltip.Trigger hasButtonWrapper>
        <IconButton
          ariaLabel="Copy to clipboard"
          onClick={() => copyToClipboard(password)}
          isClean
        >
          <Square2StackIconOutline />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Copied to clipboard</Tooltip.Content>
    </Tooltip>
  ) : undefined;

  return (
    <Dialog isOpen hasDisabledCloseButton>
      <p className="n-subheading-large n-mb-3">Password Generator</p>

      <div className="n-gap-y-6 n-flex n-flex-col">
        <TextInput
          label="Generated password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isFluid
          rightElement={copyToClipboardElement}
        />

        <SliderWithLabel
          id="pw-character-length"
          max={MAX_PASSWORD_LENGTH}
          min={MIN_PASSWORD_LENGTH}
          defaultValue={DEFAULT_LENGTH}
          onChange={(newValue) => setLength(newValue)}
          step={1}
          text="Password length"
          displayCurrentValue
        />

        <div className="n-gap-y-3 n-flex n-flex-col n-p-3 n-pt-0">
          <Checkbox
            label="Include Uppercase Letters"
            isChecked={includeUpperCase}
            onChange={(v) => setIncludeUpperCase(v.target.checked)}
          />
          <Checkbox
            label="Include Lowercase Letters"
            isChecked={includeLowerCase}
            onChange={(v) => setIncludeLowerCase(v.target.checked)}
          />
          <Checkbox
            label="Include Symbols"
            isChecked={includeSymbols}
            onChange={(v) => setIncludeSymbols(v.target.checked)}
          />
        </div>

        <Button onClick={onGenerateClick}>Generate</Button>
      </div>
    </Dialog>
  );
}
