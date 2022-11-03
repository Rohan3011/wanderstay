import { Button, Text } from "@mantine/core";

export function MyAccentButton({ children, onClick, leftIcon }) {
  return (
    <Button
      onClick={onClick}
      leftIcon={leftIcon}
      variant="gradient"
      gradient={{ from: "#fa5252", to: "#d70466", deg: 35 }}
    >
      <Text size="sm">{children}</Text>
    </Button>
  );
}
