import React, { useState } from 'react';
import axios from 'axios';
// import { Book } from '../App';

type Props = {
  setBooks: (books: any[]) => void; // Adjust the type as needed
}
const BookForm = ({ setBooks }: Props) => {
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [error,setError] = useState("");
  const addAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setAuthor(e.target.value);
          setError("");
      }
  
      const addGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setGenre(e.target.value);
          setError("");
      }
      const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setPrice(e.target.value);
          setError("");
      }

      const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setTitle(e.target.value);
          setError("");
      }

      const submitBook = () => {
        
            if (title !== "" && author !== "" && genre !== "" && price !== "") {
                // If the edit mode is toggled off, send the updated book data to the server
                console.log("Send Request");
                axios.post("http://localhost:3000/book", {
                    title: title,
                    author: author,
                    genre: genre,
                    price: price
                }).then((response) => {
                    console.log('Book updated:', response.data);
                    setBooks(response.data); // Update the book list after deletion
                    setTitle("");
                    setAuthor("");
                    setGenre("");
                    setPrice("");
                }).catch((error: any) => {
                    //catch an error for the api
                    console.log("This is An Error", error);
                    setError(error.message);
                });
            } else {
               //catch any user issue before sending the api 
                let errorMessage= "";

                if (title === ""){
                    errorMessage += "Title is required ";
                }
                if (author === ""){
                    errorMessage += "Author is required ";
                }
                if (genre=== ""){
                    errorMessage += "Genre is required ";
                }
                if (price === ""){
                    errorMessage += "Price is required ";
                }

                setError(`All fields are required:${errorMessage}`)
        }
    }

  return (
  <div>
  {error ? <div className="form-error">{error}</div> : null}

  <div className="book-form">
    <div className="form-title">Add a New Book</div>

    <div className="form-field">
      <label className="field-label">Title:</label>
      <input type="text" value={title} onChange={addTitle} className="field-input" />
    </div>

    <div className="form-field">
      <label className="field-label">Author:</label>
      <input type="text" value={author} onChange={addAuthor} className="field-input" />
    </div>

    <div className="form-field">
      <label className="field-label">Genre:</label>
      <input type="text" value={genre} onChange={addGenre} className="field-input" />
    </div>

    <div className="form-field">
      <label className="field-label">Price:</label>
      <input type="text" value={price} onChange={addPrice} className="field-input" />
    </div>

    <button onClick={submitBook} className="form-button">Add Book</button>
  </div>
</div>
  )
}

export default BookForm