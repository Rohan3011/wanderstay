import { getSession } from "next-auth/react";
import Head from "next/head";
import HostingCard from "../components/HostingCard";
import AddListingForm from "../components/AddListingForm";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";

export default function Host(props) {
  return (
    <>
      <Head>
        <title>Vacation Rental System: Host </title>
        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>

      <MainLayout>
        {/* <HostingCard
          img="https://a0.muscache.com/im/pictures/5b4dc94a-0b4c-4c27-b50f-9c5a5b93c775.jpg"
          title="Try hosting"
          description="Earn extra income and unlock new opportunities by sharing your space."
          buttonText="Learn more"
        /> */}
        <main className="-mb-[60%] mt-[90px] relative mx-42 md:w-[73%] bg-white shadow-2xl m-3 ml-12  p-8 t-0 rounded-2xl mr-10 pb-10  md:ml-40 lg:ml-52 z-10">
          <AddListingForm />
        </main>
        {/* <Footer /> */}
      </MainLayout>
    </>
  );
}

// export async function getStaticProps() {
//   const exploreData = await fetch("https://jsonkeeper.com/b/UMTE").then(
//     (res) => res.json()
//   );

//   const liveAnywhere = await fetch("https://jsonkeeper.com/b/VHHT").then(
//     (res) => res.json()
//   );
//   const discoverExpCard = await fetch("https://jsonkeeper.com/b/UELS").then(
//     (res) => res.json()
//   );
//   return {

//     props: { exploreData, liveAnywhere, discoverExpCard},
//   };
// }

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return { props: { session } };
}
