import React, { useState, useEffect } from "react";
import UnderMaintenanceSVG from "./UnderMaintenanceSVG";
const UnderMaintenance = () => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate the remaining time
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-29T00:00:00"); // Set your target date and time
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <section className="bg-white px-4 dark:bg-boxdark sm:px-6 h-fit">
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex flex-wrap items-center">
          <div className="no-scrollbar h-full w-full overflow-y-auto border-stroke dark:border-strokedark lg:w-1/2 lg:border-r xl:flex xl:items-center xl:justify-center">
            <div className="px-4 py-20 xl:px-0">
              <div>
                <div className="mb-10 flex gap-2  items-center">
                  <h1 className=" text-4xl uppercase border px-2 tracking-widest font-black text-black dark:text-white lg:text-3xl xl:text-[40px] xl:leading-[60px]">
                  Jasmina
                  </h1>
                </div>

                <h1 className="mb-2.5 text-3xl font-black text-black dark:text-white lg:text-4xl xl:text-[50px] xl:leading-[60px]">
                  Under development
                </h1>
                <p className="font-medium">
                  Our website is under maintenance. Please wait for some time.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                {/* Countdown Timer */}
                {["Days", "Hours", "Minutes", "Seconds"].map((unit, idx) => (
                  <div key={unit}>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="timer-box relative overflow-hidden rounded-lg">
                        <span className="flex h-[80px] min-w-[80px] items-center justify-center rounded-lg bg-black px-3 text-xl font-black leading-[1.35] text-white dark:text-boxdark dark:bg-white lg:text-3xl xl:text-[40px]">
                          {timeLeft[unit.toLowerCase()]}
                        </span>
                        <span className="absolute bottom-0 left-0 block w-full bg-[#000]/20 dark:bg-[#fff]/20"></span>
                      </div>
                    </div>
                    <span className="block text-center font-medium">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              {/* <div className="mt-10">
                <p className="mb-5 font-medium text-black dark:text-white">
                  Follow Us On
                </p>
                <div className="flex items-center gap-4">
                  {["#", "#", "#"].map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      className="flex size-10 items-center justify-center rounded-full border border-[#DFE4EA] hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:hover:border-primary"
                    >
                      <svg
                        className="fill-current"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="8.5" cy="8" r="7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
          <div className="hidden w-full lg:block lg:w-1/2">
            <div className="text-center">
              <span className="inline-block">
                <UnderMaintenanceSVG />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderMaintenance;
