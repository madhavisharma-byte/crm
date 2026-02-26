import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';

// Hardcoded sample for CHANNEL_CATEGORIES (since channelData.js was missing)
const CHANNEL_CATEGORIES = [
    {
        key: 'marketplaces',
        title: 'Marketplaces',
        items: [
            {
                id: 'flipkart',
                name: 'FLIPKART',
                logo: 'https://logo.clearbit.com/flipkart.com',
            },
            {
                id: 'amazon',
                name: 'AMAZON',
                logo: 'https://logo.clearbit.com/amazon.in',
            },
            {
                id: 'meesho',
                name: 'MEESHO',
                logo: 'https://meesho.com/favicon.ico',
            },
            {
                id: 'myntra',
                name: 'MYNTRA',
                logo: 'https://logo.clearbit.com/myntra.com',
            },
            {
                id: 'ajio',
                name: 'AJIO',
                logo: 'https://logo.clearbit.com/ajio.com',
            },
            {
                id: 'jiomart',
                name: 'JIOMART',
                logo: 'https://logo.clearbit.com/jiomart.com',
            },
        ],
    },
    {
        key: 'b2bchannel',
        title: 'B2B Channel',
        items: [
            {
                id: 'shopify',
                name: 'SHOPIFY',
                logo: 'https://logo.clearbit.com/shopify.com',
            },
            {
                id: 'woocommerce',
                name: 'WOOCOMMERCE',
                logo: 'https://woocommerce.com/wp-content/themes/woocommerce/img/favicon.ico',
            },
            {
                id: 'magento',
                name: 'MAGENTO',
                logo: 'https://logo.clearbit.com/magento.com',
            },
            {
                id: 'wix',
                name: 'WIX',
                logo: 'https://logo.clearbit.com/wix.com',
            }
        ],
    },
    {
        key: 'other',
        title: 'Other Channels',
        items: [
            {
                id: 'offline',
                name: 'OFFLINE',
                logo: 'https://static.thenounproject.com/png/718223-200.png',
            }
        ]
    }
];

const AddChannel = () => {
  const [view, setView] = useState('selection');
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    setView('form');
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-screen overflow-hidden">
      {/* Breadcrumb Header */}
      <div className="px-4 md:px-6 py-3 border-b border-gray-100 flex items-center text-xs text-blue-600 font-medium bg-white">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => setView('selection')}
        >
          Channels
        </span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-500">Add Channel</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {view === 'selection' ? (
          <SelectionView onSelect={handleSelectChannel} />
        ) : (
          <ConfigurationForm channel={selectedChannel} onBack={() => setView('selection')} />
        )}
      </div>
    </div>
  );
};

