
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Validation schema with improved email message
type FormValues = z.infer<typeof formSchema>;
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid and active email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onChange', // validate on change to track isValid
  });

  const { handleSubmit, formState } = form;
  const { isValid } = formState;

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'parshjain46@gmail.com', link: 'mailto:parshjain46@gmail.com' },
    { icon: Phone, title: 'Phone', value: '9619261352', link: 'tel:9619261352' },
    { icon: MapPin, title: 'Location', value: 'Mumbai, Maharashtra, India', link: null },
  ];

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Google Sheets Integration
      const sheetUrl =
        'https://script.google.com/macros/s/AKfycbxg30NKDAbK3qAh5F2f9yRjIuV5uV2KmU63XW03jvD0r7j8Yc8iZ4Y7wPu5VeZnV-Vz/exec';
      const sheetData = new FormData();
      sheetData.append('name', values.name);
      sheetData.append('email', values.email);
      sheetData.append('message', values.message);
      const sheetRes = await fetch(sheetUrl, { method: 'POST', body: sheetData });
      const sheetResult = await sheetRes.json();
      if (sheetResult.result !== 'success') throw new Error(sheetResult.error || 'Failed to update Google Sheets');

      // EmailJS Integration via Template ID
      const templateParams = {
        name: values.name,
        email: values.email,
        message: values.message,
        date: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        website_url: 'https://parshportfolio.vercel.app/',
      };
      const emailResponse = await emailjs.send(
        'service_jeml01f',
        'template_j0ysepg',
        templateParams,
        'Zgo7mVEjjmlF__AdF'
      );
      if (emailResponse.status !== 200) throw new Error('Failed to send email notification');

      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      toast({ title: 'Message sent successfully!', description: "Thank you for contacting me. I'll get back to you soon." });
    } catch (error) {
      toast({ title: 'Something went wrong!', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4 pb-2 border-b border-primary/20">Contact</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
          Feel free to reach out for any inquiries or collaborations.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {contactInfo.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-muted-foreground hover:text-primary">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{item.value}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Map & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full"
        >
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6393156930058!2d72.83770657492819!3d18.991530104619493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cef825c6ffe7%3A0x6803cccf5fc9f506!2sLal%20Baug%2C%20Parel%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718304788216!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500 h-[300px] sm:h-[450px]"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full"
        >
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Send a Message</h3>

              {showSuccess && (
                <Alert className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your message has been sent successfully.</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="focus:ring-primary" />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" type="email" {...field} className="focus:ring-primary" />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message" {...field} className="focus:ring-primary min-h-[180px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2 py-6 mt-2 bg-primary hover:bg-primary/90 transition-colors"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
