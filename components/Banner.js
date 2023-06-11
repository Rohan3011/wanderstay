import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import LargeCard from "./LargeCard";

function Banner(props) {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <div className="relative  h-[500px] sm:h-[550px] lg:h-[700px] xl:h-[700px] 2xl:h-[800px] overflow-hidden">
      <div
        className="relative h-[500px] sm:h-[550px] lg:h-[700px] xl:h-[700px] 2xl:h-[800px]"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <Image src="/main.jpg" layout="fill" objectFit="cover" />
      </div>

      <div className="absolute top-[30%] md:top-[35%] lg:top-[35%] xl:top-[40%] w-full text-center">
        <motion.div
          style={{
            perspective: 2000,
            x,
            y,
            rotateX,
            rotateY,
            z: 100,
            cursor: "grab",
          }}
          drag
          dragElastic={0.16}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: "grabbing" }}
          className="w-full"
        >
          <div className="flex flex-col justify-center place-items-center rounded-lg   max-w-5xl md:h-[200px] mx-auto">
            <motion.div
              style={{ perspective: 2000, x, y, rotateX, rotateY, z: 100 }}
              drag
              dragElastic={0.16}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              whileTap={{ cursor: "grabbing" }}
              className=" w-[300px] h-[250px]  md:h-[300px] lg:w-full lg:h-[350px] xl:h-96 sm:left-0 bg-[#4f3f16] bg-opacity-80 rounded-2xl"
            >
              <motion.div
                style={{
                  perspective: 2000,
                  x,
                  y,
                  rotateX,
                  rotateY,
                  z: 100,
                  cursor: "grab",
                }}
                drag
                dragElastic={0.16}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className="w-full h-full"
              >
                <div className="relative w-[300px] h-[250px]  md:h-[300px] lg:w-full lg:h-[350px] xl:h-96 ">
                  <Image
                    src="https://media.giphy.com/media/WT8liQbmP3CdbVUJSx/giphy.gif"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-2xl pointer-events-none shadow-lg"
                  />
                </div>
              </motion.div>
              <motion.div
                style={{ x, y, rotateX, rotateY, z: 2000, cursor: "grab" }}
                drag
                dragElastic={0.1}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className="absolute top-[12px]  md:top-[20%] lg:top-20 xl:top-28 p-5 rounded-md z-40 backdrop-blur"
              >
                <h1 className="font-heading font-bold text-3xl lg:text-5xl">
                  Discover Your Perfect Stay, Anywhere in the World!
                </h1>
                <p className="-ml-5 ">Go on now. be spontaneous!</p>
                <button className="text-sm text-white hover:bg-[#fa5252]  hover:shadow-md transform transition-all duration-300 shadow-xl -ml-8 bg-gray-900 px-4 py-2 rounded-lg mt-5">
                  Take me to nirvana!
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;
