const modules = import.meta.glob("./components/**/*.astro", { eager: true }) as Record<
  string,
  { default: unknown }
>;

export const cmsComponents: Record<string, unknown> = {};
for (const [path, mod] of Object.entries(modules)) {
  Object.defineProperty(cmsComponents, path.replace(/^.*\//, "").replace(/\.astro$/, ""), {
    get: () => mod.default,
    enumerable: true
  });
}
