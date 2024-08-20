import '../styles/HomeBooksection.css';
import { useEffect, useState } from "react";

function HomeBooksection() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/books")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong!")
                }
                return res.json();
            })
            .then((data) => {
                setBooks(data.data.books)
            })
            .catch((error) => {
                return console.log("Error: \n", error)
            })
    }, [])
    return (
        <>
            <div className='pt-4 ps-5'>
                <h6>Latest Releases</h6>
                <div className="d-flex w-75 flex-direction-row p-2 justify-content-center    booksection">
                    {books.slice(0, 5).map((book, index) => (
                        <div className="bookcard" key={index}>
                            <img className="ms-1 bookcardimg" src={book.image} />
                            <p className='mt-2 w-75'><small>{book.title}</small></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomeBooksection;