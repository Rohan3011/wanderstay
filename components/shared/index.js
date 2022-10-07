import { Button, Text } from "@mantine/core";

export function MyAccentButton({ children, onClick, leftIcon }) {
  return (
    <Button
      onClick={onClick}
      leftIcon={leftIcon}
      variant="gradient"
      gradient={{ from: "#e61e4d", to: "#d70466", deg: 35 }}
    >
      <Text size="sm">{children}</Text>
    </Button>
  );
}
