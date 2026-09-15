import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        // Already provisioned for this Clerk identity?
        const existing = await ctx.db
            .query("UserTable")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .first();
        if (existing) {
            return existing;
        }

        // Reconcile a row created before Clerk<->Convex auth was wired up
        // (matched by email, never had a clerkId) by attaching it to this
        // verified identity instead of creating a duplicate user.
        const legacyMatch = await ctx.db
            .query("UserTable")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        if (legacyMatch && !legacyMatch.clerkId) {
            await ctx.db.patch(legacyMatch._id, { clerkId: identity.subject });
            return await ctx.db.get(legacyMatch._id);
        }

        const id = await ctx.db.insert("UserTable", {
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl,
            clerkId: identity.subject,
        });
        return await ctx.db.get(id);
    }
})
