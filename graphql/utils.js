module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results
  }) => {
    if (pageSize < 1) return [];
  
    if (!cursor) return results.slice(0, pageSize);
    const cursorIndex = results.findIndex(item => {
      let itemCursor = item.cursor;
  
      // if there's still not a cursor, return false by default
      return itemCursor ? cursor === itemCursor : false;
    });

    // cursor not found, return first page
    if (cursorIndex === -1) return results.slice(0, pageSize);

    // don't let us overflow
    if (cursorIndex === results.length - 1) return [];
    return results.slice(
        cursorIndex + 1,
        Math.min(results.length, cursorIndex + 1 + pageSize),
    );
  };