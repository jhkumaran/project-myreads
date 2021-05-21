import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookList from './BookList'

export class SearchBook extends Component {
    state = {
        query: '',
        searchResults:[]
    }

    updateQuery = (e) => {
        this.setState({ query: e.target.value}, () => {
            this.searchBooks();
        })
    }

    searchBooks = () => {
        if(this.state.query === '' || this.state.query === undefined) {
            this.setState({searchResults :[]});
            return;
        }
        BooksAPI.search(this.state.query)
        .then((books) => {
            if(this.props.books !== undefined && this.props.books.length > 0){
                this.props.books.map((book) => {
                    let searchResult = books.find(t=> t.id === book.id);
                    if(searchResult){
                        searchResult.shelf = book.shelf;
                    }
                })
            }
            this.setState({searchResults: books});
        })
        .catch((ex) => {
            console.log(ex);
        })
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                <Link className='close-search' to='/'/>
                <div className='search-books-input-wrapper'>
                    <input type='text' placeholder='Search by title or author'
                        value={this.state.query} onChange={(e) => this.updateQuery(e)}/>
                </div>
                </div>
                <div className='search-books-results'>
                    <BookList books={this.state.searchResults} updateShelf={this.props.updateShelf}/>
                </div>
            </div>
        )
    }
}

export default SearchBook
