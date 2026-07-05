import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

// Issues short-lived client upload tokens so the browser can upload property
// photos/video directly to Vercel Blob (bypassing the serverless body limit).
// Requires BLOB_READ_WRITE_TOKEN — auto-provisioned when Blob storage is
// enabled on the Vercel project. Without it, uploads fail gracefully and the
// intake form falls back to the "paste a folder link" field.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/heic",
          "image/heif",
          "image/gif",
          "image/tiff",
          "video/mp4",
          "video/quicktime",
          "video/webm",
        ],
        maximumSizeInBytes: 200 * 1024 * 1024, // 200 MB per file
        addRandomSuffix: true,
      }),
      // Server-side hook after each upload finishes. Nothing to persist here —
      // the client collects the returned URLs and sends them with the intake.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
