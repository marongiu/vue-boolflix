var app = new Vue({
  el: '#root',
  data: {
    search: '',
    filmSearched: [],
    serieSearched: [],
    popolari: [],
    inizio: '',
    flag: 'https://www.countryflags.io/',
    background: 'http://image.tmdb.org/t/p/w342/',
    errore: './assets/img/errore.png'
  },

  mounted: function () {
    // Benvenuto con i film piu popolari
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a921d6aadd798d788a4bb0455b772f57&language=it-IT')
    .then((response) => {
      this.popolari = response.data.results;

      this.popolari.forEach((item, i) => {
        if (item.original_language == 'en') {
          item.original_language = 'gb';
        }
      });
    })
  },
methods: {
  ricerca: function () {
    if (this.search.length) {
      const movieReq = axios.get('https://api.themoviedb.org/3/search/movie?api_key=a921d6aadd798d788a4bb0455b772f57&query=' + this.search + '&language=it-IT');
      const serieReq = axios.get('https://api.themoviedb.org/3/search/tv?api_key=a921d6aadd798d788a4bb0455b772f57&language=it_IT&query=' + this.search);
      axios.all([
        movieReq,
        serieReq
      ])
      .then(axios.spread((film, serie) => {
        this.filmSearched = film.data.results;
        this.serieSearched = serie.data.results;
        // Cambio per adattare la bandiera al sito per film
        this.flagFix();
        // Richiamo la funzione per modificare la valutazione
        this.vote();
      }))
      // Svuoto input
      this.search = ''
    }
  },
  // Arrotondo il voto e lo trasformo da 1 a 5
  vote: function () {
    this.filmSearched.forEach((item, i) => {
      item.vote_average = Math.ceil(item.vote_average * 5 / 10);
    });

    this.serieSearched.forEach((item, i) => {
      item.vote_average = Math.ceil(item.vote_average * 5 / 10);
    });

  },
  // Sistemo il codice flag per adattarlo al sito
  flagFix: function () {
    this.filmSearched.forEach((item, i) => {
      if (item.original_language == 'en') {
        item.original_language = 'gb';
      }
    });
    // Cambio per adattare la bandiera al sito per film
    this.serieSearched.forEach((item, i) => {
      if (item.original_language == 'en') {
        item.original_language = 'gb';
      }
    });
  },
  // Svuoto campo al click su Netflix
  home: function () {
    this.serieSearched = ''
    this.filmSearched = ''
  },
}
})
