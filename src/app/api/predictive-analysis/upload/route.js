import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  uploads,
  analysis,
  demandPatternPredictions,
  consumerBehaviorInsights,
  customerAdoption,
  revenueProjections,
  salesForecast,
} from "@/db/schema/predictive-analysis";

import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  // Generate the file path and save the file
  const uploadDir = path.join(process.cwd(), "/public/uploads");
  const filePath = path.join(uploadDir, file.name);

  // Ensure the uploads directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Write the file to disk
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Create a new analysis entry
  const newAnalysis = await db
    .insert(analysis)
    .values({
      keyword: "Uploaded file analysis", // You can use the file name or keyword from the user
      description: `Analysis for file: ${file.name}`,
    })
    .returning({ id: analysis.id }); // Return the new analysis ID

  const newAnalysisId = newAnalysis[0].id;

  // Insert file metadata into the uploads table
  await db.insert(uploads).values({
    filename: file.name,
    path: `/uploads/${file.name}`,
    fileType: file.type,
    analysisId: newAnalysisId, // Link to the newly created analysis
  });

  // Populate demand pattern predictions with sample data
  const demandPatternSampleData = [
    { taskName: "Initial setup", date: new Date(), status: "Pending" },
    {
      taskName: "Network configuration",
      date: new Date(),
      status: "In Progress",
    },
    { taskName: "Service deployment", date: new Date(), status: "Pending" },
    {
      taskName: "User feedback collection",
      date: new Date(),
      status: "Pending",
    },
    { taskName: "System optimization", date: new Date(), status: "Pending" },
  ];

  const predictions = demandPatternSampleData.map((item) => ({
    analysisId: newAnalysisId,
    taskName: item.taskName,
    date: item.date.toISOString(),
    status: item.status,
  }));

  await db.insert(demandPatternPredictions).values(predictions);

  // Populate consumer behavior insights with sample data
  const consumerBehaviorSampleData = [
    { insightText: "Customers show preference for feature-rich products." },
    { insightText: "Increasing demand for cloud-based services." },
    {
      insightText:
        "Focus on security and reliability influences customer choices.",
    },
  ];

  const insights = consumerBehaviorSampleData.map((item) => ({
    analysisId: newAnalysisId,
    insightText: item.insightText,
  }));

  await db.insert(consumerBehaviorInsights).values(insights);

  return NextResponse.json({
    message: "File uploaded and analysis data inserted successfully!",
    analysisId: newAnalysisId,
  });
}

export async function GET() {
  try {
    // Fetch the latest upload based on the uploadDate
    const latestUpload = await db.select().from(uploads);

    if (latestUpload.length === 0) {
      return NextResponse.json(
        { message: "No uploads found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { latestUpload: latestUpload.pop() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest upload:", error);
    return NextResponse.json(
      { message: "Error fetching latest upload" },
      { status: 500 }
    );
  }
}
