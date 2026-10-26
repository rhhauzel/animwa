"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

export function CurrentUser() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      // data.user is the type for Supabase v11+; fallback to undefined
      setEmail(data?.user?.email ?? null);
      setLoading(false);
    };

    fetchUser();
  }, [supabase]);

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {email ?? <span className="text-muted-foreground">Not logged in</span>}
    </div>
  );
}