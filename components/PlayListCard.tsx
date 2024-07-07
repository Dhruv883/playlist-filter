import { Card, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { PlayListCardProps } from "@/tsInterfaces";

const PlayListCard: React.FC<PlayListCardProps> = ({ playlist }) => {
  return (
    <a href={`/playlist/${playlist.id}`} target="_blank">
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none h-64 w-72 font-notoSans cursor-pointer"
      >
        <Image
          alt=""
          className="object-cover w-full h-full"
          src={`${
            playlist.images
              ? playlist.images[0]
              : "https://nextui.org/images/hero-card.jpeg"
          }`}
          width={300}
          height={300}
        />
        <CardFooter className="flex-col gap-1 justify-between backdrop-blur-2xl bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div className="w-full text-base text-white/70 overflow-hidden text-ellipsis text-nowrap">
            {playlist.name}
          </div>
          <div className="w-full flex flex-wrap gap-4 items-center justify-between text-sm text-white">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>{playlist.owner}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music2Icon className="w-4 h-4" />
              <span>{playlist.total} Songs</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default PlayListCard;

function Music2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
