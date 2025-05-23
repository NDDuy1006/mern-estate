import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ListingCard from "../components/ListingCard"


export default function Search() {
  const navigate = useNavigate()
  const [loading, setLoadding] = useState([])
  const [listings, setListings] = useState()
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc"
  })
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTerm = urlParams.get("searchTerm")
    const type = urlParams.get("type")
    const parking = urlParams.get("parking")
    const furnished = urlParams.get("furnished")
    const offer = urlParams.get("offer")
    const sort = urlParams.get("sort")
    const order = urlParams.get("order")

    if (
      searchTerm ||
      type ||
      parking ||
      furnished ||
      offer ||
      sort ||
      order
    ) {
      setSidebarData({
        searchTerm: searchTerm || "",
        type: type || "",
        parking: parking === "true" ? true : false,
        furnished: furnished === "true" ? true : false,
        offer: offer === "true" ? true : false,
        sort: sort || "created_at",
        order: order || "desc"
      })
    }

    const fetchListings = async () => {
      setLoadding(true)
      setShowMore(false)
      const searchQuery = urlParams.toString()
      const res = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await res.json()
      if (data.length > 8) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      setListings(data)

      setLoadding(false)
    }
    fetchListings()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sell") {
      setSidebarData({ ...sidebarData, type: e.target.id })
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }

    if (
      e.target.id === "parking"
      || e.target.id === "furnished"
      || e.target.id === "offer"
    ) {
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false })
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at"
      const order = e.target.value.split("_")[1] || "desc"

      setSidebarData({ ...sidebarData, sort, order })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams()
    urlParams.set("searchTerm", sidebarData.searchTerm)
    urlParams.set("type", sidebarData.type)
    urlParams.set("parking", sidebarData.parking)
    urlParams.set("furnished", sidebarData.furnished)
    urlParams.set("offer", sidebarData.offer)
    urlParams.set("order", sidebarData.order)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const onShowMore = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex", startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`)

    const data = await res.json()
    if (data.length < 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:h-[calc(100vh-72px)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice-desc">
                Price hight to low
              </option>
              <option value="regularPrice-asc">
                Price low to high
              </option>
              <option value="createdAt_desc">
                Latest
              </option>
              <option value="createdAt_asc">
                Oldest
              </option>
            </select>
          </div>
          <button
            className="bg-main-theme text-secondary-theme p-3 rounded-lg uppercase hover:opacity-90"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Results</h1>
        {
          !loading && listings && (
            <div
              className={`p-5 pb-4 md:pb-2 flex flex-wrap justify-center md:justify-start gap-4 md:overflow-y-auto md:flex-grow ${listings.length > 4 && "md:h-[calc(100vh-160px)]"}`}
            >
              {!loading && listings.length === 0 && (
                <p className="text-xl text-slate-700">No listing found.</p>
              )}
              {loading && (
                <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
              )}
              {
                !loading && listings && listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                  />
                ))
              }
              {showMore && (
                <button
                  onClick={onShowMore}
                  className="text-secondary-theme hover:underline px-7 py-3 w-full text-center"
                >
                  Show more
                </button>
              )}
            </div>
          )
        }
      </div>
    </div>
  )
}