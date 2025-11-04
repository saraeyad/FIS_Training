import { Toaster as HotToaster } from "react-hot-toast";

/**
 * Custom Toaster component with app-specific configuration
 */
export const Toaster = () => {
  return (
    <HotToaster
      position="bottom-right"
      containerClassName="fixed right-0 bottom-[4.75rem] md:bottom-[6.625rem] xl:bottom-[4.0625rem] flex flex-col space-y-1"
      reverseOrder={true}
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(51, 51, 51, 0.6)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "0.5rem",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          width: "18rem",
          maxWidth: "18rem",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
