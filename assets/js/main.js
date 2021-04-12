var app = new Vue({
  el: '#root',
  data: {
    search: '',
    filmSearched: ''
  },

  mounted() {
    // TODO:
  },
  methods: {
    ricerca: function () {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=a921d6aadd798d788a4bb0455b772f57&query=' + this.search + '&language=IT')
        .then((response) => {
          this.filmSearched = response.data.results;
          console.log(this.filmSearched);
        })
    }
  }
})
