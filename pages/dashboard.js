import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Fade } from "react-reveal";
import InfoCard from "../components/InfoCard";
import { Tabs } from "@mantine/core";
import { IconNotebook, IconAdjustments } from "@tabler/icons";
import MainLayout from "../components/MainLayout";
import MyHostingCard from "../components/MyHostingCard";

export default function Dashboard({ session, listings }) {
  const myBookings = listings?.filter(
    (item) => item.renterID == session.user.id
  );

  const myHostings = listings?.filter((item) => item.host == session.user.id);

  return (
    <>
      <Head>
        <title>Vacation Rental System: My Dashboard </title>
        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>
      <MainLayout>
        <main className="-mb-[60%] mt-[90px] relative mx-42 md:w-[73%] bg-white shadow-2xl m-3 ml-12  p-8 t-0 rounded-2xl mr-10 pb-10  md:ml-40 lg:ml-52 z-10">
          <Tabs defaultValue="hosting" color={"red"}>
            <Tabs.List>
              <Tabs.Tab value="hosting" icon={<IconAdjustments size={16} />}>
                Hosting
              </Tabs.Tab>
              <Tabs.Tab value="booking" icon={<IconNotebook size={16} />}>
                Booking
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="booking" pt="xs">
              <h1 className="font-bold leading-snug text-3xl rounded-md mb-4">
                My Boooking(s)
              </h1>
              <Fade>
                <div className="flex-1 flex flex-col mr-4  ">
                  {myBookings?.map((items, idx) => (
                    <InfoCard key={idx} {...items} />
                  ))}
                </div>
              </Fade>
            </Tabs.Panel>

            <Tabs.Panel value="hosting" pt="xs">
              <h1 className="font-bold leading-snug text-3xl rounded-md mb-4">
                My Hosting(s)
              </h1>
              <Fade>
                <div className="flex-1 flex flex-col mr-4  ">
                  {myHostings?.map((items, idx) => (
                    <MyHostingCard key={idx} {...items} />
                  ))}
                </div>
              </Fade>
            </Tabs.Panel>
          </Tabs>
        </main>
      </MainLayout>
    </>
  );
}

const DisplayListings = ({ listings }) => {
  return (
    <div>
      <Fade>
        <div className="flex-1 flex flex-col mr-4  ">
          {listings?.map((items, idx) => (
            <MyHostingCard key={idx} {...items} />
          ))}
        </div>
      </Fade>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  const listings = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/explore`
  ).then((res) => res.json());

  if (!session) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return {
    props: {
      session,
      listings,
    },
  };
}
