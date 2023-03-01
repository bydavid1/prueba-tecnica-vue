import HTTP from '../api'

class CountryService {
  all() {
    return HTTP.get('/all')
  }

  search(query) {
      return HTTP.get('/search/' + query)
  }
  
  view(code) {
      return HTTP.get(`/country/` + code)
  }
}

export default new CountryService()