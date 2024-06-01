import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function UpdateProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [bioLength, setBioLength] = useState("");
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserNameChnage = (e) => {
    const value = e.target.value;
    setUsername(value.replace(/\s/g, ""));
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
    setBioLength(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || username == "") {
      setFormError("username Field is empty");
    }
    const res = await fetch(`/api/user/updateuser/${currentUser._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        bio: bio,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateUserSuccess(data));
      navigate("/dashboard?tab=profile");
      setFormError(null);
    }
    if (!res.ok) {
      setFormError(data.message);
    }
  };

  return (
    <div className="w-full ">
      <div className="w-full  h-full  flex justify-center ">
        <form onSubmit={handleSubmit} className="box w-full p-2 md:w-[70%]">
          <h1 className="font-semibold text-4xl text-center uppercase underline text-gray-600">
            Update Profile
          </h1>
          <div className="img rounded-full my-5 flex justify-center items-center ">
            {currentUser.profilePicture && (
              <img
                src={currentUser.profilePicture}
                alt={currentUser.username}
                className="rounded-full w-32 h-32 border-blue-900 border-[5px] object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="inputs flex flex-col gap-5 my-10">
            <div className=" flex flex-col gap-5 md:flex-row">
              <div className="username flex flex-col gap-2 w-full ">
                <label className="font-semibold">UserName :</label>
                <input
                  type="text"
                  value={username}
                  id="username"
                  onChange={handleUserNameChnage}
                  className="w-full p-1 rounded-md px-6 drop-shadow-xl focus:outline-none "
                />
              </div>
              <div className="email flex flex-col gap-2 w-full">
                <label className="font-semibold">Email :</label>
                <input
                  type="text"
                  value={currentUser.email}
                  className="w-full p-1 rounded-md focus:outline-none px-6 drop-shadow-xl "
                  readOnly
                />
              </div>
            </div>
            <div className="bio flex flex-col gap-2">
              <label className="font-semibold">Bio :</label>
              <textarea
                maxLength={"180"}
                value={bio}
                id="bio"
                onChange={handleBioChange}
                className="w-full p-1 rounded-md px-6 h-28 drop-shadow-xl resize-none focus:outline-none "
              />
              <p className="text-xs text-gray-400">
                {" "}
                {180 - bioLength.length} characters remaining
              </p>
            </div>

            {formError && (
              <p className="border border-red-500 p-1 rounded-md">
                {formError}
              </p>
            )}
          </div>
          <div className="buttons flex flex-col md:flex-row gap-5">
            <div className="update w-full">
              <button className="w-full  font-semibold text-white bg-blue-800 p-3 shadow-lg rounded-full active:scale-[0.95] duration-100 drop-shadow-xl focus:outline-none">
                Update
              </button>
            </div>
          </div>
          <div className="moreOpt"></div>
          <div className="lastPost"></div>
        </form>
      </div>
    </div>
  );
}
