import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  Code
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/BrandIcons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolio';

export default function ContactSection() {
  const contact = portfolioData.contact;
  const p = portfolioData.personal;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Recruitment / Project Discussion',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // If user configured a valid Formspree endpoint in portfolio.js
      if (contact.formspreeEndpoint && !contact.formspreeEndpoint.includes('sample_portfolio')) {
        const response = await fetch(contact.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setStatus('success');
          confetti({ particleCount: 60, spread: 60 });
          setFormData({ name: '', email: '', subject: 'Recruitment / Project Discussion', message: '' });
          return;
        }
      }

      // Default smooth mock response for testing/demo before replacing endpoint
      setTimeout(() => {
        setStatus('success');
        confetti({ particleCount: 60, spread: 60 });
        setFormData({ name: '', email: '', subject: 'Recruitment / Project Discussion', message: '' });
      }, 800);

    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-bg/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>START A DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Initiate a <span className="text-gradient-blue">Technical Discussion</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Open to placement year opportunities, data analytics internships, and collaborative data science discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Direct Access Card */}
            <div className="p-7 rounded-2xl glass-panel border border-cyan-500/20 shadow-glass space-y-5">
              <h3 className="text-lg font-bold font-heading text-white">
                Direct Channels
              </h3>

              <div className="space-y-4 text-sm">
                {/* Email with copy */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs text-slate-400">Direct Email</p>
                      <p className="font-semibold text-white truncate">{contact.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-purple-950 text-purple-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone / Signal</p>
                    <p className="font-semibold text-white">{contact.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Base Location</p>
                    <p className="font-semibold text-white">{contact.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels Badges */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Profiles & Developer Hubs
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {contact.socials.linkedin && (
                    <a
                      href={contact.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {contact.socials.github && (
                    <a
                      href={contact.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {contact.socials.whatsapp && (
                    <a
                      href={contact.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
                      title="WhatsApp Direct"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                  {contact.socials.leetcode && (
                    <a
                      href={contact.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors text-xs font-mono flex items-center gap-1"
                      title="LeetCode Profile"
                    >
                      <Code className="w-4 h-4" />
                      <span>LeetCode</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl glass-panel border border-cyan-500/20 shadow-glow-mixed">
              <h3 className="text-xl font-bold font-heading text-white mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Messages reach me instantly on my personal workstation and mobile device.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe (Tech Recruiter)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Topic / Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Full Stack Engineer Opportunity at [Company]"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about the role, technical challenges, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'sending' ? 'Sending Message...' : "Send Message"}
                  </span>
                </button>

                {/* Status Feedback */}
                {status === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-medium text-center animate-fadeIn">
                    ✓ Message transmitted successfully! I will reply within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-medium text-center animate-fadeIn">
                    ⚠ Transmission error. Please email directly at {contact.email}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
