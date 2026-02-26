import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

/* =======================
   FORM CONFIGURATION
======================= */
const FORM_SECTIONS = [
  {
    id: "general",
    title: "GENERAL DETAILS",
    description: "These Are Basic Details To Define A Product.",
    fields: [
      { label: "Image URL", placeholder: "FLIPKART", type: "text" },
      { label: "SKU Code", placeholder: "Enter SKU Code", type: "text", required: true },
      { label: "Product Name", placeholder: "Enter Product Name", type: "select" },
      { label: "Product Category", placeholder: "Enter Product Category", type: "select", required: true },
      { label: "Batch Group Code", placeholder: "FLIPKART", type: "text" },
      { label: "HSN Code", placeholder: "Enter SKU Code", type: "text" },
      { label: "SKU Type", placeholder: "Enter Product Name", type: "select" },
      { label: "Enabled", placeholder: "Enter Product Category", type: "select", required: true },
      { label: "Fragile", placeholder: "FLIPKART", type: "text" },
      { label: "Dangerous Good", placeholder: "Enter SKU Code", type: "text" },
    ],
  },
  {
    id: "components",
    title: "COMPONENT PRODUCTS",
    description: "Component Products For Bundle.",
    fields: [
      { label: "Product Type", placeholder: "Select Product Type", type: "select", required: true },
    ],
  },
  {
    id: "pricing",
    title: "PRICING AND TAX DETAILS",
    description: "These Are Options To Select Pricing And Tax Classes Of Your Product.",
    fields: [
      { label: "Cost Price (₹)", placeholder: "Enter Cost Price", type: "text" },
      { label: "MRP (₹)", placeholder: "Enter MRP", type: "text" },
      { label: "Base Price (₹)", placeholder: "Enter Base Price", type: "text" },
      { label: "Tax Type", placeholder: "Select Tax Type", type: "select" },
      { label: "GST Tax Type", placeholder: "Select GST Tax Type", type: "select" },
    ],
  },
  {
    id: "description",
    title: "PRODUCT DESCRIPTION",
    description: "Description, Dimensions And Other Details About The Product.",
    hasTextArea: true,
    fields: [
      { label: "Length (mm)", placeholder: "Enter Length", type: "text" },
      { label: "Width (mm)", placeholder: "Enter Width", type: "text" },
      { label: "Height (mm)", placeholder: "Enter Height", type: "text" },
      { label: "Weight (g)", placeholder: "Enter Weight", type: "text" },
      { label: "Brand", placeholder: "Enter Brand", type: "text" },
      { label: "Color", placeholder: "Enter Color", type: "text" },
      { label: "Size", placeholder: "Enter Size", type: "text" },
      { label: "Lot Size", placeholder: "0", type: "text" },
      { label: "Scannable Identifier", placeholder: "Enter Scannable Identifier", type: "text" },
      { label: "EAN", placeholder: "Enter EAN", type: "text" },
      { label: "UPC", placeholder: "Enter UPC", type: "text" },
      { label: "ISBN", placeholder: "Enter ISBN", type: "text" },
      { label: "Item Detail Fields", placeholder: "Enter Item Detail Fields", type: "text" },
      { label: "Tags", placeholder: "Enter Tags", type: "text" },
      { label: "TAT", placeholder: "Enter TAT", type: "text" },
    ],
  },
  {
    id: "expiry",
    title: "EXPIRY DETAILS",
    description: "Expiry Details About The Product.",
    fields: [
      { label: "Expirable", placeholder: "From Category", type: "select", required: true },
      { label: "Determine Expiry From", placeholder: "From Category", type: "select", required: true },
      { label: "Shelf Life", placeholder: "Enter Shelf Life", type: "text" },
      { label: "Dispatch Expiry Tolerance", placeholder: "Enter Dispatch Expiry Tolerance", type: "text" },
      { label: "GRN Expiry Tolerance", placeholder: "Enter GRN Expiry Tolerance", type: "text" },
      { label: "Return Expiry Tolerance", placeholder: "Enter Return Expiry Tolerance", type: "text" },
    ],
  },
];

/* =======================
   UI COMPONENTS
======================= */

const SectionHeader = ({ title, description }) => (
  <div className="border-l-4 border-blue-600 pl-4 mb-6">
    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
  </div>
);

const FormField = ({ label, placeholder, type, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      {type === "select" ? (
        <>
          <select
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">{placeholder}</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-2.5 text-slate-400" />
        </>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      )}
    </div>
  </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function AddProductPage() {
  // Instead of next/navigation, we use window.location for navigation in plain React
  const handleProductsClick = () => {
    window.location.href = "/products";
  };

  const handleProductsKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleProductsClick();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb Bar */}
        <main className="flex-1 overflow-y-auto pt-4 pb-24">
          {/* Breadcrumbs */}
          <div className="px-4 sm:px-6 md:px-8 py-4 flex items-center gap-2 text-sm border-b border-slate-200">
            <span
              className="text-slate-500 cursor-pointer font-medium"
              onClick={handleProductsClick}
              tabIndex={0}
              role="button"
              onKeyDown={handleProductsKeyDown}
            >
              Products
            </span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-400">Add Product</span>
          </div>
          <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-8 md:gap-10 lg:gap-12 max-w-full xl:max-w-[1600px] mx-auto">
            {FORM_SECTIONS.map((section, idx) => (
              <React.Fragment key={section.id}>
                <section>
                  <SectionHeader title={section.title} description={section.description} />
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-4
                      gap-x-4
                      md:gap-x-6
                      gap-y-6
                      md:gap-y-8
                      w-full
                    "
                  >
                    {section.hasTextArea && (
                      <div className="col-span-full mb-4">
                        <label className="text-sm font-medium text-slate-700 block mb-1.5">
                          Brief description about the Product
                        </label>
                        <textarea
                          placeholder="Enter brief descriptions about product"
                          className="w-full h-24 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none shadow-sm"
                        />
                      </div>
                    )}
                    {section.fields.map((field, idx2) => (
                      <FormField key={idx2} {...field} />
                    ))}
                  </div>
                </section>
                {/* Visual Dividers */}
                {idx < 2 && <hr className="border-slate-200 mt-8 mb-6" />}
              </React.Fragment>
            ))}
            {/* Optionally, you can add a bundle/agreement section here if needed */}
          </div>
        </main>
        {/* Footer Actions */}
        <footer className="
          fixed bottom-0 right-0 left-0
          bg-slate-50 border-t border-slate-300 p-4
          flex flex-col gap-2
          sm:flex-row sm:justify-end sm:gap-4
          z-20 shadow-lg
        ">
          <button className="w-full sm:w-auto px-6 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-400 hover:bg-white transition-all">
            Reset
          </button>
          <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all">
            Save Details
          </button>
        </footer>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .xl\\:max-w-\\[1600px\\] { max-width: 100vw !important; }
        }
        @media (max-width: 767px) {
          .md\\:gap-x-6 { gap-left: 1rem !important; gap-right: 1rem !important; }
          .md\\:gap-y-8 { gap-top: 1rem !important; gap-bottom: 1rem !important; }
          .md\\:p-8 { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
        textarea, input, select {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}