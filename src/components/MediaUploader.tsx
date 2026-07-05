"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

export interface UploadedItem {
  id: string;
  name: string;
  previewUrl: string; // local object URL for the thumbnail
  isVideo: boolean;
  status: "uploading" | "done" | "error";
  progress: number; // 0–100
  url?: string; // Blob URL once uploaded
  error?: string;
}

let counter = 0;
const nextId = () => `f${Date.now()}_${counter++}`;

// Drag-and-drop photo/video uploader. Each file uploads straight to Vercel
// Blob from the browser; the parent receives the resulting public URLs via
// onChange. Falls back gracefully (per-file error state) if uploads aren't
// configured, so the rest of the intake still submits.
export default function MediaUploader({
  onChange,
}: {
  onChange: (urls: string[]) => void;
}) {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the parent in sync with the successfully-uploaded URLs.
  useEffect(() => {
    onChange(items.filter((i) => i.status === "done" && i.url).map((i) => i.url!));
  }, [items, onChange]);

  // Revoke object URLs on unmount to avoid leaks.
  useEffect(() => {
    return () => {
      items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = (id: string, next: Partial<UploadedItem>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...next } : i)));

  const uploadOne = useCallback(async (item: UploadedItem, file: File) => {
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: ({ percentage }) =>
          patch(item.id, { progress: Math.round(percentage) }),
      });
      patch(item.id, { status: "done", url: blob.url, progress: 100 });
    } catch (err) {
      patch(item.id, {
        status: "error",
        error:
          (err as Error)?.message?.slice(0, 120) ||
          "Upload failed — use the link field below.",
      });
    }
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter(
        (f) => f.type.startsWith("image/") || f.type.startsWith("video/")
      );
      if (!files.length) return;
      const newItems: UploadedItem[] = files.map((f) => ({
        id: nextId(),
        name: f.name,
        previewUrl: URL.createObjectURL(f),
        isVideo: f.type.startsWith("video/"),
        status: "uploading",
        progress: 0,
      }));
      setItems((prev) => [...prev, ...newItems]);
      newItems.forEach((item, i) => uploadOne(item, files[i]));
    },
    [uploadOne]
  );

  const remove = (id: string) =>
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });

  const uploading = items.some((i) => i.status === "uploading");
  const doneCount = items.filter((i) => i.status === "done").length;

  return (
    <div>
      {/* Dropzone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-gold/70 bg-gold/[0.06]"
            : "border-white/15 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.05]"
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-sm font-medium text-warm-100">
          Drag photos &amp; video here, or click to browse
        </span>
        <span className="text-xs font-light text-warm-500">
          JPG, PNG, HEIC, MP4, MOV — as many as you like. The more, the better.
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Status line */}
      {items.length > 0 && (
        <p className="mt-3 text-xs font-light text-warm-400">
          {doneCount} of {items.length} uploaded
          {uploading ? " · uploading…" : ""}
        </p>
      )}

      {/* Thumbnail grid */}
      {items.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-obsidian"
            >
              {item.isVideo ? (
                <video src={item.previewUrl} muted playsInline className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.previewUrl} alt={item.name} className="h-full w-full object-cover" />
              )}

              {/* Uploading overlay */}
              {item.status === "uploading" && (
                <div className="absolute inset-0 flex items-end bg-obsidian/40">
                  <div className="h-1 w-full bg-white/15">
                    <div
                      className="h-full bg-gold transition-[width] duration-200"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Done check */}
              {item.status === "done" && (
                <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-obsidian">
                  ✓
                </span>
              )}

              {/* Error state */}
              {item.status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-950/70 px-1 text-center text-[9px] leading-tight text-red-200">
                  Upload failed
                </div>
              )}

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove ${item.name}`}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-obsidian/80 text-warm-100 opacity-0 transition-opacity group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
