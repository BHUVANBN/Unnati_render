"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { createTrainerSchema, CreateTrainer, Trainer } from "@/schemas";
import { FormDialogProps } from "@/types/interfaces";
import { Loader2 } from "lucide-react";

export function TrainerFormDialog({ open, onOpenChange, onSubmit, initialData,isLoading}: FormDialogProps<CreateTrainer, Trainer>) {
    const form = useForm<CreateTrainer>({
        resolver: zodResolver(createTrainerSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            expertise: initialData.expertise,
            experience: initialData.experience,
            designation: initialData.designation,
            bio: initialData.bio || "",
            photo: undefined // Can't set File from existing image
        } : {
            designation: "",
            experience: "",
            expertise: "",
            name: "",
            bio: "",
            photo: undefined
        },
    });

    useEffect(() => {
        if (open) {
            form.reset(initialData ? {
                name: initialData.name,
                expertise: initialData.expertise,
                experience: initialData.experience,
                designation: initialData.designation,
                bio: initialData.bio || "",
                photo: undefined
            } : {
                designation: "",
                experience: "",
                expertise: "",
                name: "",
                bio: "",
                photo: undefined
            });
        }
    }, [open, initialData, form]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Trainer" : "Create Trainer"}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the trainer information below." : "Add a new trainer to your team."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Trainer name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Photo</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            label="Trainer Photo"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Designation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expertise</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Expertise" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Experience" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder="Enter answer"
                                            className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={!form.watch("name")}>Cancel</Button>
                            <Button type="submit" disabled={!form.watch("name")} variant="secondary">
                                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : initialData ? "Save" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
