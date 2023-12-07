import { createContext, useState, useCallback } from "react";
import axios from "axios";

const booksContext = createContext();

function Provider({children}) {
    const [books,setBooks] = useState([]);


    const fetchBooks = useCallback(async () =>{
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }, []);

    const editById = async (id, newTitle) =>{
        const response = await axios.put(`http://localhost:3001/books/${id}`, {title: newTitle});


        const updatedBooks = books.map((book) =>{
            if(book.id === id){
                return {...books, ...response.data};
            }
    
            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteById = async (id) =>{
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((books) => {
           return books.id !== id;
        });

        return setBooks(updatedBooks);
    }


    const createBook = async (title) =>{

        const response = await axios.post('http://localhost:3001/books', {title})

         const updatedBooks = [...books, response.data];
         setBooks(updatedBooks);
    };


    const valueToShare = {
        books,
        deleteById,
        editById,
        createBook,
        fetchBooks,
    };

    return(
        <booksContext.Provider value={valueToShare}>
            {children}
        </booksContext.Provider>
    );
}

export {Provider};
export default booksContext;