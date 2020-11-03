import React, { useEffect, useState } from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'


function FavPage({ characters = [0] }) {

    const [count, setCount] = useState();

    useEffect(() => {
        if (!characters.length) {
            let favs = JSON.stringify(localStorage.getItem('favs'));
            setCount({favs: favs});
        } else {
            localStorage.setItem('favs', characters);
            setCount(...characters);
        }
    }, [])

    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }

    return (
        < div className={styles.container} >
            <h2>Favoritos</h2>
            { characters.map(renderCharacter)}
            { !characters.length && <h3>No hay personajes agregados</h3>}


            {/* {console.log(typeof count, count)} */}
            {console.log(typeof characters, characters)}


            {/* {!characters.length && count[0].map(renderCharacter)} */}
        </div >
    )

}

function mapState({ characters }) {
    return {
        characters: characters.favorites
    }
}

export default connect(mapState)(FavPage)