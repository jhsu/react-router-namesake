import generateRoutes from './generateRoutes';

describe('generateRoutes', () => {
  it('should create a route with name', () => {
    const routes = generateRoutes({
      home: '/home',
    });
    expect(routes.home).toEqual('/home');
  });

  it('should pass through dynamic paths', () => {
    const routes = generateRoutes({
      'user': '/user/:userId',
    });
    expect(routes.user).toEqual('/user/:userId');
  });

  describe('nested routes', () => {
    it('should not set the root path', () => {
      const routes = generateRoutes({
        user: {
          children: {
            book: { path: '/book' },
            page: '/page',
          },
          path: '/user/:userId',
        },
      });
      expect(routes.book).toBeUndefined();
      expect(routes.page).toBeUndefined();
    });

    it('should a single level nested route', () => {
      const routes = generateRoutes({
        user: {
          children: {
            book: '/books/:bookId',
            books: { path: '/books' },
            nest: {
              children: {
                'bird': '/bird',
              },
              path: '/nest',
            },
          },
          path: '/user/:userId',
        },
      });
      expect(routes.user).toEqual('/user/:userId');
    });

    it('should have a nested child with a string path', () => {
      const routes = generateRoutes({
        user: {
          children: {
            book: '/books/:bookId',
            books: { path: '/books' },
            nest: {
              children: {
                'bird': '/bird',
              },
              path: '/nest',
            },
          },
          path: '/user/:userId',
        },
      });
      expect(routes['user.books']).toEqual('/user/:userId/books');
    });

    it('should have a deeply nested child route', () => {
      const routes = generateRoutes({
        user: {
          children: {
            book: '/books/:bookId',
            books: { path: '/books' },
            nest: {
              children: {
                'bird': '/bird',
              },
              path: '/nest',
            },
          },
          path: '/user/:userId',
        },
      });
      expect(routes['user.book']).toEqual('/user/:userId/books/:bookId');
    });

    it('should have a deeply nested child route with children', () => {
      const routes = generateRoutes({
        user: {
          children: {
            book: '/books/:bookId',
            books: { path: '/books' },
            nest: {
              children: {
                'bird': '/bird',
              },
              path: '/nest',
            },
          },
          path: '/user/:userId',
        },
      });
      expect(routes['user.nest.bird']).toEqual('/user/:userId/nest/bird');
    });

  });
});
