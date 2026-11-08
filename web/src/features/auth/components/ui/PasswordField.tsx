import { Eye, EyeOff } from 'lucide-react';
import { type ComponentProps, useState } from 'react';
import { TextField } from './TextField';

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'type' | 'trailing'>;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="grid size-8 place-items-center rounded-lg text-subtle outline-none hover:bg-sunken hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-edge"
        >
          <Icon className="size-4" />
        </button>
      }
    />
  );
}
