"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AccessTokenData, Playlist, Track } from "@/tsInterfaces";
import { redirect } from "next/navigation";
import TrackCard from "@/components/TrackCard";
import Select from "react-tailwindcss-select";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";

const Page = ({ params }: { params: { id: number } }) => {
  const [token, setToken] = useState<AccessTokenData>();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [tracks, setTracks] = useState<Array<Track>>();
  const [filteredTracks, setFilteredTracks] = useState<Array<Track>>();
  const playlistId = params.id;

  // FILTERS
  const [artists, setArtists] = useState<Set<string>>(new Set());
  const [albums, setAlbums] = useState<Set<string>>(new Set());
  const [selectedArtists, setSelectedArtists] = useState<Array<Option>>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<Array<Option>>([]);
  const [artistOptions, setArtistOptions] = useState<Array<Option>>([]);
  const [albumOptions, setAlbumOptions] = useState<Array<Option>>([]);

  const fetchTracks = async () => {
    try {
      const response = await axios.get(
        `/api/playlists/${playlistId}/tracks?total=${playlist!.total}`,
        {
          headers: {
            Authorization: `Bearer ${token!.access_token}`,
          },
        }
      );
      setTracks(response.data);
    } catch (error) {
      console.log("Error fetching tracks", error);
    }
  };

  useEffect(() => {
    let tokenLS = localStorage.getItem("token");
    if (!tokenLS) redirect("/login");
    let playlists = localStorage.getItem("playlists");
    if (!playlists) redirect("/playlist");

    const tokenData = JSON.parse(tokenLS!);
    const plist = JSON.parse(playlists).filter(
      (playlist: Playlist) => playlist.id == playlistId.toString()
    );
    setToken(tokenData);
    setPlaylist(plist[0]);
  }, []);

  useEffect(() => {
    if (token && playlist) fetchTracks();
  }, [token, playlist]);

  useEffect(() => {
    if (tracks) {
      setFilteredTracks(tracks);

      const tempArtists = new Set<string>();
      const tempAlbums = new Set<string>();

      tracks.forEach((track: Track) => {
        tempArtists.add(track.artists[0]);
        tempAlbums.add(track.album);
      });

      setArtists(tempArtists);
      setAlbums(tempAlbums);
    }
  }, [tracks]);

  useEffect(() => {
    const newArtistOptions = Array.from(artists).map((artist) => ({
      value: artist,
      label: artist,
    }));
    setArtistOptions(newArtistOptions);
  }, [artists]);

  useEffect(() => {
    const newAlbumOptions = Array.from(albums).map((album) => ({
      value: album,
      label: album,
    }));
    setAlbumOptions(newAlbumOptions);
  }, [albums]);

  const handleArtistChange = (val: SelectValue) => {
    setSelectedArtists(val as Array<Option>);
  };

  const handleAlbumChange = (val: SelectValue) => {
    setSelectedAlbums(val as Array<Option>);
  };

  const applyFilters = () => {
    let newFilteredTracks = tracks;

    if (selectedArtists != null && selectedArtists.length > 0) {
      const artistNames = selectedArtists.map((artist) => artist.value);
      newFilteredTracks = newFilteredTracks?.filter((track: Track) => {
        return track.artists.some((artist) => artistNames.includes(artist));
      });
    }
    if (selectedAlbums != null && selectedAlbums.length > 0) {
      const albumNames = selectedAlbums.map((album) => album.value);
      newFilteredTracks = newFilteredTracks?.filter((track: Track) => {
        return albumNames.includes(track.album);
      });
    }
    setFilteredTracks(newFilteredTracks);
  };

  return (
    <div className={`min-h-screen bg-primary text-white p-4 font-manRope`}>
      <div className="mx-12 mt-10">
        <div className="relative flex items-center space-x-6">
          <div className="w-2/5 flex justify-center">
            <Image
              src={playlist?.images[0]!}
              alt="Playlist Image"
              height={250}
              width={275}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-lightBlue">
              {playlist?.name}
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              {playlist?.description}
            </p>
            <p className="text-gray-400 mt-2 text-lg">
              {playlist?.total} track -{" "}
              {Math.round((playlist?.total! * 3.5) / 60)}+ hrs
            </p>
            {!playlist?.in_collection && (
              <div className="flex space-x-4 mt-4">
                <button className="px-4 py-2 bg-[#2D3032] rounded-full flex items-center gap-2 text-base">
                  <Image
                    src="/playlist-add.svg"
                    width={25}
                    height={25}
                    alt=""
                  />
                  Add to collection
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="my-10">
          <div className="border-2 border-red-500">
            <Select
              primaryColor="red"
              isMultiple={true}
              isClearable={true}
              isSearchable={true}
              value={selectedArtists}
              onChange={handleArtistChange}
              options={artistOptions}
              placeholder="Select Artists"
              classNames={{
                list: "flex flex-wrap gap-y-2",
                menu: "bg-red-500",
                searchContainer: "bg-red-500",
                listItem: ({ isSelected }) =>
                  `block transition duration-200 px-2 py-2 cursor-pointer select-none text-nowrap rounded-2xl w-min ${
                    isSelected
                      ? `text-white bg-blue-500`
                      : `text-gray-500 bg-blue-100 text-blue-500`
                  }`,
              }}
            />
          </div>
          <div>
            <Select
              primaryColor="red"
              isMultiple={true}
              isClearable={true}
              isSearchable={true}
              value={selectedAlbums}
              onChange={handleAlbumChange}
              options={albumOptions}
              placeholder="Select Albums"
              searchInputPlaceholder="Select Albums"
              classNames={{
                list: "flex flex-wrap gap-y-2",
                menu: "bg-red-500",
                searchContainer: "bg-red-500",
                listItem: ({ isSelected }) =>
                  `block transition duration-200 px-2 py-2 cursor-pointer select-none text-nowrap rounded-2xl w-min ${
                    isSelected
                      ? `text-white bg-blue-500`
                      : `text-gray-500 bg-blue-100 text-blue-500`
                  }`,
              }}
            />
          </div>
          <button onClick={applyFilters}>Apply</button>
        </div>

        <div className="mt-8">
          <div className="space-y-4">
            {filteredTracks?.map((track, index) => (
              <TrackCard key={index} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
