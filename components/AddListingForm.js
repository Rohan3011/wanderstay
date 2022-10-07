import React, { useEffect, useState } from "react";
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

const schema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title should have at least 2 letters")
    .max(250, "Title at max can have 250 letters"),
  image: Yup.string().required("Image cannot be null"),
  rating: Yup.number()
    .min(1, "Rating aleast should be 1")
    .max(5, "Rating at max can be 5"),
  description: Yup.string()
    .notRequired()
    .max(5000, "Maximun 5000 letters are allowed"),
  pricing: Yup.number()
    .min(2000, "Price should start at ₹ 2000")
    .max(1000000, "Price should be less than ₹ 1000000"),
});

export default function AddListingForm() {
  const { data: session, status } = useSession();

  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    initialValues: {
      image: "",
      title: "",
      description: "",
      rating: 5,
      pricing: 200,
    },

    validate: yupResolver(schema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  useEffect(() => {
    form.setValues({
      ...form.values,
      image: selectedFile,
    });
  }, [selectedFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.isValid()) {
      console.log(form.errors);
      return;
    }
    postListing({
      ...form.values,
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
        console.log(err);
      });
  };

  const handleReset = () => {
    setSelectedFile(null);
    form.reset();
  };

  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-4">
      <h1 className="font-bold leading-snug text-3xl rounded-md">
        Become a host!
      </h1>
      <Box>
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

          <Group position="right" mt="md">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button
              // className="bg-blue-500 mt-4 px-8 py-2.5 text-center rounded-lg shadow-sm text-white transition-all duration-200 hover:opacity-90"
              type="submit"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export function DragAndDropImage({ selectedFile, setSelectedFile }) {
  const theme = useMantineTheme();

  const [preview, setPreview] = useState(undefined);

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
    let isMounted = true;
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = window.URL.createObjectURL(selectedFile);
    if (isMounted) setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => {
      window.URL.revokeObjectURL(objectUrl);
      isMounted = false;
    };
  }, [selectedFile]);

  function ImagePrivew() {
    return (
      <div className="w-full border rounded-lg p-4">
        <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image radius="md" src={preview} alt="Random unsplash image" />
        </div>
        <div className="flex justify-center items-start space-x-2 pt-4">
          <Text className="text-center">{selectedFile?.path}</Text>
          <CloseButton onClick={handleOnReject} />
        </div>
      </div>
    );
  }

  function UploadImage() {
    return (
      <Dropzone
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
            <CloudUploadIcon
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
            <XCircleIcon
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle style={{ maxHeight: 120 }}>
            <PhotographIcon size={10} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  }

  return selectedFile ? <ImagePrivew /> : <UploadImage />;
}
