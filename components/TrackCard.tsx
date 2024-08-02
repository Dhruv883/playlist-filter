import { TrackProps } from "@/tsInterfaces";
import Image from "next/image";
import { Tooltip, Button } from "@nextui-org/react";

const TrackCard: React.FC<TrackProps> = ({ track }) => {
  // console.log(track);
  const convertToMinutes = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="bg-blackGray p-3 rounded-[15px] flex items-center justify-between text-sm tracking-wide">
      <Image
        src={track.image}
        alt={track.name}
        width={40}
        height={40}
        className="rounded-[8px]"
      />
      <div className="w-1/3">
        <span>{track.name} - </span>
        <span>
          {track.artists[0]}{" "}
          {track.artists.length - 1 > 0
            ? `+ ${track.artists.length - 1}`
            : null}
        </span>
      </div>
      <div className="text-nowrap w-1/5 overflow-hidden overflow-ellipsis">
        {track.album}
      </div>
      <div className="w-1/6">{convertToMinutes(track.duration)}</div>
      <div className="cursor-pointer pr-2">
        {track.preview_url ? (
          <Tooltip content="Preview" className="capitalize">
            <Image src="/play.svg" width={30} height={20} alt="Preview" />
          </Tooltip>
        ) : (
          <Tooltip content="Preview not available">
            <Image
              src="/play.svg"
              width={30}
              height={20}
              alt="Preview"
              className="pointer-events-auto opacity-20"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
