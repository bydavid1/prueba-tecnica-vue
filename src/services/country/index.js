import HTTP from '../api'

class CountryService {
  all() {
    return HTTP.get('/all')
  }

  search(query) {
      return HTTP.get(`/name/${query}`)
  }
  
  view(code) {
      return HTTP.get(`/alpha/${code}`)
  }
}

export default new CountryService()