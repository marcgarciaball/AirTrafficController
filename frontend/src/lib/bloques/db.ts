import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Cliente sin tipos para las tablas y RPC de bloques mientras `database.types.ts`
 * no las incluya. Cuando estén, se puede sustituir por el cliente tipado.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LooseClient = SupabaseClient<any, "public", any>

export const loose = (c: unknown) => c as LooseClient
