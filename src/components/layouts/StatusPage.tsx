import { Button, Link } from "@/components/ui";

interface StatusPageProps {
  code: string;
  title: string;
  message: string;
  /** A link, or a button that runs `onClick` (e.g. retry). */
  action: { label: string; href?: string; onClick?: () => void };
}

/** One look for 404 and error screens. */
const StatusPage = ({ code, title, message, action }: StatusPageProps) => (
  <main className="form-page">
    <div className="form-page__container">
      <div className="form-card sm:min-w-120 max-w-200">
        <div className="form-card__content items-center text-center">
          <p className="text-sm font-medium tracking-widest text-primary">
            {code}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
          {action.href ? (
            <Link href={action.href} variant="primary">
              {action.label}
            </Link>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  </main>
);

export default StatusPage;
