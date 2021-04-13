var app = new Vue({
  el: '#root',
  data: {
    search: '',
    filmSearched: [],
    serieSearched: [],
    flag: 'https://www.countryflags.io/',
  },

  mounted() {

  },
  methods: {
    ricerca: function () {
      const movieReq = axios.get('https://api.themoviedb.org/3/search/movie?api_key=a921d6aadd798d788a4bb0455b772f57&query=' + this.search + '&language=IT');
      const serieReq = axios.get('https://api.themoviedb.org/3/search/tv?api_key=a921d6aadd798d788a4bb0455b772f57&language=it_IT&query=' + this.search);
      axios.all([
        movieReq,
        serieReq
      ])
      .then(axios.spread((film, serie) => {


        this.filmSearched =  film.data.results;
        this.serieSearched = serie.data.results;

        // Cambio per adattare la bandiera al sito per film
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


      }))
      // Svuoto input
      this.search = ''
    },
  }
})
