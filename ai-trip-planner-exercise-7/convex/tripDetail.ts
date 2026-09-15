import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { MutationCtx, QueryCtx } from "./_generated/server";

async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  return await ctx.db
    .query("UserTable")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();
}

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    tripDetail: v.any(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: user._id,
    });
  },
});

export const GetUserTrips = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return [];
    }
    return await ctx.db
      .query("TripDetailTable")
      .withIndex("by_uid", (q) => q.eq("uid", user._id))
      .order("desc")
      .collect();
  },
});

export const GetTripById = query({
  args: {
    tripid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const trip = await ctx.db
      .query("TripDetailTable")
      .withIndex("by_trip_id", (q) => q.eq("tripId", args.tripid))
      .first();
    // Not found, or found but owned by a different user — same response
    // either way so existence of other users' trips can't be probed.
    if (!trip || trip.uid !== user._id) {
      return null;
    }
    return trip;
  },
});
