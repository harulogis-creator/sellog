import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return NextResponse.json({ user: data?.user ?? null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
