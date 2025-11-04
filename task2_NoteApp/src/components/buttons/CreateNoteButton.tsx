
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const CreateNote = () => {
    const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(ROUTES.NEW_NOTE)}
      aria-label="Creat New Note"
            className="inline-flex items-center justify-center gap-1 p-5 py-1.5 rounded-lg w-full h-12 font-semibold text-(--color-primary-foreground) bg-linear-to-r from-(--color-primary) to-[#60a5fa] shadow-sm"
          >
            <span className="text-sm">+</span>
            Creat New Note
          </button>
        );
      }