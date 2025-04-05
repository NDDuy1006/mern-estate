import { FaBath, FaBed } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import { Link } from "react-router-dom"

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow w-[330px] 2xl:w-[344px] overflow-hidden group">
      <Link to={`/listing/${listing._id}`}>
        <div className="h-[220px] overflow-hidden">
          <img
            src={listing.imageUrls[0] || "https://www.propertymanagementconsulting.com/hubfs/Stock%20images/Real%20estate%20agent%20offer%20house%20represented%20by%20model.jpg"}
            alt="cover"
            className='w-full object-cover group-hover:scale-105 transition duration-300'
          />
        </div>
        <div className="px-6 py-3 flex flex-col gap-2 w-full">
          <div className="flex flex-col items-center pb-3 border-b-2">
            <p
              className="text-lg font-semibold text-slate-700 truncate"
            >
              {listing.name}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-secondary-theme" />
              <p className="text-sm text-gray-600 truncate w-full">
                {listing.address}
              </p>
            </div>
          </div>
          <div className="text-center pb-3 border-b-2">
            <p className="text-sm text-gray-600 line-clamp-2">
              {listing.description}
            </p>
          </div>
          <div className="text-slate-700 flex py-1 justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-xs">
              <FaBed className="h-4 w-4" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bedroom`}
            </div>
            <div className="flex items-center gap-2 font-bold text-xs">
              <FaBath className="h-4 w-4" />
              {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
            </div>
          </div>
        </div>
        <div className="bg-main-theme text-center py-4">
          <p className="text-secondary-theme font-semibold">
            $
            {listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
        </div>
      </Link>
    </div>
  )
}


