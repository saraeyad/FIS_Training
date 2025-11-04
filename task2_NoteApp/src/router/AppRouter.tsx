import { Mainlayout } from "../layout/Mainlayout";
import { NoteDetails } from "../pages/Notes/NoteDeatailsPage";
import { SearchPage } from "../pages/Mobile/SearchPage";
import { NotesProvider } from "../contexts/NotesContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { NoteEditorProvider } from "../contexts/NoteEditorContext";
import { ROUTES } from "./routes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { ListOfTages } from "../components/tags/ListOfTages";
import { NotesRouteWrapper } from "../pages/Notes/NotesRouteWrapper";

const appRoutes = [
  // Note routes with auto-navigation
  {
    path: ROUTES.AllNOTE,
    element: <NotesRouteWrapper baseRoute={ROUTES.AllNOTE} showArchived={false} />,
    children: [{ path: "note/:id", element: <NoteDetails /> }]
  },
  {
    path: ROUTES.ARCHICED,
    element: <NotesRouteWrapper baseRoute={ROUTES.ARCHICED} showArchived={true} />,
    children: [{ path: "note/:id", element: <NoteDetails /> }]
  },
  {
    path: ROUTES.TAGGED_NOTE,
    element: <NotesRouteWrapper baseRoute={ROUTES.TAGGED_NOTE} showArchived={false} />,
    children: [{ path: "note/:id", element: <NoteDetails /> }]
  },
  
  // Other routes
  { path: ROUTES.NEW_NOTE, element: <NoteDetails /> },
  { path: ROUTES.TAGS, element: <ListOfTages /> },
  { path: ROUTES.SEARCH, element: <SearchPage /> },
  { path: ROUTES.SETTINGS, element: <></> },
];

export const AppRouter = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Redirect root to All-NOTE */}
          <Route path="" element={<Navigate to={ROUTES.AllNOTE} replace />} />
          <Route
            path="/"
            element={
              <NotesProvider>
                <NoteEditorProvider>
                  <Mainlayout />
                </NoteEditorProvider>
              </NotesProvider>
            }
          >
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
