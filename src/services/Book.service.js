import axios from 'axios'

const API_KEY = 'AIzaSyAldQuUz-EqT0xCqvyG3Gir9sv9L_eg9xE'
const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes'

class BookService {
  formatQuery (query) {
    return query.split(' ').map(s => encodeURIComponent(s)).join('+')
  }

  parseParamsObjToURL (params) {
    let result = ''
    for (let prop in params) {
      if (params.hasOwnProperty(prop)) {
        result += `${prop}=${params[prop]}&`
      }
    }
    return result
  }

  searchBooks (query, startIndex = 0) {
    const params = {
      q: this.formatQuery(query),
      printType: 'books',
      apiKey: API_KEY,
      maxResults: 15,
      startIndex
    }
    return axios.get(`${BOOKS_API_URL}?${this.parseParamsObjToURL(params)}`)
  }

  getBook (bookId) {
    return axios.get(`${BOOKS_API_URL}/${bookId}?apiKey=${API_KEY}`)
  }
}

export default new BookService()
