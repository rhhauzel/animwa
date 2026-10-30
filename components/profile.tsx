'use client';
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

 type Person = {
  id: string
  hming: string
  chhungte: string
  mobile: string
  chhungte_mobile: string
  pianni: string
  veng: string
  thawh_tan_ni: string
  thawhna: string
 }

 //HELLO

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [member, setMember] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setMember(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!member) return <div className="p-6 text-red-600">Not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600" />

        {/* Profile body */}
        <div className="px-6 pb-8 sm:px-10 sm:pb-10 relative">
          
          {/* Avatar */}
          <div className="relative -mt-16 mb-6">
            <img
              src={`https://your-cdn.com/avatars/${member.id}.jpg`} // <-- update to real URL
              alt={member.hming}
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md bg-gray-200"
            />
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{member.hming}</h1>
                <p className="text-sm font-medium text-indigo-600 mt-1">{member.chhungte}</p>
                <p className="text-sm text-gray-500 mt-1">{member.mobile}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">About Me</h3>
              <p className="mt-2 text-gray-600 leading-relaxed text-sm">{member.veng}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}