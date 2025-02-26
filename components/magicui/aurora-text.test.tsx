import { useTheme } from "next-themes";
import { screen, render } from "@testing-library/react";

import { AuroraText } from "@/components/magicui/aurora-text";

jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));

describe("AuroraText", () => {
    it("renders correctly with default props", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        render(<AuroraText>Test Content</AuroraText>);

        const element = screen.getByText("Test Content");
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe("SPAN");
    });

    it("renders as a different HTML element when `as` prop is provided", () => {
        render(<AuroraText as="h1">Heading Text</AuroraText>);

        const element = screen.getByText("Heading Text");
        expect(element.tagName).toBe("H1");
    });

    it("applies the correct class names and mix-blend mode in light theme", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        render(<AuroraText className="custom-class">Light Mode</AuroraText>);

        const element = screen.getByText("Light Mode");
        expect(element).toHaveClass("relative inline-flex overflow-hidden custom-class");
        expect(element.querySelector("span.pointer-events-none")).toHaveClass("mix-blend-lighten");
    });

    it("applies the correct mix-blend mode in dark theme", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

        render(<AuroraText>Dark Mode</AuroraText>);

        const element = screen.getByText("Dark Mode");
        expect(element.querySelector("span.pointer-events-none")).toHaveClass("mix-blend-darken");
    });

    it("matches snapshot", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

        const { container } = render(<AuroraText>Snapshot Test</AuroraText>);
        expect(container).toMatchSnapshot();
    });
});