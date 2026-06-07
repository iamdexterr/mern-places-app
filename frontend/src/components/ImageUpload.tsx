import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  id: string;
  onInput: (file: File) => void;
  errorText?: string;
};

const ImageUpload = ({ id, onInput, errorText }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const filePickerRef = useRef<HTMLInputElement>(null);

  // Revoke the object URL whenever it changes or the component unmounts,
  // so the underlying blob is released from memory.
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const pickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      onInput(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={pickHandler}
        className="hidden"
      />

      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded border border-dashed">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-sm text-muted-foreground">Please pick an image.</p>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => filePickerRef.current?.click()}
      >
        Pick Image
      </Button>

      {errorText && <p className="text-sm text-destructive">{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
