import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "../../managers/EventManager.js"
import { Link, useNavigate } from 'react-router-dom'

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} by {event.hoster.full_name}</div>
                        <div className="event__players">{event.description}</div>
                        <div className="event__game">We will be playing {event.game.name}</div>
                        <div className="event__datetime">We will start playing {event.datetime}</div>
                        <div>
                            <Link className="edit-event" to={`/events/${event.id}`}>EDIT EVENT</Link> 
                        </div>
                        <button className="delete-btn" 
                        onClick={() => {
                            deleteEvent(event.id)
                            .then(() => {
                                getEvents().then(data => setEvents(data))
                            })
                        }}>Delete</button>
                        
                        {
                            event.joined ?
                            // TODO: create the Leave button\
                            <button className="delete-btn" 
                            onClick={() => {
                                leaveEvent(event.id)
                                .then(() => {
                                    getEvents().then(data => setEvents(data))
                                })
                                }}>Leave</button>
                            :
                            // TODO: create the Join button
                            <button className="delete-btn" 
                            onClick={() => {
                                joinEvent(event.id)
                                .then(() => {
                                    getEvents().then(data => setEvents(data))
                                }) 
                                }}>Join</button>
                        }
                    
                    </section>
                })
            }
        </article>
    )
}