import * as React from "react"

import { cn } from "@/lib/utils"

const inputClassName = (className?: string) =>
  cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary/50 focus-visible:shadow-[0_0_15px_rgba(107,42,255,0.3)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 md:text-sm backdrop-blur-sm",
    className
  );

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, onChange, ...props }, ref) => {
    // Un champ number contrôlé (value= un number) affiché tel quel casse dès qu'on efface pour
    // retaper : Number('') vaut 0, donc le champ réaffiche systématiquement "0" et un "0" reste
    // collé devant chaque nouveau chiffre tapé. On garde ici un buffer texte local, qui ne se
    // resynchronise sur la valeur du parent QUE si elle diverge vraiment (reset externe) — pas
    // à chaque frappe — pour laisser le champ vide/"12."/etc. le temps que l'utilisateur tape.
    const isControlledNumber = type === "number" && value !== undefined;
    const [rawValue, setRawValue] = React.useState<string>(isControlledNumber ? String(value) : "");

    React.useEffect(() => {
      if (!isControlledNumber) return;
      const externalStr = String(value);
      if (rawValue === externalStr) return;
      const rawAsNumber = rawValue === "" ? 0 : Number(rawValue);
      const externalAsNumber = externalStr === "" ? 0 : Number(externalStr);
      if (!Number.isNaN(rawAsNumber) && rawAsNumber === externalAsNumber) return;
      setRawValue(externalStr);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (isControlledNumber) {
      return (
        <input
          type="number"
          value={rawValue}
          onChange={(e) => {
            setRawValue(e.target.value);
            onChange?.(e);
          }}
          className={inputClassName(className)}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <input
        type={type}
        value={value as any}
        onChange={onChange}
        className={inputClassName(className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
