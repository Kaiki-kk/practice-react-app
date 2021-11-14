import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { VFC } from "react";

type Props = {
  onOpen: () => void;
};
export const MenuIconButton: VFC<Props> = (props) => {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="メニューボタン"
      variant="unstyled"
      size="sm"
      display={{ base: "flex", md: "none" }}
      onClick={onOpen}
    >
      <HamburgerIcon />
    </IconButton>
  );
};
