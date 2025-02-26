import "@testing-library/jest-dom";
import { mockedUseRouter } from "./__mocks__/navigation.mock";
import "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// jest.setup.js
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// mock useRouter globally
jest.mock("next/navigation", () => ({
  useRouter: mockedUseRouter,
}));
