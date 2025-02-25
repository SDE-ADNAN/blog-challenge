type MockedRouter = {
  push: jest.Mock;
  replace: jest.Mock;
  prefetch: jest.Mock;
  back: jest.Mock;
  forward: jest.Mock;
  refresh: jest.Mock;
};

const mockedRouter: MockedRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

export const mockedUseRouter = () => mockedRouter;
