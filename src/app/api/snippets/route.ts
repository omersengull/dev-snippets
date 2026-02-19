import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; 

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient(); 

    const { title, code, language, description ,visibility, lines, file_name} = await request.json();
   
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
    }

    // Basit doğrulama (Validation)
    if (!title || !code || !language) {
      return NextResponse.json({ error: "There are missing fields!" }, { status: 400 });
    }

    const { data: insertedData, error: dbError } = await supabase
      .from("snippets")
      .insert([
        {
          title,
          code,
          description,
          language,
          visibility,
          user_id: user.id,
          lines,
          file_name

        },
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(
      { data: insertedData, message: "Data saved successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}