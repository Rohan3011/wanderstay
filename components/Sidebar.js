import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  Avatar,
  Modal,
  Button,
  UnstyledButton,
  LoadingOverlay,
} from "@mantine/core";

import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons";
import { LoginIcon, LogoutIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import { NextLink } from "@mantine/next";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "/dash", label: "Dashboard", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Settings", icon: IconSettings },
];

export default function Sidebar() {
  const { data: session, status } = useSession();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogout() {
    setShowLogoutModal(!showLogoutModal);
  }

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <Navbar p="md" className="h-[90%]" width={{ sm: 300 }}>
        <Navbar.Section grow>{links}</Navbar.Section>
        <Navbar.Section className={classes.footer}>
          {session ? (
            <UnstyledButton
              className={[classes.link, "w-full"]}
              onClick={handleLogout}
            >
              <Avatar
                radius={"xl"}
                src={session.user?.image}
                alt={session.user?.name}
              />
              <span className="ml-4 select-none max-w-[180px] truncate">
                {session.user?.name}
              </span>
            </UnstyledButton>
          ) : (
            <div className="relative rounded overflow-hidden h-full">
              <LoadingOverlay visible={status == "loading"} overlayBlur={2} />
              <Button
                leftIcon={<LoginIcon className="h-4" />}
                variant="default"
                color="blue"
                className="rounded w-full"
                component={NextLink}
                href="/signin"
              >
                Login
              </Button>
            </div>
          )}
        </Navbar.Section>
      </Navbar>
      <ModalToLogOut opened={showLogoutModal} handleClose={handleLogout} />
    </>
  );
}

function ModalToLogOut({ opened, handleClose }) {
  function handleLogOut() {
    handleClose();
    signOut();
  }

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={handleClose}
        title="Are you sure you want to log out?"
      >
        <div className="w-full h-16 flex items-end justify-end space-x-4">
          <Button color="gray" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="red" variant="filled" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </Modal>
    </>
  );
}
