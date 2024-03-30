import homebg from "../assets/homebg.png";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();

  return (
        <div className="w-full h-screen bg-[url('./assets/homebg.png')] bg-center bg-cover">
        {/* <img
          src={homebg}
          alt="homebg"
          className="w-full h-full object-cover"
        /> */}
        <Header/>

        <div className="flex flex-col gap-6 p-40 px-4 max-w-7xl mx-auto">
          <h1 className="text-[#d4d4d4] font-extrabold text-3xl lg:text-6xl uppercase">Make Body Stronger</h1>
          <div className="text-[#d4d4d4] text-xs sm:text-base">
            Discover your fitness journey with us! <br /> Explore top-notch equipment,
            tailed programs, and <br /> motivating classes, Start today!
          </div>
          <div className="flex-row">
            <button className="p-3 text-[#d4d4d4] font-semibold uppercase rounded-full bg-[#A80000] hover:bg-[#4c0000]">Join now</button>
            <button className="p-3 text-[#d4d4d4] font-semibold uppercase rounded-full border-2 border-[#A80000] hover:border-[#4c0000] mx-4">Learn more</button>
          </div>
        </div>
      </div>
    </>
  );
}
