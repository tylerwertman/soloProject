import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const BookDetail = (props) => {
    const {welcome, user} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [favorites, setFavorites] = useState([])
    const [booksFavorited, setBooksFavorited] = useState([])
    const [filteredFavs, setFilteredFavs] = useState([])
    const hideFav = "btn btn-success"
    const hideUnfav = "btn btn-warning"


    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            setFavorites([...res.data.book.favoritedBy])
            console.log(`useeffect booksFavorited res`, res.data.book)
            console.log(`useeffect favs`, favorites)
            
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res.data.book.addedBy)
            // console.log(res.data.book)
            // console.log(username)

            // console.log(favorites)
        })
        // .then(console.log(oneBook))
        .catch(err=>console.log(err))
    
    }, []);

    const removeBook = () => {
        axios.delete(`http://localhost:8000/api/books/${id}`)
        .then(res=>navigate("/dashboard"))
        .catch(err=>console.log(err))
    }
    const editBook = (e) => {
        navigate(`/books/${id}/edit`)
    }

    const favoriteBook = () => {
        // console.log(oneBook)
        if(!favorites?.includes(welcome)){
            console.log(`favorite fn 1`, favorites)
            favorites?.push(welcome)

            //put to books object
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
            .then(res=>{
                console.log(`book fav success?`, `favorites`, favorites)
                navigate(`/books/${id}`)
        })
            .catch(err=>console.log(`fav put error`, `favorites`, favorites))
            console.log(`book favorite fn 2`, favorites)
        }

        //put to user object
        axios.put(`http://localhost:8000/api/users/${user._id}`, {booksFavorited: booksFavorited})
            .then(res=>{
                console.log(`user fav success?`, `favorites`, booksFavorited)
        })
            .catch(err=>console.log(`fav put error`, `favorites`, booksFavorited))
            console.log(`user favorite fn 2`, booksFavorited)
        }


    const unfavoriteBook = () => {
        const filteredFavs = favorites.filter(user => {return user!==welcome})
        console.log(filteredFavs)
        setFavorites(filteredFavs)
        // console.log(`unfavorite fn 1`, `favorites`, favorites, `filteredFavs`, filteredFavs)
        axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavs})
        .then(res=>{
            console.log(`UNfav success?`, `favorites`, favorites, `filteredFavs`, filteredFavs)
            navigate(`/books/${id}`)
        })
        .catch(err=>console.log(`UNfav put error`, `favorites`, favorites, `filteredFavs`, filteredFavs))
        // console.log(`unfavorite fn 2`, `favorites`, favorites, `filteredFavs`, filteredFavs)
    }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                {
                    favorites?.includes(welcome) ? <><button className={hideUnfav} onClick={()=>unfavoriteBook(favorites.id)}>Unfavorite Book</button>&nbsp;&nbsp;</> : <><button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;&nbsp;</>
                }
                {/* <button className={hideFav} onClick={favoriteBook}>Favorite Book</button> */}
                {/* <button className={hideUnfav} onClick={()=>unfavoriteBook(favorites.id)}>Unfavorite Book</button>&nbsp;&nbsp; */}
                {
                    (welcome === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-danger' onClick={removeBook}>Delete Book</button>&nbsp;&nbsp;</> : null
                }
                
                {
                    (welcome === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-info' onClick={editBook}>Edit Book</button>&nbsp;&nbsp;</> : null
                }
                <br/>                
                <h2>Book Title: {oneBook.title}</h2>
                <h3>Book Author: {oneBook.author}</h3>
                <h4>Added by: {oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</h4>
                <h6>Added on: {new Date(oneBook.createdAt).toLocaleString()}</h6>
                <h6>Last Updated on: {new Date(oneBook.updatedAt).toLocaleString()}</h6>
                <h4>Favorited By:</h4>
                {
                    favorites?.map((fav, index) => {
                        return <h5 key={index}>{favorites[index]}<br/> </h5>
                    })
                }
            </div>
        </div>
    )
}

export default BookDetail