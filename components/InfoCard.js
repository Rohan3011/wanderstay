import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { bookNow, removeStay, selectItems } from "../slices/bookSlice";
import { Modal, Badge, Button, Loader, Alert } from "@mantine/core";
import { useState } from "react";
import updateListings from "../services/updateListings";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle } from "react-feather";

const InfoCard = ({
  id,
  img,
  location,
  title,
  description,
  star,
  price,
  total,
  isBooked,
}) => {
  const items = useSelector(selectItems);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const continueToBooking = async () => {
    dispatch(
      bookNow({
        id,
        img,
        title,
        description,
        total,
      })
    );
  };

  const createCheckoutSession = async () => {
    if (!session) {
      alert("Please sign in");
    }
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row py-7 px-3 border-b cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t">
        <div className="relative h-32 w-[100%] md:h-52 md:w-80 flex-shrink-0">
          <img className="rounded-2xl object-cover w-full h-full" src={img} />
        </div>
        <div className="flex flex-col flex-grow pt-2 md:pt-0 md:pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            {isBooked ? (
              <Badge size="lg" color="blue">
                Booked
              </Badge>
            ) : (
              <Badge size="lg" color="green">
                Available
              </Badge>
            )}
          </div>
          <h4 className="text-xl">{title}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500 flex-grow ">{description}</p>
          <div className="flex justify-between items-end">
            <p className="flex items-center">
              <StarIcon className="h-5 text-[#e61e4d]" /> {star}
            </p>
            <div className="flex flex-col justify-end -mt-2">
              <p className="text-right lg:text-2xl font-semibold pb-2 pr-4">
                {price}
              </p>
              <p className="text-right font-extralight text-sm">/month</p>
              {!isBooked &&
                (items.length > 0 ? (
                  <>
                    {items.map((item) => {
                      if (item.id == id) {
                        return (
                          <button
                            role="link"
                            onClick={createCheckoutSession}
                            className="bg-[#e61e4d] py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
                          >
                            {!session ? "Sign in to book" : "Pay Now"}
                          </button>
                        );
                      } else {
                        return (
                          <button
                            role="link"
                            onClick={continueToBooking}
                            className="bg-[#e61e4d] py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
                          >
                            {!session ? "Sign in to book" : "Book Now"}
                          </button>
                        );
                      }
                    })}
                  </>
                ) : (
                  <button
                    role="link"
                    onClick={continueToBooking}
                    className="bg-[#e61e4d] py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
                  >
                    {!session ? "Sign in to book" : "Book Now"}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <BookedModal id={id} opened={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default InfoCard;

const BookedModal = ({ id, opened, onClose }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    setIsLoading(true);
    return await updateListings(id, { isBooked: "true" })
      .then((msg) =>
        showNotification({
          title: "Booked Successfully",
          message: msg,
          color: "green",
        })
      )
      .then(() => router.reload(window.location.pathname))
      .catch((err) =>
        showNotification({
          title: "Booking failed!",
          message: err,
          color: "red",
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      size="60%"
      opened={opened}
      onClose={onClose}
      title="Booking Conformation"
    >
      {isLoading ? (
        <div className="flex p-4 m-4 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col">
          <Alert
            icon={<AlertTriangle size={16} />}
            title="Warning!"
            color="red"
          >
            Booking is non-Refundable, guests pay the full price if they cancel,
            make changes, or no-show
          </Alert>
          <div className="w-full h-16 flex items-end justify-end space-x-4">
            <Button color="gray" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button color="red" variant="filled" onClick={handleBooking}>
              Book
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
