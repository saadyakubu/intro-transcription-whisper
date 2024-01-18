import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse)=>{
    const data = await req.formData();
    //casted as an unknown and then as a File to suppress Typescript typechecking
    const theFile: File | null = data.get("file") as unknown as File;

    const formData = new FormData();
    formData.append("file", theFile);
    formData.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", 
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
    });

    const body = await response.json();
    return NextResponse.json({ output: body });
};

//export default POST;