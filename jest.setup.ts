import "@testing-library/jest-dom";
import { mockedUseRouter } from "./__mocks__/navigation.mock";

// mock useRouter globally
jest.mock("next/navigation", () => ({
  useRouter: mockedUseRouter,
}));
