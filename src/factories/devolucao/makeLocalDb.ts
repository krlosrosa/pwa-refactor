import { DemandLocalDatabase } from "@/_shared/db/database-local";

export function makeLocalDb() {
  return new DemandLocalDatabase();
}