import { render } from "@testing-library/react";

import { Skeleton } from "@/components/ui/skeleton";

// Test suite for the Skeleton component
describe("Skeleton Component", () => {
    // Test to check if the component renders without any errors
    it("renders without crashing", () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toBeInTheDocument(); // Ensures the component is rendered in the DOM
    });

    // Test to check if the default classes are applied correctly
    it("has default classes", () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toHaveClass("animate-pulse rounded-md bg-primary/10"); // Checks for default styling classes
    });

    // Test to verify if custom class names are applied properly
    it("applies additional className prop", () => {
        const { container } = render(<Skeleton className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class"); // Ensures the custom class is added
    });

    // Test to ensure that additional props are passed correctly to the component
    it("passes other props correctly", () => {
        const { container } = render(<Skeleton data-testid="skeleton" />);
        expect(container.firstChild).toHaveAttribute("data-testid", "skeleton"); // Checks if the custom prop is applied
    });
});