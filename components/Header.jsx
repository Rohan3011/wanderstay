import React, { useState, useRef, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Logo from './Logo';
import {
    Globe,
    Search,
} from "react-feather";
import {
    LoginIcon,
    UsersIcon,
} from "@heroicons/react/solid";
import {
    createStyles,
    Avatar,
    UnstyledButton,
    Group,
    Menu,
    Text,
    ActionIcon,
    Header,
    Button,
    LoadingOverlay,
    Modal,
} from '@mantine/core';
import {
    IconLogout,
    IconSettings,
    IconPlayerPause,
    IconSwitchHorizontal,
    IconChevronDown,
    IconDashboard,
} from '@tabler/icons';
import { NextLink } from "@mantine/next";

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `8px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));

export default function MyHeader({ placeholder }) {
    const { data: session, status } = useSession();
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();
    const [showLogout, setShowLogout] = useState(false);
    const searchRef = useRef(null);
    const { classes, theme } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [showSearchError, setShowSearchError] = useState(false);
    const [handleShow, setHandleShow] = useState(false);


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


    const handleSearchInput = (e) => {
        setShowSearchError(false)
        setSearchInput(e.target.value)
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };

    const search = () => {
        if (!searchInput.trim()) {
            setShowSearchError(true);
        } else {
            router.push({
                pathname: "search",
                query: {
                    location: searchInput,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    noOfGuests,
                },
            })
        }

    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const handleShowLogout = () => setShowLogout(!showLogout)

    // const items = links.map((link) => (
    //     <a
    //         key={link.label}
    //         href={link.link}
    //         className={classes.link}
    //         onClick={(event) => event.preventDefault()}
    //     >
    //         {link.label}
    //     </a>
    // ));


    return (
        <Header height={80} className={`px-8 border-b transition-all duration-200 ease-in  ${handleShow ? 'bg-white border-gray-200' : 'bg-transparent border-transparent'}`} >
            <div className={classes.inner}>
                <Group >
                    <Logo />
                </Group>
                <Group className="relative w-full max-w-sm md:max-w-lg flex items-center py-2 bg-white rounded-full md:border-2 md:shadow-sm focus-within:ring-2 ring-red-500 ">
                    <input
                        ref={searchRef}
                        value={searchInput}
                        onChange={handleSearchInput}
                        type="text"
                        className="flex-grow pl-2 md:pl-4 text-base text-gray-700 placeholder-gray-400 bg-transparent outline-none "
                        placeholder={placeholder || "Start Your Search..."}
                    />
                    <ActionIcon
                        variant="filled"
                        color="red"
                        className="rounded-full mr-2 w-8 h-8"
                    >
                        <Search size={18} onClick={search} />
                    </ActionIcon>
                    {showSearchError && <span className="absolute bottom-0 translate-x-4 translate-y-4 text-red-500 text-xs">Search cannot be empty</span>}
                </Group>
                <Group className='hidden md:flex justify-center gap-2' >

                    <Button leftIcon={<Globe className="h-4" />}
                        variant="default"
                        color="red"
                        className="rounded"
                        component={NextLink}
                        href="/host">
                        <Text size="sm"> Become a host</Text>
                    </Button>

                    {
                        !session ? (
                            <div className="relative rounded overflow-hidden h-9">
                                <LoadingOverlay visible={status == "loading"} overlayBlur={2} />
                                <Button
                                    leftIcon={<LoginIcon className="h-4" />}
                                    variant="default"
                                    color="blue"
                                    className="rounded"
                                    component={NextLink}
                                    href="/signin"
                                >
                                    <Text size="sm"> Login</Text>
                                </Button>
                            </div>) : (
                            <Menu
                                width={260}
                                position="bottom-end"
                                transition="pop-top-right"
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={classes.user}
                                    >
                                        <Group spacing={7}>
                                            <Avatar src={session.user.image} alt={session.user.name} radius="xl" size={20} />
                                            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                                {session.user.name}
                                            </Text>
                                            <IconChevronDown size={12} stroke={1.5} />
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item component={NextLink} href="/dashboard" icon={<IconDashboard size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
                                        Dashboard
                                    </Menu.Item>
                                    <Menu.Label>Settings</Menu.Label>
                                    <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
                                    <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                                        Change account
                                    </Menu.Item>

                                    <Menu.Divider />

                                    <Menu.Label>Danger zone</Menu.Label>
                                    <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                                        Pause subscription
                                    </Menu.Item>
                                    <Menu.Item color="red" onClick={handleShowLogout} icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        )
                    }
                </Group>
                <ModalToLogOut opened={showLogout} handleClose={handleShowLogout} />

            </div>

            {/* Date range picker */}
            <div className="absolute md:w-[580px]  top-20 md:left-[20%] lg:left-[30%]  z-50">
                {searchInput && (
                    <div className="z-50 flex flex-col p-5 mt-5 bg-white shadow-md md:col-span-4 w-max rounded-xl   ">
                        <div className={"hidden md:inline-flex"}>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={["#fa5252"]}
                                onChange={handleSelect}
                            />
                        </div>
                        <div className={"md:hidden flex sm:p-0"}>
                            <DateRange
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={["#fa5252"]}
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
                                className="w-12 pl-2 text-lg ml-2 rounded-md text-[#fa5252] outline-none"
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
                                className="w-1/2 bg-red-500 h-8 text-white hover:bg-white  hover:text-[#fa5252] hover:shadow-inner rounded-md md:flex-grow"
                                onClick={search}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Header>
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