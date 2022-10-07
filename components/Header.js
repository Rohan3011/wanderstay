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
} from "@heroicons/react/solid";
import { Menu, Text, Button, Modal, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Globe, LogIn, LogOut, MessageCircle, Settings } from "react-feather";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSession, signIn, signOut } from "next-auth/react";
import { DateRange, DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import { MyAccentButton } from "./shared";
import styled from "styled-components";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [handleShow, setHandleShow] = useState(false);

  const goToHomePage = () => router.push("/");
  const goToSignInPage = () => router.push("/signin");
  const goToHostPage = () => router.push("/host");
  const goToExplorePage = () => router.push("/explore");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
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

  return (
    <header
      className={`fixed top-0 z-40 grid w-screen grid-cols-1  transition duration-100 ease-out p-5 ${
        handleShow ? "bg-white shadow-md" : ""
      } md:grid-cols-3  z-50 grid grid-flow-row grid-cols-2 p-5 md:px-10 sm:grid-cols-3 `}
    >
      <div className="relative h-15 flex items-center md:h-10 space-x-6  my-auto cursor-pointer ">
        <NavLink isActive={router.asPath == "/"} onClick={goToHomePage}>
          <p>Home</p>
        </NavLink>
        <NavLink
          onClick={goToExplorePage}
          isActive={router.asPath == "/explore"}
        >
          <p>Explore</p>
        </NavLink>
      </div>
      {/* Search */}
      <div className="flex items-center py-2 bg-white rounded-full md:border-2 md:shadow-sm  ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="flex-grow pl-2 md:pl-4 text-sm text-gray-400 placeholder-gray-400 bg-transparent outline-none "
          placeholder={placeholder || "Start Your Search..."}
        />
        <SearchIcon className="hidden h-8 p-2 text-white bg-[#e61e4d] rounded-full cursor-pointer md:inline-flex md:mx-2" />
      </div>
      {/* Right */}
      <div className="hidden md:flex items-center justify-end space-x-2 text-gray-400">
        <MyAccentButton
          onClick={goToHostPage}
          leftIcon={<Globe className="h-5" />}
        >
          <Text size="sm">Become a host</Text>
        </MyAccentButton>

        {status == "authenticated" ? (
          <div>
            <MyMenu
              opened={showMenu}
              handleClose={toggleMenu}
              goToHostPage={goToHostPage}
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
              onClick={goToSignInPage}
            >
              <Text size="sm"> Login</Text>
            </Button>
          </div>
        )}
      </div>

      {/* Date range picker */}
      <div className="absolute md:w-[580px]  top-20 md:left-[20%] lg:left-[30%]  z-50">
        {searchInput && (
          <div className="z-50 flex flex-col p-5 mt-5 bg-white shadow-md md:col-span-4 w-max rounded-xl   ">
            <div className={"hidden md:inline-flex"}>
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#e61e4d"]}
                onChange={handleSelect}
              />
            </div>
            <div className={"md:hidden flex sm:p-0"}>
              <DateRange
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#e61e4d"]}
                onChange={handleSelect}
              />
            </div>
            <div className="flex w-screen md:w-[580px] items-center border-b mb-4 top-auto right-auto bottom-auto left-auto bg-white">
              <h2 className="flex-grow text-2xl font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5 justify-right" />
              <input
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                type="number"
                className="w-12 pl-2 text-lg ml-2 rounded-md text-[#e61e4d] outline-none"
              />
            </div>
            <div className="flex w-screen md:w-[580px]">
              <button
                className="w-1/2 text-gray-500 hover:shadow-inner md:flex-grow"
                onClick={resetInput}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-[#e61e4d] h-8 text-white hover:bg-white  hover:text-[#e61e4d] hover:shadow-inner rounded-md md:flex-grow"
                onClick={search}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

function MyMenu({ children, goToHostPage }) {
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
          <Menu.Item onClick={goToHostPage} icon={<Globe size={14} />}>
            Host
          </Menu.Item>
          <Menu.Item icon={<PhotographIcon size={14} />}>Gallery</Menu.Item>
          <Menu.Item
            icon={<SearchCircleIcon size={14} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
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

const NavLink = styled.div`
  text-decoration: underline 0.15em
    ${(props) => (props.isActive ? "#e61e4d" : "black")};
  text-underline-offset: 0.2em;
  transition: text-decoration-color 300ms, text-underline-offset 300ms;

  &:hover,
  &:focus {
    text-decoration-color: #d70466;
    text-underline-offset: 0.4em;
  }

  & > p {
    color: ${(props) => (props.isActive ? "#e61e4d" : "black")};
    font-size: large;
  }
`;
