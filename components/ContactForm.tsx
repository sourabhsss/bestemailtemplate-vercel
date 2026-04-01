'use client';

import { useState, FormEvent, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    const existingScript = document.querySelector(`script[src*="recaptcha"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY) return null;

    try {
      const grecaptcha = (window as unknown as Record<string, unknown>).grecaptcha as {
        ready: (cb: () => void) => void;
        execute: (key: string, options: { action: string }) => Promise<string>;
      };

      return new Promise((resolve) => {
        grecaptcha.ready(async () => {
          const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });
          resolve(token);
        });
      });
    } catch {
      return null;
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage(data.message);
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-border shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="heading-md text-foreground">Send a Message</CardTitle>
        <CardDescription className="body-md text-muted-foreground">
          Fill out the form below and we&apos;ll get back to you soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot — hidden from users, catches bots */}
          <div className="absolute opacity-0 -z-10" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={200}
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              required
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              disabled={status === 'loading'}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.message.length}/5000
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-4 rounded-sm bg-success-light text-success-dark border border-success/30">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="body-sm">{statusMessage}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 rounded-sm bg-destructive-light text-destructive-dark border border-destructive/30">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="body-sm">{statusMessage}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
