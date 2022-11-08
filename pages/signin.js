import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../config";

const Login = ({ providers }) => {
  return (
    <div className={""}>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
      {Object.values(providers).map((provider) => {
        return (
          <div
            key={uuidv4()}
            id={provider}
            className={
              "bg-[#ff5a5f] md:left-[50%] md:p-[50px] px-[10%] left-[50%]   translate-x-[-50%] translate-y-[-50%] text-center shadow-2xl"
            }
            style={{
              position: "absolute",
              top: "50%",
              // left: "50%",
              // transform: "translateX(-50%) translateY(-50%)",
              borderRadius: "5px",
              borderRadius: 10,
            }}
          >
            <div className="flex flex-col items-center mt-10">
              <img
                className={"cursor-pointer h-[480] w-[640]  sm:w-52 "}
                src="https://cdn.dribbble.com/users/385247/screenshots/3623803/01_06_2017_airbnb_800x600.gif"
              />
            </div>
            <button
              className="mt-9 md:mb-0 mb-10  p-2 mx-auto  bg-red-50 max-width-30 lg:w-60 md:w-40 t
               items-center  focus:hover:ring-2 uppercase text-center rounded-xl py-2 cursor-pointer hover:opacity-95 transition outline-none active:scale-95
                 duration-200"
              onClick={() => signIn(provider.id, { callbackUrl: BASE_URL })}
            >
              <span className="text-xs font-semibold text-center select-none ">
                Sign In With {provider.name}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Login;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}
