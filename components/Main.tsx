import data from "@/data/properties.json";
import Intro from "./Intro";
import Message from "./Message";


export default function Main() {
  return (
    <main className="relative w-full flex items-center justify-center transition-all duration-500 ">
      <div className=" bg-white min-h-screen flex flex-col items-center justify-center p-4 container relative md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
        <h1 className="text-4xl font-semibold text-center mb-3 mt-14 md:mb-16 ">
          {data.APP_NAME}
        </h1>
        <Intro />
        <Message placeholder={data.FORM.input_placeholder} />
      </div>
    </main>
  );
}
