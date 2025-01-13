import {
  Button,
  Checkbox,
  Dialog,
  IconButton,
  TextInput,
} from "@neo4j-ndl/react";
import { SliderWithLabel } from "../slider/slider-with-label";
import { Square2StackIconOutline } from "@neo4j-ndl/react/icons";

export function PasswordGeneratorDialog() {
  return (
    <Dialog isOpen hasDisabledCloseButton>
      <p className="n-subheading-large n-mb-3">Password Generator</p>
      <div className="n-gap-y-6 n-flex n-flex-col">
        <TextInput
          label="Generated password"
          isFluid
          rightElement={
            <IconButton
              ariaLabel="Copy to clipboard"
              onClick={() => {}}
              isClean
            >
              <Square2StackIconOutline />
            </IconButton>
          }
        />
        <SliderWithLabel
          id="pw-character-length"
          max={20}
          min={6}
          onChange={() => {}}
          step={1}
          text="Password length"
          displayCurrentValue
        />
        <div className="n-gap-y-3 n-flex n-flex-col n-p-3 n-pt-0">
          <Checkbox label="Include Uppercase Letters" />
          <Checkbox label="Include Lowercase Letters" />
          <Checkbox label="Include Symbols" />
        </div>
        <Button onClick={() => {}}>Generate</Button>
      </div>
    </Dialog>
  );
}
