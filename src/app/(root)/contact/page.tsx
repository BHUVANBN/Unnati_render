import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { createContactSchema } from "@/schemas";
import { z } from "zod";
import { redirect } from "next/navigation";

async function getCourses() {
  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });
  return courses;
}

async function submitContactForm(formData: FormData) {
  "use server";

  const rawFormData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    orgName: formData.get("orgName") as string,
    courseId: formData.get("courseId") as string,
  };

  try {
    const validatedData = createContactSchema.parse(rawFormData);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit contact form");
    }

    redirect("/contact?success=true");
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues.map((issue) => issue.message).join(", "));
    }
    throw error;
  }
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const courses = await getCourses();
  const isSuccess = searchParams.success === "true";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for any inquiries about our courses, training programs, or to learn more about how we can help you achieve your career goals.
          </p>
        </div>
      </section>

      {/* Success Message */}
      {isSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            Thank you for contacting us! We'll get back to you soon.
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={submitContactForm} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        required
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        name="orgName"
                        required
                        placeholder="Your Company/Organization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="courseId">Course Interested In *</Label>
                      <Select name="courseId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Head Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Head Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    "Shiv-Sawali", 2nd Floor, N-7, CIDCO R-28 Plot No.60
                    <br />
                    Opp.Baliram Patil High School Aurangabad.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>9822451920, 0240-2485766</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Monday - Friday: 9:00 AM - 9:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* Branch Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Branch Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    "Shiv-Sawali", Plot No.13, GUT No.70, Near Alpine Hospital
                    <br />
                    Atharv Daily Needs. Chh.Shambhajinagar (MS) 431001.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>9970727708, 0240-2985766</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Monday - Saturday: 9:00 AM - 9:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pune Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Pune Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    2nd Floor Office No.222-223 Survey No. 153/1A Off-Service Road,
                    <br />
                    Mumbai Expressway, behind TipTop Intl Hotel, Wakad
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>9561191113</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Monday - Saturday: 9:00 AM - 9:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:training@unnatidevelopment.in" 
                    className="text-sm text-primary hover:underline"
                  >
                    training@unnatidevelopment.in
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
