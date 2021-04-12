var app = new Vue({
  el: '#root',
  data: {
    search: '',
    filmSearched: '',
    flag: 'https://www.countryflags.io/',
  },

  mounted() {

  },
  methods: {
    ricerca: function () {
      if (this.search != '') {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=a921d6aadd798d788a4bb0455b772f57&query=' + this.search + '&language=IT')
        .then((response) => {
          this.filmSearched = response.data.results;

          // Cambio per adattare la bandiera al sito
          this.filmSearched.forEach((item, i) => {
            if (item.original_language == 'en') {
              item.original_language = 'gb';
            }
          });

        })
        // Svuoto input
        this.search = ''
      }
    },
  }
})
