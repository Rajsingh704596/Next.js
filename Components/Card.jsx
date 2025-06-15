import Image from "next/image";

const Card = ({ imagePath, Name, Description }) => {
  return (
    <div className="border border-amber-300 rounded-xl w-[200px] p-5 flex flex-col justify-center items-center gap-5 bg-slate-900  hover:-translate-y-2 transition-all duration-300">
      <Image
        src={imagePath}
        alt="Logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="grid gap-4 text-center">
        <span className=" text-cyan-400 text-sm">{Name}</span>
        <p className="text-slate-400 text-xs">{Description}</p>
      </div>
    </div>
  );
};

export default Card;
