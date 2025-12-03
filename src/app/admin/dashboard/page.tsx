"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Leaf,
  LogOut,
  Package,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Settings,
  Award,
  Upload,
  FileText,
  ImageIcon,
  Phone,
  Mail,
  MapPin,
  Instagram,
  CheckCircle,
  MessageCircle,
  Shield,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string;
  ingredients: string;
  howToUse: string;
  benefits: string;
  isActive: boolean;
  images?: string[];
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl?: string;
  isActive: boolean;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface SiteSettings {
  id: string;
  brandName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
  aboutText: string;
}

interface LegalPage {
  id: string;
  title: string;
  content: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "certificates" | "legal" | "settings">("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    brandName: "",
    tagline: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    address: "",
    aboutText: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [privacyPage, setPrivacyPage] = useState<LegalPage | null>(null);
  const [termsPage, setTermsPage] = useState<LegalPage | null>(null);
  const [privacyForm, setPrivacyForm] = useState({ title: "Privacy Policy", content: "" });
  const [termsForm, setTermsForm] = useState({ title: "Terms & Conditions", content: "" });
  const [savingLegal, setSavingLegal] = useState(false);
  const [legalSaved, setLegalSaved] = useState(false);

  const productImageRef = useRef<HTMLInputElement>(null);
  const certImageRef = useRef<HTMLInputElement>(null);
  const certPdfRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    sizes: "",
    ingredients: "",
    howToUse: "",
    benefits: "",
    isActive: true,
    images: [] as string[],
  });

  const [certFormData, setCertFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    pdfUrl: "",
    isActive: true,
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchCertificates();
    fetchSettings();
    fetchLegalPages();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch {
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        setSettingsForm({
          brandName: data.settings.brandName || "",
          tagline: data.settings.tagline || "",
          phone: data.settings.phone || "",
          whatsapp: data.settings.whatsapp || "",
          email: data.settings.email || "",
          instagram: data.settings.instagram || "",
          address: data.settings.address || "",
          aboutText: data.settings.aboutText || "",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSavingSettings(false);
    }
  };

  const fetchLegalPages = async () => {
    try {
      const [privacyRes, termsRes] = await Promise.all([
        fetch("/api/legal/privacy"),
        fetch("/api/legal/terms")
      ]);
      const privacyData = await privacyRes.json();
      const termsData = await termsRes.json();

      if (privacyData.page) {
        setPrivacyPage(privacyData.page);
        setPrivacyForm({ title: privacyData.page.title, content: privacyData.page.content });
      }
      if (termsData.page) {
        setTermsPage(termsData.page);
        setTermsForm({ title: termsData.page.title, content: termsData.page.content });
      }
    } catch (error) {
      console.error("Error fetching legal pages:", error);
    }
  };

  const handleSaveLegalPage = async (pageId: string, title: string, content: string) => {
    try {
      setSavingLegal(true);
      const res = await fetch(`/api/legal/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setLegalSaved(true);
        setTimeout(() => setLegalSaved(false), 3000);
        fetchLegalPages();
      }
    } catch (error) {
      console.error("Error saving legal page:", error);
    } finally {
      setSavingLegal(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const handleUploadFile = async (file: File, type: string): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
      return null;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [...formData.images];
    for (let i = 0; i < files.length; i++) {
      const url = await handleUploadFile(files[i], "products");
      if (url) {
        newImages.push(url);
      }
    }
    setFormData({ ...formData, images: newImages });
  };

  const handleRemoveProductImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleCertImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleUploadFile(file, "certificates");
    if (url) {
      setCertFormData({ ...certFormData, imageUrl: url });
    }
  };

  const handleCertPdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleUploadFile(file, "certificates");
    if (url) {
      setCertFormData({ ...certFormData, pdfUrl: url });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      sizes: product.sizes,
      ingredients: product.ingredients,
      howToUse: product.howToUse,
      benefits: product.benefits,
      isActive: product.isActive,
      images: product.images || [],
    });
    setIsAddingProduct(false);
  };

  const handleAddNewProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      sizes: JSON.stringify([
        { id: "50ml", label: "50ml", price: 299, originalPrice: 399 },
        { id: "100ml", label: "100ml", price: 599, originalPrice: 799 },
        { id: "200ml", label: "200ml", price: 999, originalPrice: 1299 },
      ]),
      ingredients: JSON.stringify(["100% Pure Almonds", "No Preservatives", "No Chemicals"]),
      howToUse: JSON.stringify([
        "For Skin: Apply a few drops on clean skin and massage gently.",
        "For Hair: Warm the oil slightly and massage into scalp.",
      ]),
      benefits: JSON.stringify([
        { icon: "sparkles", title: "Glowing Skin", description: "Natural moisturizer" },
        { icon: "heart", title: "Hair Nourishment", description: "Strengthens hair" },
      ]),
      isActive: true,
      images: [],
    });
  };

  const handleSaveProduct = async () => {
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sizes: typeof formData.sizes === "string" ? JSON.parse(formData.sizes) : formData.sizes,
          ingredients: typeof formData.ingredients === "string" ? JSON.parse(formData.ingredients) : formData.ingredients,
          howToUse: typeof formData.howToUse === "string" ? JSON.parse(formData.howToUse) : formData.howToUse,
          benefits: typeof formData.benefits === "string" ? JSON.parse(formData.benefits) : formData.benefits,
        }),
      });

      if (res.ok) {
        fetchProducts();
        setEditingProduct(null);
        setIsAddingProduct(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancelProduct = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  // Certificate handlers
  const handleEditCertificate = (cert: Certificate) => {
    setEditingCertificate(cert);
    setCertFormData({
      title: cert.title,
      description: cert.description,
      imageUrl: cert.imageUrl,
      pdfUrl: cert.pdfUrl || "",
      isActive: cert.isActive,
    });
    setIsAddingCertificate(false);
  };

  const handleAddNewCertificate = () => {
    setIsAddingCertificate(true);
    setEditingCertificate(null);
    setCertFormData({
      title: "",
      description: "",
      imageUrl: "",
      pdfUrl: "",
      isActive: true,
    });
  };

  const handleSaveCertificate = async () => {
    try {
      const url = editingCertificate
        ? `/api/certificates/${editingCertificate.id}`
        : "/api/certificates";
      const method = editingCertificate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certFormData),
      });

      if (res.ok) {
        fetchCertificates();
        setEditingCertificate(null);
        setIsAddingCertificate(false);
      }
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleCancelCertificate = () => {
    setEditingCertificate(null);
    setIsAddingCertificate(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A441]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#A6763B]">ELVYA</span>
                <span className="text-sm text-[#8B7355] ml-2">Admin</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#8B7355]">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#8B7355] hover:text-[#D9A441] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="card p-4 space-y-2">
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === "products"
                    ? "bg-[#D9A441] text-white"
                    : "text-[#8B7355] hover:bg-[#FFF5E6]"
                }`}
              >
                <Package className="w-5 h-5" />
                Products
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === "certificates"
                    ? "bg-[#D9A441] text-white"
                    : "text-[#8B7355] hover:bg-[#FFF5E6]"
                }`}
              >
                <Award className="w-5 h-5" />
                Certificates
              </button>
              <button
                onClick={() => setActiveTab("legal")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === "legal"
                    ? "bg-[#D9A441] text-white"
                    : "text-[#8B7355] hover:bg-[#FFF5E6]"
                }`}
              >
                <FileText className="w-5 h-5" />
                Legal Pages
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === "settings"
                    ? "bg-[#D9A441] text-white"
                    : "text-[#8B7355] hover:bg-[#FFF5E6]"
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2D1F0E]">Products</h2>
                  <button
                    onClick={handleAddNewProduct}
                    className="flex items-center gap-2 btn-primary px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </div>

                {/* Product Form */}
                {(editingProduct || isAddingProduct) && (
                  <div className="card p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#2D1F0E]">
                        {editingProduct ? "Edit Product" : "Add New Product"}
                      </h3>
                      <button
                        onClick={handleCancelProduct}
                        className="text-[#8B7355] hover:text-[#D9A441]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Images */}
                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Product Images
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#D9C4A8]">
                              <Image
                                src={img}
                                alt={`Product ${index + 1}`}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveProductImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => productImageRef.current?.click()}
                          disabled={uploadingImage}
                          className="w-24 h-24 rounded-xl border-2 border-dashed border-[#D9C4A8] flex flex-col items-center justify-center gap-1 text-[#8B7355] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                        >
                          {uploadingImage ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D9A441]"></div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6" />
                              <span className="text-xs">Upload</span>
                            </>
                          )}
                        </button>
                        <input
                          ref={productImageRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleProductImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="Pure Almond Oil"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          Base Price (Rs.)
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none"
                        placeholder="Product description..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Sizes (JSON)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.sizes}
                        onChange={(e) =>
                          setFormData({ ...formData, sizes: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Ingredients (JSON Array)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.ingredients}
                        onChange={(e) =>
                          setFormData({ ...formData, ingredients: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none font-mono text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-[#D9C4A8] text-[#D9A441] focus:ring-[#D9A441]"
                      />
                      <label htmlFor="isActive" className="text-sm text-[#2D1F0E]">
                        Product is active
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveProduct}
                        className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl"
                      >
                        <Save className="w-5 h-5" />
                        Save Product
                      </button>
                      <button
                        onClick={handleCancelProduct}
                        className="px-6 py-3 rounded-xl border border-[#D9C4A8] text-[#8B7355] hover:bg-[#F5E6D3] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Products List */}
                <div className="card overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5E6D3]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#2D1F0E]">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#2D1F0E]">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#2D1F0E]">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#2D1F0E]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5E6D3]">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-[#8B7355]">
                            No products found. Add your first product!
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-[#FFF5E6]">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {product.images && product.images.length > 0 && (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                      src={product.images[0]}
                                      alt={product.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-[#2D1F0E]">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-[#8B7355] line-clamp-1">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-medium text-[#D9A441]">
                                Rs.{product.price}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  product.isActive
                                    ? "bg-[#3D6A46]/10 text-[#3D6A46]"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {product.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-2 text-[#8B7355] hover:text-[#D9A441] hover:bg-[#FFF5E6] rounded-lg transition-colors"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-2 text-[#8B7355] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2D1F0E]">Certificates</h2>
                  <button
                    onClick={handleAddNewCertificate}
                    className="flex items-center gap-2 btn-primary px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Certificate
                  </button>
                </div>

                {/* Certificate Form */}
                {(editingCertificate || isAddingCertificate) && (
                  <div className="card p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#2D1F0E]">
                        {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
                      </h3>
                      <button
                        onClick={handleCancelCertificate}
                        className="text-[#8B7355] hover:text-[#D9A441]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Certificate Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          Certificate Image
                        </label>
                        <div className="space-y-3">
                          {certFormData.imageUrl ? (
                            <div className="relative inline-block">
                              <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-[#D9C4A8]">
                                <Image
                                  src={certFormData.imageUrl}
                                  alt="Certificate"
                                  width={160}
                                  height={160}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                onClick={() => setCertFormData({ ...certFormData, imageUrl: "" })}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => certImageRef.current?.click()}
                              disabled={uploadingImage}
                              className="w-40 h-40 rounded-xl border-2 border-dashed border-[#D9C4A8] flex flex-col items-center justify-center gap-2 text-[#8B7355] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                            >
                              {uploadingImage ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D9A441]"></div>
                              ) : (
                                <>
                                  <ImageIcon className="w-8 h-8" />
                                  <span className="text-sm">Upload Image</span>
                                </>
                              )}
                            </button>
                          )}
                          <input
                            ref={certImageRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCertImageUpload}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Certificate PDF Upload */}
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          PDF Document (Optional)
                        </label>
                        <div className="space-y-3">
                          {certFormData.pdfUrl ? (
                            <div className="flex items-center gap-3 p-4 bg-[#FFF5E6] rounded-xl">
                              <FileText className="w-8 h-8 text-[#D9A441]" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#2D1F0E]">PDF Uploaded</p>
                                <a
                                  href={certFormData.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#D9A441] hover:underline"
                                >
                                  View PDF
                                </a>
                              </div>
                              <button
                                onClick={() => setCertFormData({ ...certFormData, pdfUrl: "" })}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => certPdfRef.current?.click()}
                              disabled={uploadingImage}
                              className="w-full h-20 rounded-xl border-2 border-dashed border-[#D9C4A8] flex items-center justify-center gap-2 text-[#8B7355] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                            >
                              {uploadingImage ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D9A441]"></div>
                              ) : (
                                <>
                                  <Upload className="w-5 h-5" />
                                  <span className="text-sm">Upload PDF</span>
                                </>
                              )}
                            </button>
                          )}
                          <input
                            ref={certPdfRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleCertPdfUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Certificate Title
                      </label>
                      <input
                        type="text"
                        value={certFormData.title}
                        onChange={(e) =>
                          setCertFormData({ ...certFormData, title: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                        placeholder="e.g., ISO Certification, FSSAI License"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={certFormData.description}
                        onChange={(e) =>
                          setCertFormData({ ...certFormData, description: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none"
                        placeholder="Brief description of the certificate..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="certIsActive"
                        checked={certFormData.isActive}
                        onChange={(e) =>
                          setCertFormData({ ...certFormData, isActive: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-[#D9C4A8] text-[#D9A441] focus:ring-[#D9A441]"
                      />
                      <label htmlFor="certIsActive" className="text-sm text-[#2D1F0E]">
                        Show on website
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveCertificate}
                        className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl"
                      >
                        <Save className="w-5 h-5" />
                        Save Certificate
                      </button>
                      <button
                        onClick={handleCancelCertificate}
                        className="px-6 py-3 rounded-xl border border-[#D9C4A8] text-[#8B7355] hover:bg-[#F5E6D3] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Certificates Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.length === 0 ? (
                    <div className="col-span-full card p-12 text-center text-[#8B7355]">
                      No certificates found. Add your first certificate!
                    </div>
                  ) : (
                    certificates.map((cert) => (
                      <div key={cert.id} className="card overflow-hidden">
                        <div className="aspect-video relative bg-[#F5E6D3]">
                          {cert.imageUrl && (
                            <Image
                              src={cert.imageUrl}
                              alt={cert.title}
                              fill
                              className="object-cover"
                            />
                          )}
                          {!cert.isActive && (
                            <div className="absolute top-2 right-2 px-2 py-1 bg-gray-500 text-white text-xs rounded">
                              Hidden
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-[#2D1F0E] mb-1">{cert.title}</h3>
                          {cert.description && (
                            <p className="text-sm text-[#8B7355] mb-3 line-clamp-2">
                              {cert.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            {cert.pdfUrl && (
                              <a
                                href={cert.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#D9A441] hover:underline flex items-center gap-1"
                              >
                                <FileText className="w-4 h-4" />
                                View PDF
                              </a>
                            )}
                            <div className="flex items-center gap-2 ml-auto">
                              <button
                                onClick={() => handleEditCertificate(cert)}
                                className="p-2 text-[#8B7355] hover:text-[#D9A441] hover:bg-[#FFF5E6] rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="p-2 text-[#8B7355] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Legal Pages Tab */}
            {activeTab === "legal" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2D1F0E]">Legal Pages</h2>
                  {legalSaved && (
                    <div className="flex items-center gap-2 text-[#3D6A46] bg-[#3D6A46]/10 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Page saved!</span>
                    </div>
                  )}
                </div>

                {/* Privacy Policy */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#2D1F0E] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#D9A441]" />
                    Privacy Policy
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={privacyForm.title}
                      onChange={(e) => setPrivacyForm({ ...privacyForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                      placeholder="Privacy Policy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                      Content (HTML)
                    </label>
                    <textarea
                      rows={10}
                      value={privacyForm.content}
                      onChange={(e) => setPrivacyForm({ ...privacyForm, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none font-mono text-sm"
                      placeholder="<section>...</section>"
                    />
                    <p className="text-xs text-[#8B7355] mt-1">Use HTML tags for formatting. Use classes like text-[#8B7355] for text color.</p>
                  </div>
                  <button
                    onClick={() => handleSaveLegalPage("privacy", privacyForm.title, privacyForm.content)}
                    disabled={savingLegal}
                    className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl disabled:opacity-50"
                  >
                    {savingLegal ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Privacy Policy
                      </>
                    )}
                  </button>
                </div>

                {/* Terms & Conditions */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#2D1F0E] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D9A441]" />
                    Terms & Conditions
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={termsForm.title}
                      onChange={(e) => setTermsForm({ ...termsForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                      placeholder="Terms & Conditions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                      Content (HTML)
                    </label>
                    <textarea
                      rows={10}
                      value={termsForm.content}
                      onChange={(e) => setTermsForm({ ...termsForm, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none font-mono text-sm"
                      placeholder="<section>...</section>"
                    />
                    <p className="text-xs text-[#8B7355] mt-1">Use HTML tags for formatting. Use classes like text-[#8B7355] for text color.</p>
                  </div>
                  <button
                    onClick={() => handleSaveLegalPage("terms", termsForm.title, termsForm.content)}
                    disabled={savingLegal}
                    className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl disabled:opacity-50"
                  >
                    {savingLegal ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Terms & Conditions
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#2D1F0E]">Site Settings</h2>
                  {settingsSaved && (
                    <div className="flex items-center gap-2 text-[#3D6A46] bg-[#3D6A46]/10 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Settings saved!</span>
                    </div>
                  )}
                </div>

                <div className="card p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D1F0E] mb-4 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-[#D9A441]" />
                      Brand Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.brandName}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, brandName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="Elvia Herbals"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={settingsForm.tagline}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, tagline: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="Pure Homemade Almond Oil"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#F5E6D3] pt-6">
                    <h3 className="text-lg font-bold text-[#2D1F0E] mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#D9A441]" />
                      Contact Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="+91 9207067522"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          <MessageCircle className="w-4 h-4 inline mr-1" />
                          WhatsApp Number (without +)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.whatsapp}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, whatsapp: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="919207067522"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="hello@elviaherbals.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                          <Instagram className="w-4 h-4 inline mr-1" />
                          Instagram URL
                        </label>
                        <input
                          type="url"
                          value={settingsForm.instagram}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, instagram: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none"
                          placeholder="https://instagram.com/elviaherbals"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#F5E6D3] pt-6">
                    <h3 className="text-lg font-bold text-[#2D1F0E] mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#D9A441]" />
                      Location
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        Business Address
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.address}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, address: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none"
                        placeholder="Kerala, India"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#F5E6D3] pt-6">
                    <h3 className="text-lg font-bold text-[#2D1F0E] mb-4">About Text</h3>
                    <div>
                      <label className="block text-sm font-medium text-[#2D1F0E] mb-2">
                        About Us Description
                      </label>
                      <textarea
                        rows={4}
                        value={settingsForm.aboutText}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, aboutText: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] outline-none resize-none"
                        placeholder="Tell customers about your brand..."
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#F5E6D3] pt-6">
                    <button
                      onClick={handleSaveSettings}
                      disabled={savingSettings}
                      className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl disabled:opacity-50"
                    >
                      {savingSettings ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
