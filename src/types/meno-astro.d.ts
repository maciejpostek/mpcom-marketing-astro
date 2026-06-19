declare module "meno-astro" {
  export type MenoLink = string | {
    href: string;
    target?: string;
  };

  export type MenoPropDefinition = {
    type: string;
    default?: unknown;
    options?: readonly string[];
    label?: string;
    required?: boolean;
  };

  export function resolveProps<T extends Record<string, MenoPropDefinition>>(
    astro: unknown,
    definitions: T
  ): Record<keyof T, any>;

  export function style(...values: unknown[]): string;
  export function inlineStyle(...values: unknown[]): string;
  export function i18n<T>(value: T): T;
}

declare module "meno-astro/components" {
  const BaseLayout: any;
  const Embed: any;
  const Link: any;
  const LocaleList: any;
  const LocaleRoute: any;

  export { BaseLayout, Embed, Link, LocaleList, LocaleRoute };
}
