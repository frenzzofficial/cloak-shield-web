import { cn } from "@/packages/utils/cn";
import {
  PASSWORD_RULES,
  passwordStrength,
  type StrengthLevel,
} from "@/packages/utils/password-rules";

const SEGMENT_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

const LEVEL_COLOR: Record<StrengthLevel, string> = {
  0: "bg-white/10",
  1: "bg-destructive",
  2: "bg-chart-4",
  3: "bg-primary",
  4: "bg-chart-2",
};

const LEVEL_TEXT: Record<StrengthLevel, string> = {
  0: "text-muted-foreground",
  1: "text-destructive",
  2: "text-chart-4",
  3: "text-primary",
  4: "text-chart-2",
};

interface PasswordStrengthProps {
  value: string;
  id?: string;
}

/** The meter and the requirement checklist under a "new password" field. */
const PasswordStrength = ({ value, id }: PasswordStrengthProps) => {
  const strength = passwordStrength(value);

  return (
    <div id={id} className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {SEGMENT_KEYS.map((key, index) => (
            <span
              key={key}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                index < strength.segments
                  ? LEVEL_COLOR[strength.level]
                  : "bg-white/10",
              )}
            />
          ))}
        </div>
        <span
          className={cn(
            "w-12 text-right text-xs font-medium",
            LEVEL_TEXT[strength.level],
          )}
        >
          {strength.label}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[13px] sm:grid-cols-2">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(value);
          return (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 transition-colors",
                ok ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                  ok
                    ? "border-chart-2 bg-chart-2 text-[#02121f]"
                    : "border-white/25",
                )}
              >
                {ok && (
                  <span className="text-[10px] leading-none font-bold">✓</span>
                )}
              </span>
              <span>
                {rule.label}
                <span className="sr-only">
                  {ok ? " (met)" : " (not met yet)"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrength;