/* --- SUB-COMPONENT 1: SELECTION GRID --- */
const SelectionView = ({ onSelect }) => (
  <div className="p-4 sm:p-6 md:p-8 max-w-full md:max-w-5xl lg:max-w-7xl mx-auto">
    <div className="flex flex-col xs:flex-row xs:justify-end mb-8">
      <div className="relative w-full xs:w-64 max-w-full">
        <input
          type="text"
          placeholder="Search Channel"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none pr-8"
        />
        {/* Remove lucide-react icons unrelated to visible content */}
        <span className="absolute right-2 top-2 text-gray-400" style={{ pointerEvents: 'none' }}>
          <ChevronDown size={16} style={{ opacity: 0 }} />
        </span>
      </div>
    </div>

    {CHANNEL_CATEGORIES.map((cat) => (
      <section key={cat.key} className="mb-12">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
            {cat.title}
          </h2>
          <button className="ml-auto text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1">
            View All <ChevronDown size={12} />
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            xs:grid-cols-2
            md:grid-cols-4
            lg:grid-cols-6
            gap-5
            sm:gap-6
          "
        >
          {cat.items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="group cursor-pointer flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-blue-200 transition-all duration-200 bg-white"
            >
              <div className="h-12 w-full flex items-center justify-center mb-3">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <p className="text-[11px] text-gray-500 font-medium text-center uppercase tracking-tighter group-hover:text-blue-600">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

/* --- UPDATED CONFIGURATION FORM --- */

const ConfigurationForm = ({ channel, onBack }) => {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="flex flex-col md:flex-row h-full bg-white">
      {/* LEFT INFO PANEL */}
      <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 bg-[#f8fafc] p-4 sm:p-6 flex flex-col gap-6">
        <button
          onClick={onBack}
          className="text-blue-600 flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="h-16 flex items-center justify-center mb-4">
            <img
              src={channel?.logo}
              alt={channel?.name}
              className="max-h-full object-contain"
            />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            {channel?.name || 'Flipkart'}
          </h3>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">
            MARKETPLACE
          </p>
          <div className="text-[11px] text-gray-500 leading-relaxed">
            <p className="font-bold text-gray-700 mb-1 underline">Note:</p>
            Channels are the different ways you sell. On this page you can configure a channel, adding all the setup details to connect a channel with respective orders and API details.
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs Header */}
        <div className="flex flex-wrap border-b border-gray-200 px-4 md:px-8 bg-white">
          {['Settings', 'Connectors'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 md:px-8 py-2 md:py-4 text-sm font-semibold transition-all border-b-2 -mb-[1px] z-10 ${
                activeTab === tab.toLowerCase()
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional Rendering */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'settings' ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 md:space-y-12 bg-white custom-scrollbar">

              {/* 1. GENERAL INFORMATION SECTION */}
              <FormSection title="GENERAL INFORMATION" subtitle="Follow These Instructions On How To Add Channel">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-5">
                  <FormInput label="Channel Name *" value={channel?.name || "FLIPKART"} />
                  <FormInput label="Ledger Name (optional)" />
                  <FormSelect label="Billing Party (optional)" placeholder="select billing party" />
                  <FormSelect label="Business Line(Optional)" placeholder="Select Business Line" />
                  <FormInput label="Default Facility Code (Optional)" />
                  <FormSelect label="Package Type(Optional)" options={['flexible', 'standard']} />
                  <FormSelect label="Deduct Fixed GST On Shipping Charges etc (Optional)" />
                  <FormSelect label="PreDefined Package Splittable (Optional)" />
                  <FormSelect label="Boxing With packslip Enabled (Optional)" />
                  <FormSelect label="Enable Endless Printing On Thermal Printer (Optional)" />
                  <FormSelect label="Image Based Outbound QC at Invoicing Dock (Optional)" />
                  <FormSelect label="Image based return QC *" isRequired />
                  <FormSelect label="Bundle Sorting At Staging Area (Optional)" />
                  <FormSelect label="GstEInvoicing Enabled from NIC Portal (Optional)" />
                  <FormSelect label="Bulk Receive at Invoicing Dock (Optional)" />
                  <FormSelect label="Single Action Invoice Label New (Optional)" />
                  <FormSelect label="Auto Calculate Selling Price (Optional)" />
                  <FormSelect label="Use Discount Groups In SaleOrder (Optional)" />
                  <FormSelect label="Packslip Summary Enabled (Optional)" />
                  <FormSelect label="Create Sale Orders On Hold (Optional)" />
                  <FormSelect label="Batch override at invoicing dock enabled on channel (Optional)" />
                  <FormSelect label="Invoice Adjustment Type(Optional)" />
                  <FormSelect label="Perform Manual Inventory Allocation (Optional)" />
                  <FormSelect label="Print Option(Optional)" />
                  <FormSelect label="Select Printer For Label And Invoice (Optional)" />
                  <FormSelect label="Prefetch Formula (Optional)" />
                  <FormSelect label="Enable Enforced Bundle Sorting (EBS) at Invoicing Dock" options={['None', 'No', 'Yes']} />
                  <FormSelect label="Enable Enforced Bundle Sorting (EBS) at Staging Dock" />
                  <FormSelect label="Minutes To Prefetch From Order Creation (Optional)" />
                  <FormSelect label="TCS Addition Enabled (Optional)" options={['None', 'No', 'Yes']} />
                  <FormSelect label="Enable Sku Printing On Label (Optional)" />
                  <FormSelect label="Prefetch Enabled (Optional)" />
                  <FormSelect label="GstEInvoicing Enabled from NIC Portal (New) (Optional)" options={['None', 'No', 'Yes']} />
                  <FormSelect label="Unrestricted Pool Inventory Sync Over Channel (Optional)" />
                  <FormSelect label="Show Product Details on Label (Optional)" />
                  <FormSelect label="Selling Price Tax *" options={['Off', 'On']} isRequired />
                </div>
              </FormSection>

              {/* 2. ORDER SECTION */}
              <FormSection
                title="ORDER"
                subtitle="This Section Helps Us To Configure Important Parameters For Order Sync. Connectors Will Be Set In Next Tab."
                hasToggle
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-5">
                  <FormSelect label="Auto Verify Orders(Optional)" options={['Yes', 'No']} />
                  <FormInput label="Tat (Hours) (Optional)" value="48" />
                  <FormSelect label="Notify Channel On Dispatch(Optional)" options={['yes', 'no']} />
                  <FormSelect label="Self Invoicing (Optional)" />
                  <FormSelect label="Calculate Discount At MRP (Optional)" />
                  <FormSelect label="Enable Unfulfillable Item Facility Routing (Optional)" />
                  <FormSelect label="Image Based Outbound QC at Staging/Bundling Dock (Optional)" />
                  <FormSelect label="Auto-Picklist Creation Facilities(Optional)" />
                </div>
              </FormSection>

              {/* 3. INVENTORY SECTION */}
              <FormSection
                title="INVENTORY"
                subtitle="Once Inventory Sync Is ON, Uniware Updates Inventory On Channel Periodically"
                hasToggle
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-5">
                  <FormSelect label="Facility Wise Inventory (Optional)" />
                  <FormInput label="Bundle Component Inventory Update Formula (Optional)" />
                </div>
              </FormSection>

              {/* 4. STORE SECTION */}
              <FormSection title="STORE">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-5">
                  <FormInput label="Max hours for Auto hopping *" value="0" isRequired />
                  <FormSelect label="Omni channel orders *" isRequired />
                </div>
              </FormSection>
            </div>
          ) : (
            <ConnectorsView channelName={channel?.name || 'FLIPKART'} />
          )}
        </div>

        {/* Form Footer */}
        {activeTab === 'settings' && (
          <div className="border-t border-gray-100 p-4 md:p-5 flex flex-col sm:flex-row justify-end gap-3 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <button
              onClick={onBack}
              className="px-6 py-2 text-sm font-semibold text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button className="px-7 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
              Save & Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- NEW SUB-COMPONENT: CONNECTORS VIEW --- */
const ConnectorsView = ({ channelName }) => (
  <div className="flex-1 p-0 flex flex-col bg-white overflow-hidden">
    {/* The Blue Bordered Container as per Image */}
    <div className="flex-1 m-[-1px] border border-blue-400 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-1 uppercase">
        {channelName}
      </h2>
      <p className="text-xs text-gray-500 font-medium mb-8">
        Provide Credentials Which You Use To Log Into Seller Panel.
      </p>

      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-6 xs:gap-10">
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          Skip
        </button>

        <button className="flex items-center gap-2 bg-[#3b82f6] hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          Connect
        </button>
      </div>
    </div>
  </div>
);


/* --- SHARED FORM UI COMPONENTS --- */
const FormSection = ({ title, subtitle, children, hasToggle }) => (
  <div className="relative">
    {/* Section Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 border-b border-gray-50 pb-4">
      <div className="flex gap-3 md:gap-4">
        <div className="w-1.5 h-10 bg-blue-600 rounded-full shadow-sm shadow-blue-200" />
        <div>
          <h4 className="text-base font-bold text-gray-800 tracking-tight leading-none mb-1.5 uppercase">
            {title}
          </h4>
          {subtitle && (
            <p className="text-[11px] text-gray-400 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      {hasToggle && (
        <div className="flex items-center gap-1 md:gap-3 mt-4 sm:mt-0">
          <span className="text-[10px] font-bold text-gray-400">Sync(Optional)</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400">OFF</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
            </div>
            <span className="text-[10px] font-bold text-blue-600">ON</span>
          </div>
        </div>
      )}
    </div>
    {/* Section Content */}
    <div className="pl-3 md:pl-6">{children}</div>
  </div>
);

const FormInput = ({ label, value, isRequired }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[11px] font-bold text-gray-500 tracking-wide">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      defaultValue={value}
      className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-xs text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none bg-white transition-all group-hover:border-gray-300"
    />
  </div>
);

const FormSelect = ({ label, options = ['No', 'Yes'], placeholder, isRequired }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[11px] font-bold text-gray-500 tracking-wide">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="w-full appearance-none border border-gray-200 rounded-md px-3.5 py-2.5 text-xs text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none bg-white pr-10 transition-all group-hover:border-gray-300">
        {placeholder && <option disabled selected>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown size={14} />
      </div>
    </div>
  </div>
);

export default AddChannel;