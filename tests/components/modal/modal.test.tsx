import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "@waldiez/components/modal";

describe("Modal", () => {
    it("should render successfully", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: <div>test</div>,
        };
        const { baseElement } = render(<Modal {...modalProps} />);
        expect(baseElement).toBeTruthy();
    });

    it("should render with before title", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            beforeTitle: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        const { baseElement } = render(<Modal {...modalProps} />);
        expect(baseElement).toBeTruthy();
    });

    it("should render with close button", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        const { baseElement } = render(<Modal {...modalProps} />);
        expect(baseElement).toBeTruthy();
    });

    it("should render with maximize button", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        const { baseElement } = render(<Modal {...modalProps} />);
        expect(baseElement).toBeTruthy();
    });

    it("should render with class name", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
            className: "test",
        };
        const { baseElement } = render(<Modal {...modalProps} />);
        expect(baseElement).toBeTruthy();
    });

    it("should close modal", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        render(<Modal {...modalProps} />);
        const closeButton = screen.getByTitle("Close");
        expect(closeButton).toBeTruthy();
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });

    it("should handle escape key", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        render(<Modal {...modalProps} />);
        fireEvent.keyDown(screen.getByTestId("modal-dialog"), {
            key: "Escape",
        });
        expect(onClose).toHaveBeenCalled();
    });

    it("should toggle full screen", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
        };
        render(<Modal {...modalProps} />);
        const maximizeButton = screen.getByTitle("Maximize");
        expect(maximizeButton).toBeTruthy();
        fireEvent.click(maximizeButton);
        const minimizeButton = screen.getByTitle("Minimize");
        expect(minimizeButton).toBeTruthy();
        fireEvent.click(minimizeButton);
        expect(maximizeButton).toBeTruthy();
    });

    it("should prevent close if unsaved changes", () => {
        const onClose = vi.fn();
        const modalProps = {
            title: "test",
            isOpen: true,
            onClose,
            children: "test",
            preventCloseIfUnsavedChanges: true,
            hasUnsavedChanges: true,
        };
        render(<Modal {...modalProps} />);
        const closeButton = screen.getByTitle("Close");
        expect(closeButton).toBeTruthy();
        fireEvent.click(closeButton);
        const dontCloseButton = screen.getByText("Don't Close");
        expect(dontCloseButton).toBeTruthy();
        fireEvent.click(dontCloseButton);
        expect(onClose).not.toHaveBeenCalled();
    });
});
