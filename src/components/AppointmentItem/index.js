// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointments, toggleStar} = props
  const {id, title, date, isFavorite} = appointments

  const starred = () => {
    toggleStar(id)
  }

  const isStarred = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="h-star-c">
        <h1>{title}</h1>
        <button
          type="button"
          className="btn"
          onClick={starred}
          data-testid="star"
        >
          <img src={isStarred} alt="star" />
        </button>
      </div>

      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
