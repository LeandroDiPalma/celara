export default {
    data() {
      return {
        sortKey: "setup",
        sortAsc: true,
      };
    },
    methods: {
      sortItems(key) {
        if (this.sortKey === key) {
          this.sortAsc = !this.sortAsc;
        } else {
          this.sortKey = key;
          this.sortAsc = true;
        }
      },
    },
    computed: {
      sortedItems() {
        const sorted = [...this.items];
        sorted.sort((a, b) => {
          const result = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
          return this.sortAsc ? result : -result;
        });
        return sorted;
      },
    },
  };