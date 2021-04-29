import { booksDB } from './books.js'
import { storageService } from './async-storage-service.js'

const BOOKS_KEY = 'books';



export const bookService = {
    query,
    getBookById,
    addReview,
    removeReview,
    addGoogleBook,
    getNextBookId,
    getPrevBookId
}

function query() {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (!books.length) return storageService.postMany(BOOKS_KEY, booksDB);
            else return books;
        });
}

function getBookById(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function addReview(bookId, review) {
    return getBookById(bookId)
        .then(book => {
            if (!book['reviews']) book.reviews = [];
            review.id = _makeId();
            book.reviews.push(review);
            return storageService.put(BOOKS_KEY, book);
        })
}

function removeReview(bookId, reviewId) {
    return getBookById(bookId)
    .then (book => {
        const idx = book.reviews.findIndex(review => review.id = reviewId);
        book.reviews.splice(idx, 1);
        return storageService.put(BOOKS_KEY, book);
    })
}


function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function addGoogleBook(googleBook) {
    console.log('googleBook:', googleBook)
    const newBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.subtitle,
        authors: googleBook.volumeInfo.authors,
        publishedDate: googleBook.volumeInfo.publishedDate,
        description: googleBook.volumeInfo.description,
        pageCount: googleBook.volumeInfo.pageCount,
        categories: googleBook.volumeInfo.categories,
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail,
        language: googleBook.volumeInfo.language,
        listPrice: {
            amount: null,
            currencyCode: null,
            isOnSale: false
        }
    }
    return storageService.post(BOOKS_KEY, newBook);
}


function getNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
    .then(books => {
        let bookIdx = books.findIndex(book => book.id === bookId);
        if (bookIdx === books.length -1) bookIdx = -1;
        const nextBookId = books[bookIdx + 1].id;
        return nextBookId;
    });
}

function getPrevBookId(bookId) {
    return storageService.query(BOOKS_KEY)
    .then(books => {
        let bookIdx = books.findIndex(book => book.id === bookId);
        if (bookIdx === 0) bookIdx = books.length;
        const prevBookId = books[bookIdx - 1].id;
        return prevBookId;
    });
}