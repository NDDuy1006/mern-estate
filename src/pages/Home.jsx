import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/bundle"
import SwiperCore from "swiper"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css/bundle"
import ListingCard from "../components/ListingCard"


export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState({})
  SwiperCore.use([Navigation])
  console.log(offerListings);


  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4")
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4")
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4")
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings()
  }, [])

  return (
    <div className="">
      <div className="flex flex-col gap-6 py-20 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-secondary-theme">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Havan Horizon is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xl sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started!
        </Link>
      </div>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        speed={800}
      >
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="cover" className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2
                  className="text-2xl font-semibold text-slate-600"
                >
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div
                className="flex flex-wrap gap-4"
              >
                {
                  offerListings.map((listing) => (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                    />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2
                  className="text-2xl font-semibold text-slate-600"
                >
                  Places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"search?type=sell"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div
                className="flex flex-wrap gap-4"
              >
                {
                  saleListings.map((listing) => (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                    />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2
                  className="text-2xl font-semibold text-slate-600"
                >
                  Places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div
                className="flex flex-wrap gap-4"
              >
                {
                  rentListings.map((listing) => (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                    />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
