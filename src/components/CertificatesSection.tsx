import { motion } from "framer-motion";
import { useState } from "react";
import { Upload, Lock, Unlock, X, Award, FileImage } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  imageUrl: string;
}

const ADMIN_PASSWORD = "190413";

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleUnlock = () => {
    if (password === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newCert: Certificate = {
          id: crypto.randomUUID(),
          name: file.name.replace(/\.[^/.]+$/, ""),
          imageUrl: ev.target?.result as string,
        };
        setCertificates((prev) => [...prev, newCert]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleDelete = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section id="certificates" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Album foto</h2>
          <p className="section-subtitle mx-auto mt-3">
            Album dan Memory Foto.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          {!isUnlocked ? (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="btn-outline gap-2"
            >
              <Lock size={16} /> Upload Foto (Admin Only)
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <label className="btn-primary cursor-pointer gap-2">
                <Upload size={16} /> Upload Foto
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
              <button onClick={() => setIsUnlocked(false)} className="btn-outline gap-2">
                <Lock size={16} /> Lock
              </button>
            </div>
          )}
        </div>

        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <Award size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Belum ada foto yang diupload.</p>
            <p className="text-xs text-muted-foreground/50 mt-1">
              Klik tombol upload untuk menambahkan foto.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glow-card overflow-hidden group relative"
              >
                <div
                  className="aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => setPreviewImg(cert.imageUrl)}
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileImage size={14} className="text-primary" />
                    <p className="text-sm font-medium text-foreground truncate">
                      {cert.name}
                    </p>
                  </div>
                  {isUnlocked && (
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-[340px] space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Unlock size={18} className="text-primary" /> Admin Access
              </h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                  setPasswordError(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Masukkan password untuk mengupload foto.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="Enter password..."
              className={`w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 ${
                passwordError ? "focus:ring-destructive ring-1 ring-destructive" : "focus:ring-primary"
              }`}
            />
            {passwordError && (
              <p className="text-xs text-destructive">Password salah! Coba lagi.</p>
            )}
            <button onClick={handleUnlock} className="btn-primary w-full justify-center">
              <Unlock size={14} /> Unlock
            </button>
          </motion.div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm cursor-pointer"
          onClick={() => setPreviewImg(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={previewImg}
            alt="Certificate Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            style={{ boxShadow: "var(--shadow-card)" }}
          />
          <button
            className="absolute top-6 right-6 text-foreground bg-secondary/80 rounded-full p-2"
            onClick={() => setPreviewImg(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
