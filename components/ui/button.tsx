"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost';

type ButtonProps = {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-cyan text-ink shadow-[0_0_30px_rgba(0,209,255,0.35)] hover:shadow-[0_0_40px_rgba(0,209,255,0.45)] focus-visible:outline-cyan',
  ghost: 'bg-transparent text-current border border-current/20 hover:border-current/40',
};

const LOADER_DOT = (
  <span className="inline-flex space-x-1">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" style={{ animationDelay: '150ms' }} />
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" style={{ animationDelay: '300ms' }} />
  </span>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    className,
    isLoading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...rest
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {

  const isDisabled = Boolean(disabled || isLoading);
  const variantClass = VARIANT_STYLES[variant as ButtonVariant];

  return (
    <button
      ref={ref}
      data-variant={variant}
      aria-busy={isLoading}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-offset-2',
        variantClass,
        isDisabled && 'cursor-not-allowed opacity-70',
        className,
      )}
      {...rest}
    >
      {leftIcon}
      <span className="flex items-center gap-2">
        {children}
        {isLoading ? LOADER_DOT : rightIcon}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
