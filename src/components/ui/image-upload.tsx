"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string;
  onChange: (file?: File) => void;
  label: string;
  className?: string;
}

export const ImageUpload = ({ value, onChange, label, className }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : value ? URL.createObjectURL(value) : null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange(undefined);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">{label}</label>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt={label}
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the image here...</p>
              ) : (
                <div>
                  <p>Drag & drop an image here, or click to select</p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
