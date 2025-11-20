import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Course, CreateCourse } from "@/schemas";
import { Loader2 } from "lucide-react";
import { FormDialogProps } from "@/types/interfaces";
import { ImageUpload } from "@/components/ui/image-upload";

export function CourseFormDialog({ open, onOpenChange, onSubmit, initialData, isLoading }: FormDialogProps<CreateCourse, Course>) {
  const form = useForm<CreateCourse>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      targetAudiences: initialData?.targetAudiences || [],
      thumbnail: undefined,
      additionalInfo: {
        studentsEnrolled: initialData?.additionalInfo?.studentsEnrolled || 0,
        rating: initialData?.additionalInfo?.rating || 0,
        duration: initialData?.additionalInfo?.duration || "",
        languages: initialData?.additionalInfo?.languages || [],
        mode: initialData?.additionalInfo?.mode || [],
        projectsIncluded: initialData?.additionalInfo?.projectsIncluded || 0,
      },
      syllabus: {
        title: initialData?.syllabus?.title || [],
        subtitle: initialData?.syllabus?.subtitle || "",
        points: initialData?.syllabus?.points || [],
        imageId: initialData?.syllabus?.imageId || undefined,
      }
    },
  });

  const handleSubmit = (data: CreateCourse) => {
    // Data is already clean with tag-style inputs
    onSubmit(data);
  };

  useEffect(() => {
    if (open && !initialData) {
      form.reset({
        title: "",
        description: "",
        targetAudiences: [],
        thumbnail: undefined,
        additionalInfo: {
          studentsEnrolled: 0,
          rating: 0,
          duration: "",
          languages: [],
          mode: [],
          projectsIncluded: 0,
        },
        syllabus: {
          title: [],
          subtitle: "",
          points: [],
        }
      });
    }
  }, [open, initialData, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Course" : "Create Course"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Thumbnail *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      label="Course Thumbnail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="syllabus.title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Syllabus *</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {field.value?.map((title: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Input
                            placeholder={`Syllabus item ${idx + 1}`}
                            value={title}
                            onChange={(e) => {
                              const updated = [...(field.value || [])];
                              updated[idx] = e.target.value;
                              field.onChange(updated);
                            }}
                          />
                          {field.value && field.value.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updated = field.value.filter((_: string, i: number) => i !== idx);
                                field.onChange(updated);
                              }}
                            >
                              <span className="text-destructive">×</span>
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          field.onChange([...(field.value || []), ""]);
                        }}
                      >
                        + Add Item
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="syllabus.subtitle"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Subtitle *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course subtitle..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="syllabus.points"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Key Points *</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {field.value?.map((point: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Input
                            placeholder={`Point ${idx + 1}`}
                            value={point}
                            onChange={(e) => {
                              const updated = [...(field.value || [])];
                              updated[idx] = e.target.value;
                              field.onChange(updated);
                            }}
                          />
                          {field.value && field.value.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updated = field.value.filter((_: string, i: number) => i !== idx);
                                field.onChange(updated);
                              }}
                            >
                              <span className="text-destructive">×</span>
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          field.onChange([...(field.value || []), ""]);
                        }}
                      >
                        + Add Point
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudiences"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Target Audiences *</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                      {field.value?.map((audience: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-sm text-sm">
                          <span>{audience}</span>
                          <button
                            type="button"
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              const updated = field.value.filter((_: string, i: number) => i !== idx);
                              field.onChange(updated);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="Type and press Enter..."
                        className="flex-1 min-w-[120px] outline-none border-none bg-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              field.onChange([...(field.value || []), value]);
                              e.currentTarget.value = '';
                            }
                          } else if (e.key === 'Delete' && field.value && field.value.length > 0 && !e.currentTarget.value) {
                            // Delete last tag when input is empty and Delete is pressed
                            const updated = field.value.slice(0, -1);
                            field.onChange(updated);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter course description..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo.duration"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Duration *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course duration..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo.languages"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Languages *</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                      {field.value?.map((lang: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-sm text-sm">
                          <span>{lang}</span>
                          <button
                            type="button"
                            className="ml-1 text-green-600 hover:text-green-800"
                            onClick={() => {
                              const updated = field.value.filter((_: string, i: number) => i !== idx);
                              field.onChange(updated);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="Type and press Enter..."
                        className="flex-1 min-w-[120px] outline-none border-none bg-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              field.onChange([...(field.value || []), value]);
                              e.currentTarget.value = '';
                            }
                          } else if (e.key === 'Delete' && field.value && field.value.length > 0 && !e.currentTarget.value) {
                            // Delete last tag when input is empty and Delete is pressed
                            const updated = field.value.slice(0, -1);
                            field.onChange(updated);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo.mode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Modes *</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                      {field.value?.map((mode: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-sm text-sm">
                          <span>{mode}</span>
                          <button
                            type="button"
                            className="ml-1 text-purple-600 hover:text-purple-800"
                            onClick={() => {
                              const updated = field.value.filter((_: string, i: number) => i !== idx);
                              field.onChange(updated);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="Type and press Enter..."
                        className="flex-1 min-w-[120px] outline-none border-none bg-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              field.onChange([...(field.value || []), value]);
                              e.currentTarget.value = '';
                            }
                          } else if (e.key === 'Delete' && field.value && field.value.length > 0 && !e.currentTarget.value) {
                            // Delete last tag when input is empty and Delete is pressed
                            const updated = field.value.slice(0, -1);
                            field.onChange(updated);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary">
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : initialData ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
