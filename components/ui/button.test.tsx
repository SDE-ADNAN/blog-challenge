import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/components/ui/button";

describe("Button Component", () => {
    // Test to check if the button renders correctly with default props
    test("renders correctly with default props", () => {
        render(<Button>Click Me</Button>);

        // Find button element by its role and accessible name
        const button = screen.getByRole("button", { name: /click me/i });

        // Verify that the button is present in the document
        expect(button).toBeInTheDocument();

        // Ensure it has the default styling classes
        expect(button).toHaveClass("bg-primary text-primary-foreground");
    });

    // Test to check if additional class names are applied correctly
    test("applies additional className", () => {
        render(<Button className="custom-class">Click Me</Button>);

        // Find the button
        const button = screen.getByRole("button", { name: /click me/i });

        // Ensure the custom class is applied along with default styles
        expect(button).toHaveClass("custom-class");
    });

    // Test to check if the onClick event is triggered when button is clicked
    test("triggers onClick event", async () => {
        const handleClick = jest.fn(); // Mock function to track clicks
        render(<Button onClick={handleClick}>Click Me</Button>);

        // Get button element
        const button = screen.getByRole("button", { name: /click me/i });

        // Simulate a user click event
        await userEvent.click(button);

        // Verify if the click event handler was called once
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // Test to check if the button renders as disabled when the 'disabled' prop is passed
    test("renders disabled button", () => {
        render(<Button disabled>Click Me</Button>);

        // Get button element
        const button = screen.getByRole("button", { name: /click me/i });

        // Ensure the button is disabled
        expect(button).toBeDisabled();
    });
});