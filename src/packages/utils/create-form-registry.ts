import type { z } from "zod";
import type { FormListType } from "../../types/form";

/**
 * Pairs a family of form configs with their Zod schemas and makes the compiler check that
 * they stay in step: a config without a schema (or a schema without a config) does not build.
 *
 *   export const profileSchemaMap = { UPDATE_PROFILE: updateProfileSchema, ... } as const;
 *   export const profileFormConfig = { UPDATE_PROFILE: { ... }, ... };
 *   export const profileForms = createFormRegistry(profileFormConfig, profileSchemaMap);
 *
 * Adding a form is then: one schema, one config entry, one key in each map.
 */
export const createFormRegistry = <S extends Record<string, z.ZodType>>(
  configs: { [K in keyof S]: FormListType },
  schemas: S,
) => ({ configs, schemas });

export type FormRegistry<S extends Record<string, z.ZodType>> = ReturnType<
  typeof createFormRegistry<S>
>;

/** The values a form of this registry submits, e.g. FormValues<typeof profileSchemaMap, "CHANGE_EMAIL">. */
export type FormValues<
  S extends Record<string, z.ZodType>,
  K extends keyof S,
> = z.infer<S[K]>;
