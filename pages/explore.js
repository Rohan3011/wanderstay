import Header from "../components/Header";
import { useRouter } from "next/dist/client/router";
import InfoCard from "../components/InfoCard";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import LocationPicker from "../components/LocationPicker";

function Explore({ searchResults }) {
  const router = useRouter();

  return (
    <div className=" h-screen">
      <Head>
        <title>VacRent: Explore nearby </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header className="bg-white" />
      <main className="  -mb-[60%] -mt-[100px] relative bg-white shadow-2xl   p-8 t-0 rounded-2xl  mt-14 pb-10  z-10 flex">
        <div className="flex-1 flex flex-col  ">
          <div className="hidden lg:inline-flex mb-5 space-x-2 text-gray-800 whitespace-norap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type Of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <Fade>
            <div className="flex-1 flex flex-col mr-4  ">
              {searchResults?.map((items, idx) => (
                <InfoCard key={idx} {...items} />
              ))}
            </div>
          </Fade>
        </div>
        <div className="w-1/3">{/* <LocationPicker /> */}</div>
      </main>
    </div>
  );
}

export default Explore;

export async function getServerSideProps() {
  const searchResults = await fetch("http://localhost:3000/api/explore").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
