import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  NumberInput,
  Image,
  Group,
  Text,
  CloseButton,
  useMantineTheme,
  Box,
  Button,
  Autocomplete,
  Chip,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

import {
  CloudUploadIcon,
  PhotographIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { postListing } from "../services/postListing";
import { useSession } from "next-auth/react";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
// import { DateRangePicker } from "@mantine/dates";

const schema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title should have at least 2 letters")
    .max(250, "Title at max can have 250 letters"),
  rating: Yup.number()
    .required("Rating cannot be null")
    .min(1, "Rating aleast should be 1")
    .max(5, "Rating at max can be 5"),
  description: Yup.string()
    .notRequired()
    .max(5000, "Maximun 5000 letters are allowed"),
  pricing: Yup.number()
    .required("Price cannot be null")
    .min(2000, "Price should start at ₹ 2000")
    .max(1000000, "Price should be less than ₹ 1000000"),
  location: Yup.string().required("Location cannot be null"),
});

export default function AddListingForm() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      rating: 5,
      pricing: 2000,
      location: "",
      feature: {
        breakfast: false,
        parking: false,
        pets: false,
      },
    },

    validate: yupResolver(schema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validate();
    if (!form.isValid()) return;
    postListing({
      ...form.values,
      image: selectedFile,
      host: session.user.id,
    })
      .then(() => {
        showNotification({
          title: "Listings added successfully",
          message: "Go to explore page to see your listing",
          color: "green",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Failed to add Listings",
          color: "red",
        });
        console.error(err);
      });
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-4">
      <h1 className="font-bold leading-snug text-5xl rounded-md mb-4">
        Become a Host
      </h1>
      <Box className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <DragAndDropImage
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>

          <TextInput
            label="Title"
            placeholder="Title for your site"
            withAsterisk
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Description"
            placeholder="Brief description"
            {...form.getInputProps("description")}
          />
          <NumberInput
            label="Rating"
            placeholder="Rating"
            min={1}
            max={5}
            withAsterisk
            {...form.getInputProps("rating")}
          />
          <NumberInput
            label="pricing"
            placeholder="pricing"
            withAsterisk
            min={2000}
            max={1000000}
            {...form.getInputProps("pricing")}
          />
          <Autocomplete
            withAsterisk
            label="Location"
            placeholder="Pick one"
            data={["Nashik, Maharashtra"]}
            {...form.getInputProps("location")}
          />

          <Group position="center" mt={15}>
            <Chip
              value="breakfast"
              {...form.getInputProps("feature.breakfast", { type: "checkbox" })}
            >
              BreakFast
            </Chip>
            <Chip
              value="pets allowed"
              {...form.getInputProps("feature.pets", { type: "checkbox" })}
            >
              Pets Allowed
            </Chip>
            <Chip
              value="parking"
              {...form.getInputProps("feature.parking", { type: "checkbox" })}
            >
              Parking
            </Chip>
          </Group>

          <Group position="right" mt="md">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export function DragAndDropImage({ selectedFile, setSelectedFile }) {
  const theme = useMantineTheme();
  const [preview, setPreview] = useState(undefined);
  const openRef = useRef(null);

  const handleOnSelect = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      showNotification({
        title: "Failed! to upload the image",
        color: "red",
      });
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(files[0]);
    showNotification({
      title: "Image uploaded Sucessfully!",
      color: "green",
    });
  };

  const handleOnReject = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
    }
    var binaryData = [];
    binaryData.push(selectedFile);
    const url = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/zip" })
    );
    setPreview(url);
  }, [selectedFile]);

  function ImagePreview() {
    return (
      <div className="w-full border rounded-lg p-4">
        <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image radius="md" src={preview} alt="Random unsplash image" />
        </div>
        <div className="flex justify-center items-start space-x-2 pt-4">
          <Text className="text-center">{selectedFile?.name}</Text>
          <CloseButton onClick={handleOnReject} />
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedFile ? (
        <ImagePreview />
      ) : (
        <Box>
          <Dropzone
            openRef={openRef}
            onDrop={handleOnSelect}
            onReject={handleOnReject}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 120, pointerEvents: "none" }}
            >
              <Dropzone.Accept style={{ maxHeight: 180 }}>
                <IconUpload
                  size={50}
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject style={{ maxHeight: 180 }}>
                <IconX
                  size={50}
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle style={{ maxHeight: 120 }}>
                <IconPhoto size={50} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Group position="center" mt="md">
            <Button onClick={() => openRef.current()}>Select files</Button>
          </Group>
        </Box>
      )}
    </>
  );
}
