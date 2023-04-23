import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const UserDetail = (props) => {
    const {id} = useParams()
    const {welcome, user} = props

    const [oneUser, setOneUser] = useState({})
    // const [favs, setFavs] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then(res=>{
            setOneUser(res.data.user)
            console.log(res.data.user)
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res)
        })
        .catch(err=>console.log(err))
        
    }, []);
    // console.log(oneUser.booksFavorited[0])
    return (
        <div className='mt-5'>
            <h2>Username: {welcome}</h2>
            <h4>Joined on: {new Date(oneUser?.createdAt).toLocaleString()}</h4>
            <h4>Last updated: {new Date(oneUser?.updatedAt).toLocaleString()}</h4>
            <h4>Favorite Books:</h4>
            {
                oneUser?.booksFavorited?.map((favs, index)=>{
                    return <div key={index}>
                            <p>{oneUser?.booksFavorited[index]}</p>
                            </div>
                })
            }
            <h4>Added Books:</h4>
        </div>
    )
}

export default UserDetail