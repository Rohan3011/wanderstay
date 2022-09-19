import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MobileNav from "../components/MobileNav";
import SmallCard from "../components/SmallCard";
import HostingCard from "../components/HostingCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { live, discover } from "../data";
import Cards from "../components/Cards";
import searchResults from "../data";
import Fade from "react-reveal/Fade";

import wallpaper from "../public/images/results/1.jpg";
import InfoCard from "../components/InfoCard";

export default function Host({}) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>Vacation Rental System: Host </title>

        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />

          <MobileNav />
          <main className="max-w-7xl mx-auto px-8 p-10 pb-16 rounded-lg m-5 shadow-xl sm:px-16">
            <Fade>
              <div className="flex flex-col  ">
                <InfoCard
                  img={wallpaper}
                  location={""}
                  title={"Hawaiii Fuck off"}
                  description={"amaizinf usaeg ladfj laf d"}
                  star={4}
                  price={342}
                  total={2342}
                />
              </div>
            </Fade>{" "}
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      )}
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
