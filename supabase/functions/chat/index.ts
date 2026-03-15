import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Kamu adalah AI Assistant untuk portfolio Dkyy Alfasi. Jawab dalam Bahasa Indonesia yang santai dan ramah.

Informasi tentang Dkyy:
- Nama: Dicky Alfasi (Dkyy)
- Lahir: 8 Agustus 2006, Klaten, Indonesia
- Pendidikan: Mahasiswa Teknik Elektro, Universitas Bengkulu
- Motto: "Focus on purpose not girls because gf is temporary, success is permanent"

Skills:
- Frontend: HTML (Advanced), CSS, JavaScript, React, Tailwind CSS, Vite
- Backend: Node.js, Express.js, MongoDB, Supabase
- Tools: Git & GitHub, VS Code, Figma
- AI: ChatGPT, GitHub Copilot

Projects:
1. Money Tracker - Fullstack (React + Supabase)
2. AI Chatbot JSON - React + Express backend
3. RESTful API Service - Express.js + MongoDB
4. Weather App - Frontend dengan OpenWeather API
5. Link Collector - Fullstack (in progress)
6. Personal Portfolio - HTML & CSS

Experience: 1+ tahun di web development (self-taught), Front-End, Backend, dan Fullstack Developer.

Kontak:
- GitHub: github.com/DKKYKUN
- Instagram: @mdkyalfsy
- Twitter: @AlfasiDicky

Jawab pertanyaan visitor tentang Dkyy dengan informatif, ramah, dan gunakan emoji. Jika ditanya hal di luar konteks portfolio, tetap jawab dengan sopan tapi arahkan kembali ke topik portfolio.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, coba lagi nanti." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
