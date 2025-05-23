import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState("")

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
        // eslint-disable-next-line no-unused-vars, no-empty
      } catch (error) { }
    }
    fetchLandlord()
  }, [listing.userRef])

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className="font-semibold">{landlord.username}</span> for <span className="font-semibold">{listing.name}</span></p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message"
            className="w-full border p-3 rounded-lg"
          >

          </textarea>
          <Link
            className="bg-main-theme text-secondary-theme text-center p-3 uppercase rounded-lg hover:opacity-95"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  )
}
