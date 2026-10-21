import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
async function MembersData() {
  const supabase = await createClient();
  const { data: members, error } = await supabase.from("members").select("*");
  if (error) {
    return <p>Error loading members: {error.message}</p>;
  }
  return <pre>{JSON.stringify(members, null, 2)}</pre>;
}
export default function Members() {
  return (
    <Suspense fallback={<div>Loading members...</div>}>
      <MembersData />
    </Suspense>
  );
}