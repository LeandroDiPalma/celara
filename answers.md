What is a closure? Where in the code is there a closure?

A closure is a function that remembers the context in which it was created, meaning it retains the variables that were within its scope at that time. In this code, an example of a closure is the sortItems() function within sortingMixin. This function accesses sortKey and sortAsc, properties defined in the mixin’s data, to toggle the sorting order of elements based on these values. Thanks to closures, the sortItems() function can "remember" and use these values even when it’s called from another component.

What are the possible side effects in any function? Could you point out any such cases in your code? Are they expected? Can they be avoided?

Side effects occur when a function changes something outside of its direct scope, like the global state, the DOM, or when making an HTTP request. In fetchJokes(), the expected side effect is updating jokes in the data state because it makes an HTTP request. This effect is necessary to retrieve data from the API and should not be avoided. However, we included error handling to prevent unexpected behavior in the application in case the request fails.

