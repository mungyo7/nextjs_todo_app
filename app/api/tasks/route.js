import clientPromise from "@/lib/mongodb";

// 모든 tasks 가져오기
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tododb");
    const tasks = await db.collection("tasks").find({}).toArray();
    
    return Response.json(tasks);
  } catch (e) {
    console.error("Failed to fetch tasks:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// 새로운 task 추가
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("tododb");
    const body = await request.json();
    
    const newTask = {
      name: body.name,
      order: body.order,
      finished: false,
      createdAt: new Date()
    };
    
    const result = await db.collection("tasks").insertOne(newTask);
    return Response.json({ ...newTask, _id: result.insertedId });
  } catch (e) {
    console.error("Failed to add task:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
} 