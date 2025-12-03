"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, FileText, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl?: string;
  isActive: boolean;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      // Only show active certificates
      const activeCerts = (data.certificates || []).filter((c: Certificate) => c.isActive);
      setCertificates(activeCerts);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A441] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (certificates.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#D9A441]/10 text-[#D9A441] px-4 py-2 rounded-full mb-4">
              <Award className="w-5 h-5" />
              <span className="font-medium">Certified Quality</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">
              Our Certifications
            </h2>
            <p className="text-lg text-[#8B7355] max-w-2xl mx-auto">
              We are proud to hold these certifications that guarantee the quality and purity of our products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="aspect-[4/3] relative bg-[#F5E6D3] overflow-hidden">
                  {cert.imageUrl && (
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                      <ExternalLink className="w-6 h-6 text-[#D9A441]" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2D1F0E] mb-2">{cert.title}</h3>
                  {cert.description && (
                    <p className="text-sm text-[#8B7355] line-clamp-2">{cert.description}</p>
                  )}
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-4 text-sm text-[#D9A441] hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      View Document
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl text-[#8B7355]">&times;</span>
            </button>

            <div className="grid md:grid-cols-2">
              <div className="aspect-square relative bg-[#F5E6D3]">
                {selectedCert.imageUrl && (
                  <Image
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    fill
                    className="object-contain p-4"
                  />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-[#D9A441] mb-4">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">Certificate</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2D1F0E] mb-4">{selectedCert.title}</h3>
                {selectedCert.description && (
                  <p className="text-[#8B7355] mb-6">{selectedCert.description}</p>
                )}
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl w-fit"
                  >
                    <FileText className="w-5 h-5" />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
