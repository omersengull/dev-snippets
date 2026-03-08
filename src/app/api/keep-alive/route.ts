import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

 
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database pinged successfully",
      timestamp: new Date().toISOString() 
    });
    
  } catch (error: any) {
    console.error("Keep-alive hatası:", error.message);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}