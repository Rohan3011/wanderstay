import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { Modal, Badge, Button, Spoiler, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { deleteListings } from "../services/updateListings";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons";

export default function MyHostingCard({
  id,
  image,
  location,
  title,
  description,
  rating,
  pricing,
  feature,
}) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const handleDelete = async () => {
    try {
      const res = await deleteListings(id);
      router.push("/dashboard");
    } catch (err) {
      showNotification({
        title: "Failed to Delete",
        color: "red",
      });
      console.error(err);
    }
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row py-7 px-3 border-b cursor-pointer hover:z-50 rounded-sm hover:ring-1 ring-gray-200 bg-white hover:drop-shadow-2xl transition duration-200 ease-out first:border-t">
        <div className="relative h-40 w-[100%] md:h-52 md:w-80 flex-shrink-0">
          <img className="rounded-2xl object-cover w-full h-full" src={image} />
        </div>
        <div className="flex flex-col flex-grow pt-5 md:pt-0 md:pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <ActionIcon variant="light" color="red" onClick={toggleDeleteModal}>
              <IconTrash size={18} />
            </ActionIcon>
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl">{title}</h4>
            <div className="flex w-full justify-start items-center gap-2 m-1">
              {feature?.breakfast && (
                <Badge size="sm" variant="dot" color={"blue"}>
                  BreakFast
                </Badge>
              )}
              {feature?.parking && (
                <Badge size="sm" variant="dot" color={"blue"}>
                  Parking
                </Badge>
              )}
              {feature?.pets && (
                <Badge size="sm" variant="dot" color={"blue"}>
                  Pets Allowed
                </Badge>
              )}
            </div>
          </div>
          <div className="border-b w-10 pt-2" />
          <Spoiler
            maxHeight={120}
            showLabel="Show more"
            hideLabel="Hide"
            transitionDuration={0}
          >
            <p className="pt-2 text-sm text-gray-500 flex-grow ">
              {description}
            </p>
          </Spoiler>
          <div className="flex justify-between items-center">
            <Rating rating={rating} />
            <div className="flex justify-end items-end gap-2 pb-2">
              <p className="text-right lg:text-2xl font-semibold">{`₹ ${pricing}`}</p>
              <p className="h-full text-right font-light text-sm ">/night</p>
            </div>
          </div>
        </div>
      </div>
      <ModalToDelete
        deleteHosting={handleDelete}
        opened={showDeleteModal}
        onClose={toggleDeleteModal}
      />
    </>
  );
}

function ModalToDelete({ opened, onClose, deleteHosting }) {
  function handleDelete() {
    deleteHosting();
    handleClose();
  }

  function handleClose() {
    onClose();
  }

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={handleClose}
        title="Are you sure you want to delete your hosting?"
      >
        <div className="w-full h-16 flex items-end justify-end space-x-4">
          <Button color="gray" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="red" variant="filled" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

function Rating({ rating }) {
  let star = parseInt(rating);
  return (
    <div className="flex items-center gap-1">
      {Array(star)
        .fill(1)
        .map((el, idx) => (
          <StarIcon className="h-5 text-red-500" key={idx} />
        ))}
    </div>
  );
}
