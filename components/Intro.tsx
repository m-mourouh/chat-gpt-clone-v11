import { BsSun } from "react-icons/bs";
import { SlEnergy } from "react-icons/sl";
import { GoAlert } from "react-icons/go";
import data from "@/data/properties.json";

export default function Intro() {
  return (
    <div className="flex flex-col mb-36 md:flex-row gap-2 text-center text-slate-700">
      {data.MAIN.map((list, idx) => (
        <div className="mt-5 md:mt-0" key={idx}>
          <h1 className="text-lg mb-3 md:mb-5 flex flex-col items-center gap-2">
            <span className="text-2xl">
              {idx === 0 && <BsSun />}
              {idx === 1 && <SlEnergy />}
              {idx === 2 && <GoAlert />}
            </span>
            <span> {list.title}</span>
          </h1>
          <div className="flex flex-col gap-2  ">
            {list.items.map((item, id) =>
              list.clickable ? (
                <button
                  key={id}
                  className="text-sm bg-gray-50 px-2 py-5 w-full md:max-w-[250px]  rounded-md hover:bg-gray-200 "
                >
                  {item}
                </button>
              ) : (
                <span
                  className="text-sm w-full bg-gray-50 px-2 py-5 md:max-w-[250px] rounded-md"
                  key={id}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
