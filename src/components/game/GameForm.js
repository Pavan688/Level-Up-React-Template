import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: 0,
        name: "",
        creator: "",
        game_type: 0
    })
    
    // TODO: Get the game types, then set the state
    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name Of Game: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.name = evt.target.value
                                setCurrentGame(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="creator">Number of Players: </label>
                    <input
                        required
                        type="number"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.number_of_players = evt.target.value
                                setCurrentGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input
                        required
                        type="text"
                        placeholder="eg. Ages 8 and up"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.skill_level = evt.target.value
                                setCurrentGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Creator: </label>
                    <input
                        required
                        type="text"
                        className="game-creator"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.creator = evt.target.value
                                setCurrentGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-type-dropdown">Game Type</label>
                    <select onChange={(evt) => {
                        const copy= {...currentGame}
                            copy.game_type = parseInt(evt.target.value) 
                            setCurrentGame(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Game Type</option>
                    {
                        gameTypes.map(
                            (type) => {
                                return <option key={`room--${type.id}`} value={type.id}>{type.game_type}</option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        creator: currentGame.creator,
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: currentGame.skill_level,
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}