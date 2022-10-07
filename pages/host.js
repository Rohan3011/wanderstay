import { getSession } from "next-auth/react";
import Head from "next/head";
import HostingCard from "../components/HostingCard";
import AddListingForm from "../components/AddListingForm";
import Header from "../components/Header";

export default function Host(props) {
  return (
    <div>
      <Head>
        <title>Vacation Rental System: Host </title>

        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-7xl  mx-auto py-16 rounded-lg gap-y-20">
        <HostingCard
          img="https://a0.muscache.com/im/pictures/5b4dc94a-0b4c-4c27-b50f-9c5a5b93c775.jpg"
          title="Try hosting"
          description="Earn extra income and unlock new opportunities by sharing your space."
          buttonText="Learn more"
        />

        <section className="bg-white p-8 w-full flex justify-center items-center">
          <AddListingForm />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
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
