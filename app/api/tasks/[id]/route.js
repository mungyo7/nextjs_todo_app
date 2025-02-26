import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("tododb");
    const body = await request.json();
    
    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status: body.status } }
    );
    
    if (result.matchedCount === 0) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (e) {
    console.error("Failed to update task:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("tododb");
    
    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(params.id)
    });
    
    if (result.deletedCount === 0) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (e) {
    console.error("Failed to delete task:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
} 