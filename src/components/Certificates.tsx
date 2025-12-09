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

      {/* Redesigned Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section - Left Side */}
              <div className="relative bg-gradient-to-br from-[#FFF5E6] to-[#F5E6D3] p-12 flex items-center justify-center min-h-[500px] md:min-h-[700px]">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A441]/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3D6A46]/5 rounded-full blur-3xl"></div>
                </div>

                {/* Certificate Image */}
                <div className="relative z-10 w-full max-w-lg">
                  {selectedCert.imageUrl && (
                    <div className="relative aspect-[3/4] shadow-2xl rounded-2xl overflow-hidden border-8 border-white/80 transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src={selectedCert.imageUrl}
                        alt={selectedCert.title}
                        fill
                        className="object-cover"
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
                    </div>
                  )}

                  {/* Decorative Corner Accents */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#D9A441] rounded-tl-3xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-[#D9A441] rounded-br-3xl"></div>
                </div>
              </div>

              {/* Content Section - Right Side */}
              <div className="p-10 md:p-12 flex flex-col justify-center bg-white relative">
                {/* Close Button - Top Right */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-[#8B7355] hover:text-[#D9A441] transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Certificate Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9A441] to-[#C4932B] text-white px-5 py-2.5 rounded-full mb-6 w-fit shadow-md">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase">Certificate</span>
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-bold text-[#2D1F0E] mb-6 leading-tight">
                  {selectedCert.title}
                </h3>

                {/* Description */}
                {selectedCert.description && (
                  <p className="text-[#8B7355] text-lg leading-relaxed mb-8">
                    {selectedCert.description}
                  </p>
                )}

                {/* Divider */}
                <div className="relative h-px bg-[#D9A441]/20 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent"></div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#3D6A46]/5 to-[#3D6A46]/10 rounded-2xl mb-8 border border-[#3D6A46]/10">
                  <div className="w-12 h-12 rounded-full bg-[#3D6A46] flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#2D1F0E] mb-1">Verified & Authentic</p>
                    <p className="text-sm text-[#8B7355]">This certificate has been verified for quality and authenticity</p>
                  </div>
                </div>

                {/* Download Button */}
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D9A441] to-[#C4932B] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
                  >
                    <FileText className="w-6 h-6" />
                    Download Certificate
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
