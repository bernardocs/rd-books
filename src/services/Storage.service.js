const APP_STORAGE_KEY = 'rd-books-favs'

class StorageService {
  fetch () {
    return JSON.parse(localStorage.getItem(APP_STORAGE_KEY) || '[]')
  }

  save (info) {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(info))
  }
}

export default new StorageService()
