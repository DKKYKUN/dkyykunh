import { motion } from "framer-motion";
import { useState } from "react";
import StarRating from "./StarRating";
import { Send, Star } from "lucide-react";

interface Feedback {
  name: string;
  email: string;
  position: string;
  message: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [form, setForm] = useState<Feedback>({ name: "", email: "", position: "", message: "", rating: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message || form.rating === 0) return;
    setFeedbacks([...feedbacks, form]);
    setForm({ name: "", email: "", position: "", message: "", rating: 0 });
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="section-heading">Feedback</h2>
          <p className="section-subtitle mx-auto mt-3">Please fill in your feedback, friend. For email, fill in as in the example, for position, mark (-).</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Feedback</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position (atau -)" className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your feedback message..." rows={3} className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
                </div>
                <button type="submit" className="btn-primary w-full justify-center"><Send size={14} /> Submit Feedback</button>
              </form>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card p-6 min-h-[300px]">
              <h3 className="font-semibold text-foreground mb-4">Testimonials</h3>
              {feedbacks.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-12">
                  <p>No Have Feedback in Here!</p>
                  <p className="text-xs mt-1">Pengalaman Pertama Itu penting ygy hehe!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {feedbacks.map((fb, i) => (
                    <div key={i} className="bg-secondary/40 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground text-sm">{fb.name}</p>
                          <p className="text-xs text-muted-foreground">{fb.position || "-"}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} className={s <= fb.rating ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{fb.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
