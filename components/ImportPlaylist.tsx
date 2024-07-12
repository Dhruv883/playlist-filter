"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { importPlaylist } from "@/utils/playlist";
import { AccessTokenData, ImportPlaylistPrps, PLaylist } from "@/tsInterfaces";

const ImportPlaylist: React.FC<ImportPlaylistPrps> = ({
  token,
  setPlaylists,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState("");

  const handleClick = async (link: string, token: AccessTokenData) => {
    const playlist = await importPlaylist(link, token);
    setPlaylists((prev: Array<PLaylist>) => {
      return [...prev, playlist];
    });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="warning"
        variant="flat"
        className="absolute right-4 top-1 font-manRope text-xl"
      >
        Import
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="bg-[#18181B] font-manRope"
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white font-manRope">
                Import PLaylist
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Link"
                  placeholder="Enter Playlist Link"
                  variant="bordered"
                  className="text-white"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="warning"
                  variant="flat"
                  onPress={() => {
                    handleClick(link, token);
                    onClose();
                  }}
                >
                  Import
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportPlaylist;
