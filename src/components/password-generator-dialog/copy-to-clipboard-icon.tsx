import { IconButton, Tooltip } from "@neo4j-ndl/react";
import { Square2StackIconOutline } from "@neo4j-ndl/react/icons";

import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";

export function CopyToClipboardIcon({ password }: { password: string }) {
  const [displayIsCopiedToClipboard, copyToClipboard] = useCopyToClipboard();

  // if (!navigator.clipboard) return null;

  return (
    <Tooltip
      type="simple"
      isOpen={displayIsCopiedToClipboard}
      isPortaled={false}
    >
      <Tooltip.Trigger hasButtonWrapper>
        <IconButton
          data-testid="copy-to-clipboard-button"
          ariaLabel="Copy to clipboard"
          onClick={() => copyToClipboard(password)}
          isClean
        >
          <Square2StackIconOutline />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Copied to clipboard</Tooltip.Content>
    </Tooltip>
  );
}
