import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section data-ocid="contact.section" className="py-20 bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
          Get in Touch
        </p>
        <h2 className="font-serif text-4xl font-bold mb-4">
          Commission a Piece
        </h2>
        <p className="text-muted-foreground mb-10">
          Interested in a custom artwork for your home or office? Reach out and
          let's create something extraordinary together.
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                data-ocid="contact.name.input"
                id="contact-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                data-ocid="contact.email.input"
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              data-ocid="contact.message.textarea"
              id="contact-message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your vision, preferred size, color palette..."
              className="mt-1 resize-none"
            />
          </div>
          <Button
            data-ocid="contact.submit.submit_button"
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground gap-2"
          >
            <Send className="w-4 h-4" /> Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
