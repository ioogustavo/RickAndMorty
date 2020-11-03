import React, { useEffect, useState } from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'


function FavPage({ characters = [0] }) {

    const [count, setCount] = useState([]);

    useEffect(() => {
        localStorage.favs = JSON.stringify(characters)
        let favs = localStorage.getItem('favs')
        // setCount()
        console.log(favs)
    }, [])


    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

function mapState({ characters }) {
    return {
        characters: characters.favorites
    }
}

export default connect(mapState)(FavPage)