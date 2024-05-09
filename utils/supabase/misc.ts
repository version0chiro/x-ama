import { createClient } from "@/utils/supabase/client";


export const canInitSupabaseClient = () => {
    try {
        createClient();
        return true;
    } catch (e) {
        return false;
    }
};

