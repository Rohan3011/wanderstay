
import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ session, children, placeholder }) {
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            // navbar={opened && <Sidebar session={session} />}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    padding: 0
                },

            })}
            header={
                <Header
                    session={session}
                    opened={opened}
                    toggleSidebar={() => {
                        setOpened(!opened);
                    }}
                    placeholder={placeholder}
                />
            }
        >
            {children}
        </AppShell>
    );
}

export default MainLayout;