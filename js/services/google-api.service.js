import { utilService} from './util-service.js'


export const booksAPI = {
    getNewBooks,
}




function getNewBooks(searchedBook) {
    searchedBook = searchedBook.split(' ').join('+');
    console.log(searchedBook);
    if (utilService.loadFromStorage(searchedBook)) {
        console.log('from storage');
        return Promise.resolve(utilService.loadFromStorage(searchedBook));
    }
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchedBook}`)
    .then((response) => {
      console.log('from server');
      console.log(response);
      utilService.saveToStorage(searchedBook, response.data);
      return response.data;
    });
}
