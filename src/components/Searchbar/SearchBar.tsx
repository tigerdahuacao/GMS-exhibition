export default function SearchBar() {
  return (
    <div >
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
      <form method="post">
        <button type="submit">New</button>
      </form>
    </div>
  );
}
