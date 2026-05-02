import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Message is required")
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message Sent",
      description: "We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">Have questions about Leads Rubix? Our team is here to help.</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Real Estate" {...field} data-testid="input-contact-company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} data-testid="input-contact-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How can we help you?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your team size and requirements..." 
                                className="min-h-[120px]"
                                {...field} 
                                data-testid="input-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="lg" className="w-full md:w-auto" data-testid="btn-contact-submit">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Email</p>
                          <a href="mailto:hello@leadsrubix.com" className="hover:text-primary">hello@leadsrubix.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Phone</p>
                          <p>+91 98765 43210</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Office</p>
                          <p>Mumbai, Maharashtra<br />India 400001</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Support Hours</h3>
                    <p className="text-muted-foreground">
                      Monday – Friday<br />
                      9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}