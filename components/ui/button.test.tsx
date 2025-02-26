import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";


describe("Button Component", () => {
    test("renders correctly with default props", () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary text-primary-foreground");
    });

    test("applies additional className", () => {
        render(<Button className="custom-class">Click Me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toHaveClass("custom-class");
    });

    test("triggers onClick event", async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        await userEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("renders disabled button", () => {
        render(<Button disabled>Click Me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeDisabled();
    });
});
