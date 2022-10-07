import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import { useFetchListings } from "../services/fetchListings";
import InfoCard from "../components/InfoCard";
import { Loader } from "@mantine/core";

export default function Home() {
  const { loading, error, data } = useFetchListings();

  return (
    <div>
      <Head>
        <title>Vacation Rental System </title>
        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>

      <div>
        <Header />
        {/* <MobileNav /> */}
        <main className="max-w-7xl mx-auto px-8 p-10 pb-16 rounded-lg m-5 shadow-xl sm:px-16">
          <section className="pt-10">
            {loading ? (
              <div className="flex p-4 m-4 justify-center items-center">
                <Loader />
              </div>
            ) : (
              data?.map(
                (
                  {
                    id,
                    image,
                    location,
                    title,
                    description,
                    rating,
                    pricing,
                    total,
                    isBooked,
                  },
                  idx
                ) => (
                  <InfoCard
                    key={idx}
                    id={id}
                    img={image}
                    location={location}
                    title={title}
                    description={description}
                    star={rating}
                    price={pricing}
                    total={total}
                    isBooked={isBooked}
                  />
                )
              )
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
