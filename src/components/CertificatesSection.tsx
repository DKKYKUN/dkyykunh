import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Upload, Lock, Unlock, X, Award, FileImage } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bykyjotuezyuknupyyat.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5a3lqb3R1ZXp5dWtudXB5eWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODExMTQsImV4cCI6MjA4OTE1NzExNH0.79frbaXu_RRhvVsMYwUP402Y0iBooxmhvu8pyoSNSjw";

const supabase = createClient(supabaseUrl, supabaseKey);

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

  // load foto dari supabase
  useEffect(() => {
    const loadPhotos = async () => {
      const { data } = await supabase.storage
        .from("photos")
        .list("", { limit: 100 });

      if (!data) return;

      const images = data.map((file) => ({
        id: file.name,
        name: file.name,
        imageUrl:
          supabase.storage
            .from("photos")
            .getPublicUrl(file.name).data.publicUrl,
      }));

      setCertificates(images);
    };

    loadPhotos();
  }, []);

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

  // upload foto ke supabase
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isUnlocked) return;

    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("photos")
        .upload(fileName, file);

      if (error) {
        console.log(error);
        continue;
      }

      const { data } = supabase.storage
        .from("photos")
        .getPublicUrl(fileName);

      const newCert: Certificate = {
        id: fileName,
        name: file.name.replace(/\.[^/.]+$/, ""),
        imageUrl: data.publicUrl,
      };

      setCertificates((prev) => [...prev, newCert]);
    }

    e.target.value = "";
  };

  // delete foto
  const handleDelete = async (id: string) => {
    if (!isUnlocked) return;

    const confirmDelete = confirm("Yakin ingin menghapus foto?");
    if (!confirmDelete) return;

    await supabase.storage.from("photos").remove([id]);

    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section id="certificates" className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="section-heading">Album Foto</h2>
          <p className="section-subtitle mt-3">
            Album dan Memory Foto
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          {!isUnlocked ? (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="btn-outline gap-2"
            >
              <Lock size={16}/> Upload Foto (Admin Only)
            </button>
          ) : (
            <div className="flex gap-3">
              <label className="btn-primary cursor-pointer gap-2">
                <Upload size={16}/> Upload Foto
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setIsUnlocked(false)}
                className="btn-outline"
              >
                Lock
              </button>
            </div>
          )}
        </div>

        {/* Gallery */}
        {certificates.length === 0 ? (
          <div className="text-center p-12">
            <Award size={48} className="mx-auto mb-4 opacity-40"/>
            <p>Belum ada foto yang diupload</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="relative group">

                <div
                  className="aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => setPreviewImg(cert.imageUrl)}
                >
                  <img
                    src={cert.imageUrl}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 flex justify-between">
                  <div className="flex gap-2 items-center">
                    <FileImage size={14}/>
                    <span className="text-sm">{cert.name}</span>
                  </div>

                  {isUnlocked && (
                    <button onClick={() => handleDelete(cert.id)}>
                      <X size={14}/>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">

          <div className="bg-white p-6 rounded-xl w-[320px] space-y-4">

            <h3 className="font-semibold flex gap-2 items-center">
              <Unlock size={18}/> Admin Access
            </h3>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

            {passwordError && (
              <p className="text-red-500 text-sm">
                Password salah
              </p>
            )}

            <button
              onClick={handleUnlock}
              className="btn-primary w-full"
            >
              Unlock
            </button>

          </div>

        </div>
      )}

      {/* Preview */}
      {previewImg && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80"
          onClick={()=>setPreviewImg(null)}
        >
          <img
            src={previewImg}
            className="max-w-[90vw] max-h-[90vh]"
          />
        </div>
      )}
    </section>
  );
}
