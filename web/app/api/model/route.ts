import { MODEL_API_ADDR, responseHeaderJson, responseMethodPost, responseStatusValid } from "@/lib/api/utils";

async function getModelResult(dbName: string, question: string): Promise<string> {
    const addr = `${MODEL_API_ADDR}/text_to_sql`
    console.log(`addr: ${addr}`);
    return await fetch(addr, {
        body: JSON.stringify({
            text: question,
            db_id: dbName,
            analyse: false,
        }),
        ...responseHeaderJson,
        ...responseMethodPost,
    }).then((res) => res.json());
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbName = searchParams.get("dbName") ?? "";
    const question = searchParams.get("question") ?? "";


    console.log(`dbName: ${dbName}`);
    console.log(`question: ${question}`);
    console.log(`MODEL_API_ADDR: ${MODEL_API_ADDR}`)

    // Check if arguments are valid
    if (dbName == "") {
        return new Response("dbName is empty")
    }
    else if(question == "") {
        return new Response("question is empty")
    }

    // Handle query
    const data = await getModelResult(dbName, question);
    return new Response(JSON.stringify(data), { ...responseHeaderJson, ...responseStatusValid });
}