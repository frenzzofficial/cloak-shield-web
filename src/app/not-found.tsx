import StatusPage from "@/components/layouts/StatusPage";

const NotFound = () => (
  <StatusPage
    code="404"
    title="Page not found"
    message="The page you are looking for does not exist or has moved."
    action={{ label: "Back to home", href: "/" }}
  />
);

export default NotFound;
