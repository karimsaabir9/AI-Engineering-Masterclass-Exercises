import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
    // Clerk's `sub` claim (ctx.auth.getUserIdentity().subject) — the
    // server-verified identity a row belongs to. Optional only so rows
    // created before the Clerk<->Convex auth integration keep validating;
    // CreateNewUser backfills it by matching on email the first time an
    // existing user signs in post-migration.
    clerkId: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  TripDetailTable: defineTable({
    tripId: v.string(),
    tripDetail: v.any(),
    uid: v.id("UserTable"),
  })
    .index("by_uid", ["uid"])
    .index("by_trip_id", ["tripId"]),
});
