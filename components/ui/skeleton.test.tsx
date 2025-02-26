import { render } from "@testing-library/react";

import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton Component", () => {
    it("renders without crashing", () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("has default classes", () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toHaveClass("animate-pulse rounded-md bg-primary/10");
    });

    it("applies additional className prop", () => {
        const { container } = render(<Skeleton className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("passes other props correctly", () => {
        const { container } = render(<Skeleton data-testid="skeleton" />);
        expect(container.firstChild).toHaveAttribute("data-testid", "skeleton");
    });
});
