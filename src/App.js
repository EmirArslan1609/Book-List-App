import { useEffect, useContext} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import booksContext from './context/books';

function App(){
    const {fetchBooks} = useContext(booksContext);

    useEffect(() =>{
        fetchBooks();
    }, []);

    return (
        <div className="app">
          <h1>Reading List</h1>
          <BookList />
          <BookCreate />
        </div>
      );
}


export default App; 