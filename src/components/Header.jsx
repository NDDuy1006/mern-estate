import { FaSearch } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import DefaultProfileAvatar from "./DefaultProfileAvatar"

const Header = () => {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isListingPage = location.pathname.startsWith("/listing/")

  useEffect(() => {
    if (!isListingPage) return;

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlSearchTerm = urlParams.get("searchTerm")
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm)
    }
  }, [location.search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`search?${searchQuery}`)
  }
  // "-translate-y-20"

  return (
    <header
      className={`bg-main-theme fixed z-40 top-0 text-secondary-theme shadow-md transition-transform duration-300 ease-in-out w-full ${isListingPage ? scrolled ? "translate-y-0" : "translate-y-0" : "translate-y-0"}
      `}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Havan</span>
            <span className="text-secondary-theme">Horizon</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-3 rounded flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button
            disabled={searchTerm.length < 1}
            className={`${searchTerm.length < 1 && "opacity-75"}`}
          >
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          {currentUser ? (
            <Link to="/profile">
              {
                currentUser.avatar
                  ? (<img
                    src={currentUser.avatar || ""}
                    alt="profile"
                    className="rounded-full h-10 w-10 bg-slate-100"
                    referrerpolicy="no-referrer"
                  />)
                  : (
                    null
                  )
              }
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="sm:inline hover:underline cursor-pointer">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header