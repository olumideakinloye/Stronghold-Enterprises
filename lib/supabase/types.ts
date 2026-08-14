// Minimal hand-written types mirroring supabase/schema.sql.
// Regenerate with `supabase gen types typescript` once your project is live
// for full type safety, then replace this file.

export type ModuleSlug =
  | "security"
  | "real-estate"
  | "consultancy"
  | "logistics"
  | "automobiles";

export type LeadStatus = "new" | "in_progress" | "closed";

export interface Database {
  public: {
    Tables: {
      catalogue_items: {
        Row: {
          id: string;
          module: ModuleSlug;
          title: string;
          description: string | null;
          price: number | null;
          category: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["catalogue_items"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["catalogue_items"]["Row"]>;
      };
      property_listings: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number | null;
          location: string | null;
          status: "for_sale" | "for_rent" | "managed";
          bedrooms: number | null;
          bathrooms: number | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["property_listings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["property_listings"]["Row"]>;
      };
      vehicle_listings: {
        Row: {
          id: string;
          make: string;
          model: string;
          year: number | null;
          price: number | null;
          transaction_type: "buy" | "sell" | "swap";
          description: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicle_listings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["vehicle_listings"]["Row"]>;
      };
      leads: {
        Row: {
          id: string;
          module: ModuleSlug;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          meta: Record<string, unknown> | null;
          status: LeadStatus;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["leads"]["Row"]>;
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          role: "super_admin" | "editor";
          full_name: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["admin_users"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Row"]>;
      };
      activity_log: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          details: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["activity_log"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["activity_log"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      module_slug: ModuleSlug;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
