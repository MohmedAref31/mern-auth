import { useDispatch, useSelector } from "react-redux";
import SignoutBtn from "../componentes/SignoutBtn";
import { useEffect, useRef, useState } from "react";
import { notify } from "../componentes/Notify";
import {
  startUpdate,
  updateFaild,
  updateSuccess,
} from "../redux/slices/userSlice";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import DeleteBtn from "../componentes/DeleteBtn";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [imgError, setImgError] = useState(false);
  const [img, setImg] = useState(undefined);
  const [imgProgress, setImgProgress] = useState(0);
  const imgRef = useRef(null);
  console.log(formData);
  // firebase storage config
  const handleImageUpload = async () => {
    const storage = getStorage(app);
    const filename = Date.now() + img.name;
    console.log("filename", filename);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImgProgress(progress);
      },
      (error) => {
        setImgError(error);
      },
      async () => {
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(imgUrl);
        setFormData({ ...formData, profilePicture: imgUrl });
        setImg(undefined)
      }
    );
  };

  useEffect(() => {
    if (img) {
      handleImageUpload();
    }
  }, [img]);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(startUpdate);
      let res = await fetch("/api/users/update", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.success) {
        notify("user created successfully", "success");
        dispatch(updateSuccess(data.data));
      } else {
        notify(data.data.message, "error");
        dispatch(updateFaild(data.data.message));
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3 className="text-[50px] capitalize font-bold text-center m-5 text-slate-800">
        profile
      </h3>
      <div>
        <input
          type="file"
          accept="image/*"
          ref={imgRef}
          hidden
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          className="w-32 aspect-square object-cover rounded-full m-auto cursor-pointer"
          onClick={() => imgRef.current.click()}
        />
        {imgError ? (
          <p className="text-center text-red-700 font-semibold">imgError</p>
        ) : imgProgress === 100 ? (
          <p className="text-center text-green-700 font-semibold">Image updated succefully</p>
        ) : imgProgress > 0 ? (
          <p className="text-center text-green-700 font-semibold">{imgProgress + "%"}</p>
        ) : (
          ""
        )}
      </div>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 max-w-lg  my-3 mx-auto p-3"
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
          onChange={handleChanges}
        />
        <p className="capitalize text-sm text-red-700 font-bold">
          {error ? error || "something went wrong" : ""}
        </p>

        <button
          type="submit"
          className="bg-slate-800 rounded-md p-2 text-slate-100 capitalize text-lg font-semibold active:opacity-90 disabled:opacity-50"
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className="max-w-lg p-3 m-auto flex justify-between">
       <DeleteBtn/> <SignoutBtn />
      </div>
    </div>
  );
}
