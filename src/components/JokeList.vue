<template>
  <div>
    <h1>Joke List</h1>

    <div v-if="isLoading">Loading jokes...</div>

    <p v-if="!isLoading && jokes.length === 0 && !error">No jokes available at the moment.</p>

    <table v-if="!isLoading && jokes.length">
      <thead>
        <tr>
          <th
            @click="sortItems('setup')"
            @keydown.enter="sortItems('setup')"
            :class="{ 'sorted-asc': sortKey === 'setup' && sortAsc, 'sorted-desc': sortKey === 'setup' && !sortAsc }"
            tabindex="0"
            aria-label="Sort by setup"
            scope="col"
          >
            Setup
          </th>
          <th
            @click="sortItems('punchline')"
            @keydown.enter="sortItems('punchline')"
            :class="{ 'sorted-asc': sortKey === 'punchline' && sortAsc, 'sorted-desc': sortKey === 'punchline' && !sortAsc }"
            tabindex="0"
            aria-label="Sort by punchline"
            scope="col"
          >
            Punchline
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="joke in paginatedJokes" :key="joke.id">
          <td>{{ joke.setup }}</td>
          <td>{{ joke.punchline }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="error">{{ error }}</div>

    <label v-if="!isLoading && jokes.length" for="jokesPerPage">Jokes per page:</label>
    <select v-if="!isLoading && jokes.length" v-model="jokesPerPage" id="jokesPerPage">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        aria-label="Previous page"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { fetchJokes } from "../services/jokeService";
import debounce from "lodash/debounce";
import paginationMixin from "../mixins/paginationMixin";
import sortingMixin from "../mixins/sortingMixin";

export default {
  data() {
    return {
      jokes: [],
      currentPage: 1,
      jokesPerPage: 10,
      error: null,
      isLoading: false,
    };
  },
  mixins: [paginationMixin, sortingMixin],
  
  computed: {
    totalPages() {
      return Math.ceil(this.jokes.length / this.jokesPerPage);
    },
    paginatedJokes() {
      const start = (this.currentPage - 1) * this.jokesPerPage;
      const end = start + this.jokesPerPage;
      return this.sortedItems.slice(start, end);
    },
    items() {
      return this.jokes;
    },
  },
  methods: {
    async fetchJokes() {
      try {
        this.isLoading = true;
        this.error = null;
        this.jokes = await fetchJokes();
      } catch (error) {
        this.error = "Unable to load jokes. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.fetchJokes();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  cursor: pointer;
}
th.sorted-asc::after {
  content: "▲";
  margin-left: 5px;
}
th.sorted-desc::after {
  content: "▼";
  margin-left: 5px;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
.pagination {
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  margin: 0 5px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
