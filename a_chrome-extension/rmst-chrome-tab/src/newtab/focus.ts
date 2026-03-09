if (location.search !== '?x') {
  location.search = '?x'
  throw new Error() // load everything on the next page;
  // stop execution on this page
}
