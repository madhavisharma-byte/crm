import React, { useState } from "react";
import { Plus, X, Loader } from "lucide-react";
import api from '../utils/api';

// --- AddInventory Form Component ---
export default function AddInventory({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    customerGroup: "",
    // platform removed
    price: "",
    sellingPrice: "",
    costPrice: "",
    stockQty: "",
    paymentMethod: [], // Now allows multiple selections
    amazonSku: "",
    flipkartSku: "",
    meeshoSku: "",
    otherSku: "",
    description: "",
    // media: null, // to handle uploaded file in real app
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  // Handlers
  function handleInput(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  // Handle changes for multi-select Payment Method
  function handlePaymentMethodsChange(e) {
    const options = Array.from(e.target.options);
    const values = options.filter(opt => opt.selected).map(opt => opt.value);
    setFormData((prev) => ({ ...prev, paymentMethod: values }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.productName ||
        !formData.sku ||
        !formData.sellingPrice ||
        !formData.costPrice ||
        !formData.paymentMethod ||
        formData.paymentMethod.length === 0
      ) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // Prepare inventory data for API
      const inventoryData = {
        sku: formData.sku,
        title: formData.productName,
        // platform removed
        quantity: parseInt(formData.stockQty) || 0,
        price: parseFloat(formData.sellingPrice) || 0,
        metadata: {
          category: formData.category,
          customerGroup: formData.customerGroup,
          mrp: formData.price,
          costPrice: formData.costPrice,
          paymentMethod: formData.paymentMethod, // Array
          amazonSku: formData.amazonSku,
          flipkartSku: formData.flipkartSku,
          meeshoSku: formData.meeshoSku,
          otherSku: formData.otherSku,
          description: formData.description,
        },
      };

      // Call API to save inventory item
      const response = await api.post("/inventory", inventoryData);

      if (response.data && response.data.item) {
        // Reset form
        setFormData({
          productName: "",
          sku: "",
          category: "",
          customerGroup: "",
          // platform removed
          price: "",
          sellingPrice: "",
          costPrice: "",
          stockQty: "",
          paymentMethod: [],
          amazonSku: "",
          flipkartSku: "",
          meeshoSku: "",
          otherSku: "",
          description: "",
        });

        // Call success callback
        if (onSuccess) {
          onSuccess(response.data.item);
        }

        // Close form
        if (onClose) {
          onClose();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save inventory item. Please try again.");
      console.error("Error saving inventory:", err);
    } finally {
      setLoading(false);
    }
  }

  // Form content
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
          <div className="flex gap-3">
            <div className="mt-1 bg-blue-50 p-2 rounded-md text-blue-600">
              <Plus size={16} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Add New Inventory Item</h2>
              <p className="text-sm text-gray-500">Fill in the details below to add a new product to inventory.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Scrollable Form Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="col-span-2 bg-white">
              {/* Product Details */}
              <div className="flex items-center mb-7">
                <div className="p-2 rounded bg-blue-50 text-blue-600 mr-2">
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth={2}
                      strokeLinecap="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
              </div>
              <div className="space-y-9">
                {/* SECTION: Basic Details */}
                <section>
                  <SectionHeader title="Basic Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Product Name"
                      value={formData.productName}
                      required
                      placeholder="Product Name"
                      onChange={(e) => handleInput("productName", e.target.value)}
                    />
                    <InputGroup
                      label="SKU"
                      value={formData.sku}
                      required
                      placeholder="SKU e.g. 123524"
                      onChange={(e) => handleInput("sku", e.target.value)}
                    />
                    <SelectGroup
                      label="Category"
                      value={formData.category}
                      options={[
                        "Electronics",
                        "Groceries",
                        "Books",
                        "Clothing",
                        "Beauty",
                        "Furniture",
                        "Other",
                      ]}
                      onChange={(e) =>
                        handleInput("category", e.target.value)
                      }
                    />
                    {/* Platform removed from basic details */}
                    <SelectGroup
                      label="Customer Group"
                      value={formData.customerGroup}
                      options={[
                        "Retail Customer",
                        "Wholesale",
                        "VIP",
                        "Other",
                      ]}
                      onChange={(e) =>
                        handleInput("customerGroup", e.target.value)
                      }
                    />
                  </div>
                </section>
                {/* SECTION: Pricing & Inventory */}
                <section>
                  <SectionHeader title="Pricing & Inventory" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Price (MRP)"
                      placeholder="eg ₹2000.00"
                      value={formData.price}
                      onChange={(e) =>
                        handleInput("price", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Selling Price"
                      value={formData.sellingPrice}
                      required
                      placeholder="Selling Price"
                      onChange={(e) =>
                        handleInput("sellingPrice", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Cost Price"
                      value={formData.costPrice}
                      required
                      placeholder="Cost Price"
                      onChange={(e) =>
                        handleInput("costPrice", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Stock Quantity"
                      type="number"
                      placeholder="0"
                      value={formData.stockQty}
                      onChange={(e) =>
                        handleInput("stockQty", e.target.value)
                      }
                    />
                    <div className="md:col-span-2">
                      <MultiSelectGroup
                        label="Payment Method"
                        required
                        value={formData.paymentMethod}
                        options={[
                          "Cash",
                          "Card",
                          "Bank Transfer",
                          "UPI",
                          "Other",
                        ]}
                        onChange={handlePaymentMethodsChange}
                      />
                    </div>
                  </div>
                </section>
                {/* SECTION: Marketplace Mapping */}
                <section>
                  <SectionHeader title="Marketplace Mapping" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Amazon SKU"
                      value={formData.amazonSku}
                      placeholder="Amazon SKU"
                      onChange={(e) =>
                        handleInput("amazonSku", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Flipkart SKU"
                      value={formData.flipkartSku}
                      placeholder="Flipkart SKU"
                      onChange={(e) =>
                        handleInput("flipkartSku", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Meesho SKU"
                      value={formData.meeshoSku}
                      placeholder="Meesho SKU"
                      onChange={(e) =>
                        handleInput("meeshoSku", e.target.value)
                      }
                    />
                    <InputGroup
                      label="Other SKU"
                      value={formData.otherSku}
                      placeholder="Other Marketplace SKU"
                      onChange={(e) =>
                        handleInput("otherSku", e.target.value)
                      }
                    />
                  </div>
                </section>
              </div>
            </div>
            {/* Media & Description */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm sticky top-16 p-8 flex flex-col gap-6">
              <SectionHeader title="Media & Description" />
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-gray-200 text-gray-500 rounded p-2 mb-3">
                  <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    />
                    <rect
                      x={7}
                      y={16}
                      width={10}
                      height={4}
                      rx={1.3}
                      fill="currentColor"
                      fillOpacity="0.18"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-3">
                  No product media added yet
                </p>
                <button
                  type="button"
                  className="bg-white border border-gray-300 text-gray-600 px-4 py-1.5 rounded text-xs hover:bg-gray-50 transition"
                >
                  Upload Media
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-3 min-h-[100px] bg-gray-50 text-sm placeholder-gray-500 focus:ring-0 resize-none focus:outline-none"
                  placeholder="Write Description"
                  value={formData.description}
                  onChange={(e) => handleInput("description", e.target.value)}
                ></textarea>
              </div>
              <div>
                <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
                  + Add Custom Item
                </a>
              </div>
            </div>
          </div>
          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Inventory"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Helper UI Components ---
function InputGroup({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
  disabled = false,
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + className}>
      <label className="text-xs font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
          disabled ? "bg-gray-50 cursor-not-allowed" : "text-gray-700"
        }`}
        required={required}
        disabled={disabled}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

// MultiSelectGroup for Payment Method
function MultiSelectGroup({
  label,
  options,
  value = [],
  onChange,
  className = "",
  required = false,
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + className}>
      <label className="text-xs font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        multiple
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-700 bg-white"
        value={value}
        onChange={onChange}
        required={required}
        size={options?.length > 3 ? options.length : 4}
      >
        {(options || []).map((opt, i) => (
          <option key={i} value={typeof opt === "object" ? opt.value : opt}>
            {typeof opt === "object" ? opt.label : opt}
          </option>
        ))}
      </select>
      <span className="text-xs text-gray-500">{value.length === 0 ? "Select one or more methods" : value.join(", ")}</span>
    </div>
  );
}

function SelectGroup({
  label,
  options,
  value,
  onChange,
  className = "",
  required = false,
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + className}>
      <label className="text-xs font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-700 bg-white"
        value={value || ""}
        onChange={onChange}
        required={required}
      >
        <option value="">{`Select ${label}`}</option>
        {(options || []).map((opt, i) =>
          typeof opt === "object" ? (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={i} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1 h-4 bg-blue-600 mr-3 rounded-full"></div>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}
