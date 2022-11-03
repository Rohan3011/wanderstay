import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  PhotographIcon,
  ArrowCircleDownIcon,
  TrashIcon,
  SearchCircleIcon,
  LogoutIcon,
  CubeIcon,
} from "@heroicons/react/solid";
import {
  Menu,
  Text,
  Button,
  Modal,
  LoadingOverlay,
  ActionIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  Globe,
  LogIn,
  LogOut,
  MessageCircle,
  Settings,
  Compass,
  ArrowRight,
  ChevronRight,
  Search,
} from "react-feather";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSession, signIn, signOut } from "next-auth/react";
import { DateRange, DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect, useRef } from "react";
import { MyAccentButton } from "./shared";
import styled from "styled-components";
import { NextLink } from "@mantine/next";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [handleShow, setHandleShow] = useState(false);
  const searchRef = useRef(null);

  // const goToHomePage = () => router.push("/");
  // const goToSignInPage = () => router.push("/signin");
  // const goToHostPage = () => router.push("/host");
  // const goToExplorePage = () => router.push("/explore");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 80) {
        setHandleShow(true);
      } else setHandleShow(false);
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const focusOnSearchBar = () => {
    searchRef.current.focus();
  };

  return (
    <header
      className={`fixed top-0 z-40 w-screen flex justify-between items-center transition duration-100 ease-out h-20 md:px-10 ${
        handleShow ? "bg-white shadow-md" : ""
      } `}
    >
      {/* Left */}
      <div className="relative h-15 flex items-center md:h-10 space-x-6  my-auto cursor-pointer ">
        <Button
          variant="transparent"
          color="dark"
          leftIcon={<CubeIcon className="w-5 h-5" />}
          component={NextLink}
          href="/"
        >
          <span className="select-none text-xl font-semibold hidden sm:block">
            Vaction Rental
          </span>
        </Button>
      </div>
      {/* Search */}
      <div className="w-full max-w-sm md:max-w-lg flex items-center py-2 bg-white rounded-full md:border-2 md:shadow-sm focus-within:ring-2 ring-red-500 ">
        <input
          ref={searchRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="flex-grow pl-2 md:pl-4 text-base text-gray-700 placeholder-gray-400 bg-transparent outline-none "
          placeholder={placeholder || "Start Your Search..."}
        />
        <ActionIcon
          variant="filled"
          color="red"
          className="rounded-full mr-2 w-8 h-8"
        >
          <Search size={18} />
        </ActionIcon>
      </div>
      {/* Right */}
      <div className="hidden md:flex items-center justify-end space-x-2">
        <Button
          leftIcon={<Globe className="h-5" />}
          component={NextLink}
          href="/host"
          color={"red"}
        >
          <Text size="sm">Become a host</Text>
        </Button>

        {status == "authenticated" ? (
          <div>
            <MyMenu
              opened={showMenu}
              handleClose={toggleMenu}
              handleSearch={focusOnSearchBar}
            >
              <img
                src={session.user?.image}
                alt={session.user?.name}
                className="h-9 cursor-pointer rounded-full ml-2 hover:opacity-90"
              />
            </MyMenu>
          </div>
        ) : (
          <div className="relative rounded overflow-hidden h-9">
            <LoadingOverlay visible={status == "loading"} overlayBlur={2} />
            <Button
              leftIcon={<LogIn className="h-4" />}
              variant="default"
              color="blue"
              className="rounded"
              component={NextLink}
              href="/signin"
            >
              <Text size="sm"> Login</Text>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

function MyMenu({ children, handleSearch }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogout() {
    setShowLogoutModal(!showLogoutModal);
  }

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>{children}</Menu.Target>

        <Menu.Dropdown className="-translate-x-8">
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Navigation</Menu.Label>
          <Menu.Item
            component={NextLink}
            href="/host"
            icon={<Globe size={14} />}
            rightSection={
              <ActionIcon variant="transparent">
                <ChevronRight size={14} />
              </ActionIcon>
            }
          >
            Host
          </Menu.Item>
          <Menu.Item
            component={NextLink}
            href="/explore"
            icon={<Compass size={14} />}
            rightSection={
              <ActionIcon variant="transparent">
                <ChevronRight size={14} />
              </ActionIcon>
            }
          >
            Explore
          </Menu.Item>
          <Menu.Item
            icon={<SearchCircleIcon size={14} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
            onClick={handleSearch}
          >
            Search
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<LogOut size={14} />}
            onClick={handleLogout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalToLogOut opened={showLogoutModal} handleClose={handleLogout} />
    </>
  );
}

function ModalToLogOut({ opened, handleClose }) {
  function handleLogOut() {
    handleClose();
    signOut()
      .then((msg) =>
        showNotification({
          title: "You have been log out Successfully",
          message: msg,
          color: "green",
        })
      )
      .catch((err) =>
        showNotification({
          title: "Log out failed!",
          message: err,
          color: "red",
        })
      );
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
