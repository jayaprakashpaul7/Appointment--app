// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointments: [], starred: false}

  addingAppointment = event => {
    const {title, date} = this.state
    event.preventDefault()
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStarred = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  handleTitle = event => {
    this.setState({title: event.target.value})
  }

  handleDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, appointments, starred} = this.state
    let filterd

    if (starred) {
      filterd = appointments.filter(each => each.isFavorite === true)
    } else {
      filterd = appointments
    }

    return (
      <div className="bg">
        <div className="card">
          <div className="form-img-c">
            <form className="form">
              <h1 className="appointment-heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={this.handleTitle}
              />

              <label htmlFor="date">Date</label>
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={this.handleDate}
              />
              <button
                type="submit"
                onClick={this.addingAppointment}
                className="add-btn"
              >
                Add
              </button>
            </form>

            <div className="img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>

          <hr />
          <div className="appointments-starred-c">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className="filter-btn"
              onClick={this.toggleStarred}
            >
              <span>Starred</span>
            </button>
          </div>

          <ul>
            {filterd.map(eachAppointment => (
              <AppointmentItem
                appointments={eachAppointment}
                key={eachAppointment.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
