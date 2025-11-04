import toast from "react-hot-toast";

/**
 * Custom hook for showing toast notifications
 */
export const useNotifications = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
    //  icon: "✓",
    });
  };

  return {
    showSuccess,
  };
};

