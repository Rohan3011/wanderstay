import { HeartIcon as OutlineHeart } from "@heroicons/react/outline";
import { StarIcon, HeartIcon as SolidHeart } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { bookNow, removeStay, selectItems } from "../slices/bookSlice";
import { Modal, Badge, Button, Loader, Alert, Spoiler } from "@mantine/core";
import { useEffect, useState } from "react";
import { updateListings, bookListings } from "../services/updateListings";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Heart } from "react-feather";
import { addToFavourite } from "../services/addToFavourites";

const InfoCard = ({
  id,
  image,
  location,
  title,
  description,
  rating,
  pricing,
  total,
  isBooked,
  isLiked,
  hostID,
  renterID,
  feature,
}) => {
  const items = useSelector(selectItems);
  const [open, setOpen] = useState(false);
  const [showCancelBooking, setShowCancelBooking] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const handleFavourite = () => setIsFavourite(!isFavourite);

  const continueToBooking = async () => {
    dispatch(
      bookNow({
        id,
        image,
        location,
        title,
        description,
        rating,
        pricing,
        total,
        isBooked: true,
      })
    );
  };

  const removeBooking = async () => {
    dispatch(
      removeStay({
        id,
        image,
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

  function ActionButtons() {
    if (isBooked)
      return (
        <div className="w-full mt-1 flex justify-end items-center">
          <Badge size="lg" color="blue" variant="filled">
            Booked
          </Badge>
        </div>
      );

    const arr = items.filter((item) => item.id == id);

    return (
      <div className="w-full mt-1 flex justify-end items-center">
        {arr.length ? (
          <div className=" flex flex-row-reverse gap-2">
            <Button color={"red"} role="link" onClick={createCheckoutSession}>
              {!session ? "Sign in to book" : "Pay Now"}
            </Button>
            <Button
              variant="outline"
              color="gray"
              onClick={() => setShowCancelBooking(true)}
            >
              {!session ? "Sign in to book" : "Cancel booking"}
            </Button>
          </div>
        ) : (
          <Button color="red" role="link" onClick={continueToBooking}>
            {!session ? "Sign in to book" : "Book Now"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col md:flex-row py-7 px-3 border-b cursor-pointer hover:z-50 rounded-sm hover:ring-1 ring-gray-200 bg-white hover:drop-shadow-2xl transition duration-200 ease-out first:border-t">
        <div className="relative h-40 w-[100%] md:h-52 md:w-80 flex-shrink-0">
          <img className="rounded-2xl object-cover w-full h-full" src={image} />
        </div>
        <div className="flex flex-col flex-grow pt-5 md:pt-0 md:pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <div hidden={!session} onClick={handleFavourite}>
              {isFavourite ? (
                <SolidHeart className="w-6 h-6 text-red-500 transition-all duration-200" />
              ) : (
                <OutlineHeart className="w-6 h-6 text-gray-800 transition-all duration-200" />
              )}
            </div>
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
          <ActionButtons />
        </div>
      </div>
      <BookedModal
        id={id}
        userID={session?.user.id}
        opened={open}
        onClose={() => setOpen(false)}
      />
      <ModalToCancelBooking
        cancelBooking={removeBooking}
        opened={showCancelBooking}
        onClose={() => setShowCancelBooking(false)}
      />
    </>
  );
};

export default InfoCard;

const BookedModal = ({ id, opened, onClose, userID }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingFailed = (err) => console.log(err);

  const bookingDetails = { listingID: id, isBooked: "true", renterID: userID };

  const handleBooking = () => {
    setIsLoading(true);
    return updateListings(id, bookingDetails)
      .then(() =>
        bookListings(userID, id, bookingDetails)
          .then(() => router.push("/success"))
          .catch((err) => handleBookingFailed(err))
      )
      .catch((err) => handleBookingFailed(err))
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
            Booking is non-Refundable, guests pay the full pricing if they
            cancel, make changes, or no-show
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

function ModalToCancelBooking({ opened, onClose, cancelBooking }) {
  function handleCancelBooking() {
    cancelBooking();
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
        title="Are you sure you want to cancel your booking?"
      >
        <div className="w-full h-16 flex items-end justify-end space-x-4">
          <Button color="gray" variant="outline" onClick={handleCancelBooking}>
            Yes, Cancel booking
          </Button>
          <Button color="red" variant="filled" onClick={handleClose}>
            No
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
