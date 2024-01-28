/**
 * 
 * @param {unknown} value - The value to be converted.
 * @returns {number|string} - The converted value or the original.
 */
function tryToNumber(value) {
  const number = Number(value);
  return isNaN(number) ? value : number;
}

/**
 * 
 * @param {string} urlFormat - The format of the URL.
 * @param {string} urlInstance - The specific instance of the URL.
 * @returns {Object} - An object with the mapped path parameters of the URL.
 */
function getUrlPartsHash(urlFormat, urlInstance) {
  const urlFormatParts = urlFormat.split('/');
  const urlInstanceParts = urlInstance.split('/');

  return urlFormatParts.reduce((acc, part, index) => {
    if (part.startsWith(':')) {
      const key = part.slice(1);
      acc[key] = tryToNumber(urlInstanceParts[index]);
    }
    return acc;
  }, {});
}

/**
 * 
 * @param {string} queryString - The query string of the URL.
 * @returns {Object} - An object with the mapped query string parameters.
 */
function getQueryStringHash(queryString) {
  return queryString ? Object.fromEntries(
    [...new URLSearchParams(queryString)].map(([key, value]) => [key, tryToNumber(value)])
  ) : {};
}

/**
 * 
 * @param {string} urlFormat - The format of the URL.
 * @param {string} urlInstance - The specific instance of the URL.
 * @param {boolean} prefixQueryStringDuplicates - If true, query string keys that are also in the url path will be prefixed with 'q:'.
 * @returns {Object} - An object with all the mapped parameters of the URL.
 */
function parse(urlFormat, urlInstance, prefixQueryStringDuplicates = true) {
  const [urlParts, queryString] = urlInstance.split('?');

  const urlPartsHash = getUrlPartsHash(urlFormat, urlParts);
  const queryStringHash = getQueryStringHash(queryString);

  if (prefixQueryStringDuplicates) {
    Object.keys(queryStringHash).forEach(key => {
      if (urlPartsHash[key]) {
        queryStringHash[`q:${key}`] = queryStringHash[key];
        delete queryStringHash[key];
      }
    });
  }

  return { ...urlPartsHash, ...queryStringHash };
}

module.exports = {
  parse
};