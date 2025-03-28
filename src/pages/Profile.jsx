import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutFailure,
  signOutSuccess
} from "../store/user/userSlice"
import { useDispatch } from "react-redux"
import { app } from "../firebase"
import { Link } from "react-router-dom"

export default function Profile() {
  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [formData, setFormData] = useState({})
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [listings, setListing] = useState([])
  const [showListingError, setShowListingError] = useState(false)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name

    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(progress);
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      )

      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch(
        "/api/auth/sign-out",
        {
          method: "POST"
        }
      )
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutFailure(data.message))
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()

      if (data.success === false) {
        setShowListingError(true)
        return
      }

      setListing(data)
    } catch (error) {
      setShowListingError(true)
    }
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      })

      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }

      setListing((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files?.[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        {(formData.avatar || currentUser?.avatar) ? (
          <img
            onClick={() => fileRef.current?.click()}
            src={formData.avatar || currentUser?.avatar} alt="profile"
            className="rounded-full h-24 w-24 object-cover bg-main-theme self-center cursor-pointer"
          />
        ) : currentUser?.avatar ? (
          <img src={currentUser.avatar || ""} alt="profile" className="rounded-full h-7 w-7 object-cover bg-slate-100" />
        ) : (
          null
        )}
        <p className="text-sm self-center">
          {fileUploadError
            ? (
              <span className="text-red-700">
                Image Upload Error
              </span>
            ) : filePercentage > 0 && filePercentage < 100
              ? (
                <span className="text-slate-700">
                  {`Uploading ${filePercentage}%`}
                </span>
              ) : filePercentage === 100
                ? (
                  <span className="text-green-700">
                    Uploaded Successfully
                  </span>
                ) : ("")
          }
        </p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="bg-main-theme text-secondary-theme p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className=" text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className=" text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "Updated Successfully!" : ""}</p>
      <button
        onClick={handleShowListings}
        className="text-green-700 w-full"
      >
        Show Listings
      </button>
      <p className="text-green-700 mt-5">
        {showListingError ? "Error showing listings!" : ""}
      </p>
      {
        listings && listings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1
            className="text-center mt-7 text-2xl font-semibold"
          >
            Your Listings
          </h1>
          {
            listings.map((listing) => (
              <div
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
                key={listing._id}
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]} alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <button className="text-green-700 uppercase">
                    Edit
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}
