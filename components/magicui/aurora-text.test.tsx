import { useTheme } from "next-themes";
import { screen, render } from "@testing-library/react";

import { AuroraText } from "@/components/magicui/aurora-text";

// Mocking the `next-themes` module to control the theme in tests
jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));

describe("AuroraText", () => {
    it("renders correctly with default props", () => {
        // Mocking the theme as "light"
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        // Rendering the component with default props
        render(<AuroraText>Test Content</AuroraText>);

        // Checking if the content is in the document
        const element = screen.getByText("Test Content");
        expect(element).toBeInTheDocument();

        // Ensuring it renders as a `span` by default
        expect(element.tagName).toBe("SPAN");
    });

    it("renders as a different HTML element when `as` prop is provided", () => {
        // Rendering the component with `as` prop set to `h1`
        render(<AuroraText as="h1">Heading Text</AuroraText>);

        // Ensuring it renders as an `h1` element
        const element = screen.getByText("Heading Text");
        expect(element.tagName).toBe("H1");
    });

    it("applies the correct class names and mix-blend mode in light theme", () => {
        // Mocking the theme as "light"
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        // Rendering with an additional custom class
        render(<AuroraText className="custom-class">Light Mode</AuroraText>);

        // Ensuring the component has the correct base and custom classes
        const element = screen.getByText("Light Mode");
        expect(element).toHaveClass("relative inline-flex overflow-hidden custom-class");

        // Checking the `mix-blend-lighten` class is applied in light mode
        expect(element.querySelector("span.pointer-events-none"))
            .toHaveClass("mix-blend-lighten");
    });

    it("applies the correct mix-blend mode in dark theme", () => {
        // Mocking the theme as "dark"
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

        // Rendering the component in dark mode
        render(<AuroraText>Dark Mode</AuroraText>);

        // Ensuring the `mix-blend-darken` class is applied in dark mode
        const element = screen.getByText("Dark Mode");
        expect(element.querySelector("span.pointer-events-none"))
            .toHaveClass("mix-blend-darken");
    });

    it("matches snapshot", () => {
        // Mocking the theme as "light" for snapshot testing
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        // Rendering the component and taking a snapshot
        const { container } = render(<AuroraText>Snapshot Test</AuroraText>);
        expect(container).toMatchSnapshot();
    });
});
