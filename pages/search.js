import MainLayout from "../components/MainLayout";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { BASE_URL } from "../config";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formatedStartDate = format(new Date(startDate), "dd MMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMM yy");

  const range = `${formatedStartDate} - ${formatedEndDate}`;

  return (
    <>
      <Head>
        <title>VacRent: {location} </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <MainLayout
        placeholder={` ${location} | ${formatedStartDate} - ${formatedEndDate} | ${noOfGuests} guests`}
      >
        <main className="-mb-[60%] mt-[90px] relative mx-42 md:w-[73%] bg-white shadow-2xl m-3 ml-12  p-8 t-0 rounded-2xl mr-10 pb-10  md:ml-40 lg:ml-52 z-10">
          <p className="text-xs ">
            300+ Stays - <span className="font-bold">{range}</span>- for{" "}
            {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-2 text-gray-800 whitespace-norap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type Of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <Fade>
            <div className="flex flex-col  ">
              {searchResults?.map((data, idx) => (
                <InfoCard key={idx} {...data} />
              ))}
            </div>
          </Fade>
        </main>
      </MainLayout>
    </>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch(`${BASE_URL}/api/explore`).then((res) =>
    res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
