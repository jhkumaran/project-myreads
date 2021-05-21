import React, { Component } from 'react'

export class Book extends Component {
    updateShelf = (e) => {
        const { book } = this.props;
        book.shelf = e.target.value;
        this.props.updateShelf(book);
    }
    render() {
        const { book } = this.props;
        return (
            <div className='book'>
                <div className='book-top'>
                    {book.imageLinks !== undefined && <div className='book-cover' 
                        style={{ 
                            width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks.thumbnail})` 
                        }}/>}
                    <div className='book-shelf-changer'>
                        <select onChange={(e) => this.updateShelf(e)} defaultValue='move'
                            value={book.shelf}>
                            <option value='move' disabled>Move to...</option>
                            <option value='currentlyReading'>
                                Currently Reading
                            </option>
                            <option value='wantToRead'>
                                Want to Read
                            </option>
                            <option value='read'>
                                Read
                            </option>
                            <option value='none'>
                                None
                            </option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>{book.title}</div>
                {book.authors !== undefined && <div className='book-authors'>
                    {
                        book.authors.map((author) => (
                            <div key={author}>{author}</div>
                        ))
                    }
                </div>}
            </div>
        )
    }
}

export default Book