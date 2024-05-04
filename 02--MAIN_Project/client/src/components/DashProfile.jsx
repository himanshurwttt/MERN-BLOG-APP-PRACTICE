import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadingProgress, setimageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    {
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write : if
      //       request.resource.size < 2 * 1024 * 1024 &&
      //       request.resource.contentType.matches( 'image/.*')
      //      }
      //   }
      // }
    }
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadingProgress(progress.toFixed(0));
      },

      (error) => {
        setImageFileUploadError(
          `The file can't get upload ( The file size must  less then 2mb)`
        );
        setImageFile(null);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUploadSuccess(true);
        });
      }
    );
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No update changes made");
      return;
    }

    if (imageUploadSuccess) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }

    try {
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setImageUploadSuccess(false);
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Users profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(data.error));
      setImageUploadSuccess(false);
      setUpdateUserError(error);
    }
  };
  return (
    <div className="p-3 w-full max-w-lg mx-auto">
      <h1 className="w-full text-center font-semibold my-7 text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="self-center w-32 h-32 overflow-hidden cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileURL || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover "
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="text-center "
          onChange={handleOnChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="text-center "
          onChange={handleOnChange}
        />
        <TextInput
          type="text"
          placeholder="password"
          id="password"
          className="text-center "
          onChange={handleOnChange}
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5 font-semibold">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert className="mt-5" color={"success"}>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert className="mt-5" color={"failure"}>
          {updateUserError}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
