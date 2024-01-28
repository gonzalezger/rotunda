const { parse } = require('./url-parser');

describe('Url Parser', () => {
  it('should return empty object if no format and url are passed', () => {
    expect(parse('', '')).toEqual({});
  });

  it('should parse url', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = '/6/api/listings/3';

    const expected = {
      version: 6,
      collection: 'listings',
      id: 3
    };

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  })

  it('should parse url with query string', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = '/6/api/listings/3?sort=desc&limit=10';

    const expected = {
      version: 6,
      collection: 'listings',
      id: 3,
      sort: 'desc',
      limit: 10
    };

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  })

  it('should parse url without params', () => {
    const urlFormat = '/api/listings';
    const urlInstance = '/api/listings';

    const expected = {};

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  })

  it('should parse url without params but query strings', () => {
    const urlFormat = '/api/listings';
    const urlInstance = '/api/listings?sort=desc&limit=10';

    const expected = {
      sort: 'desc',
      limit: 10
    };

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  });

  it('should parse url only with query strings', () => {
    const urlFormat = '';
    const urlInstance = '?sort=desc&limit=10';

    const expected = {
      sort: 'desc',
      limit: 10
    };

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  })

  it('should parse the url with query string and verify query string match any url path keys', () => {
    const urlFormat = '/api/listings/:id';
    const urlInstance = '/api/listings/3?sort=desc&limit=10&id=5';

    const expected = {
      id: 3,
      sort: 'desc',
      limit: 10,
      'q:id': 5
    };

    expect(parse(urlFormat, urlInstance, true)).toEqual(expected);
  });

  it('should parse url with trailing slash', () => {
    const urlFormat = '/:version/api/:collection/:id/';
    const urlInstance = '/6/api/listings/3/';

    const expected = {
      version: 6,
      collection: 'listings',
      id: 3
    };

    expect(parse(urlFormat, urlInstance)).toEqual(expected);
  })
});
