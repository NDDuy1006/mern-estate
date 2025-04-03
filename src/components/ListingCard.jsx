import { MdLocationOn } from "react-icons/md"
import { Link } from "react-router-dom"

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-[330px] 2xl:w-[344px] overflow-hidden group max-h-[412px]">
      <Link to={`/listing/${listing._id}`}>
        <div className="h-[220px] overflow-hidden">
          <img
            src={listing.imageUrls[0] || "https://www.propertymanagementconsulting.com/hubfs/Stock%20images/Real%20estate%20agent%20offer%20house%20represented%20by%20model.jpg"}
            alt="cover"
            className='w-full object-cover group-hover:scale-105 transition duration-300'
          />
        </div>
        <div className="p-3 flex flex-col gap-2 w-full">
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
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


