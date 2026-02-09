import React from "react";
import { useNavigate } from "react-router-dom";

// Terms rendered as array of objects, unchanged
export const terms = [
  {
    title: "1. Definitions",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <b>Client / User</b>: Any individual or business entity that registers and uses the Platform.
          </li>
          <li>
            <b>Third‑Party Platforms</b>: External marketplaces or services such as Amazon, Flipkart, or similar platforms integrated with the Service.
          </li>
          <li>
            <b>Content & Data</b>: Order details, product information, analytics, reports, and any other data synced or uploaded by the User.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Eligibility",
    content: (
      <p>
        You must be at least 18 years old and legally capable of entering into a binding contract to use this Platform. If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization.
      </p>
    ),
  },
  {
    title: "3. Scope of Service",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Manage and view orders from multiple third‑party marketplaces in one dashboard
          </li>
          <li>
            Organize and manage content, inventory, and order‑related data
          </li>
          <li>
            Generate reports and analytics based on synced data
          </li>
        </ul>
        <p className="mt-2">
          We do <b>not</b> own, operate, or control third‑party platforms, and we are not responsible for their services, availability, or policies.
        </p>
      </>
    ),
  },
  {
    title: "4. Account Registration & Security",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>Users must provide accurate and complete registration information.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>Any activity performed through your account will be deemed as your responsibility.</li>
      </ul>
    ),
  },
  {
    title: "5. Third‑Party Platform Integration",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>By connecting your accounts (e.g., Amazon, Flipkart), you authorize the Platform to access and process relevant data as permitted by those platforms.</li>
        <li>We are not responsible for data inaccuracies, delays, or disruptions caused by third‑party APIs or services.</li>
        <li>Any changes in third‑party platform policies may affect integration features.</li>
      </ul>
    ),
  },
  {
    title: "6. Data Usage & Ownership",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>You retain full ownership of your content and business data.</li>
        <li>You grant us a limited license to process, store, and display your data solely for providing the Service.</li>
        <li>We will not sell your data to third parties.</li>
      </ul>
    ),
  },
  {
    title: "7. User Responsibilities",
    content: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use the Platform for any unlawful or fraudulent activities</li>
          <li>Violate intellectual property rights of others</li>
          <li>Attempt to reverse engineer, hack, or disrupt the Platform</li>
          <li>Upload malicious code or harmful content</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Subscription, Fees & Payments (If Applicable)",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>Certain features may require a paid subscription.</li>
        <li>All fees are non‑refundable unless otherwise stated.</li>
        <li>We reserve the right to modify pricing with prior notice.</li>
      </ul>
    ),
  },
  {
    title: "9. Service Availability",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>We strive to maintain high availability but do not guarantee uninterrupted access.</li>
        <li>Scheduled maintenance or unexpected technical issues may cause temporary downtime.</li>
      </ul>
    ),
  },
  {
    title: "10. Limitation of Liability",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>We shall not be liable for any indirect, incidental, or consequential damages.</li>
        <li>We are not responsible for losses caused by third‑party platform errors, data inaccuracies, or service outages.</li>
      </ul>
    ),
  },
  {
    title: "11. Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless the Platform, its owners, and affiliates from any claims, losses, or damages arising out of your use of the Service or violation of these Terms.
      </p>
    ),
  },
  {
    title: "12. Termination",
    content: (
      <>
        <p>We reserve the right to suspend or terminate your access:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>If you violate these Terms</li>
          <li>If required by law</li>
          <li>For prolonged inactivity or non‑payment</li>
        </ul>
        <p className="mt-2">Upon termination, your access to the Platform will be revoked.</p>
      </>
    ),
  },
  {
    title: "13. Privacy",
    content: (
      <p>
        Your use of the Platform is also governed by our <b>Privacy Policy</b>, which explains how we collect and use your data.
      </p>
    ),
  },
  {
    title: "14. Changes to Terms",
    content: (
      <p>
        We may update these Terms from time to time. Continued use of the Platform after changes implies acceptance of the revised Terms.
      </p>
    ),
  },
  {
    title: "15. Governing Law & Jurisdiction",
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of <b>India</b>, and courts located in India shall have exclusive jurisdiction.
      </p>
    ),
  },
  {
    title: "16. Contact Information",
    content: (
      <div className="space-y-1">
        <p><b>Email:</b> support@[yourdomain].com</p>
        <p><b>Company Name:</b> [Your Company Name]</p>
      </div>
    ),
  },
];

// Utility to format date as "DD MMMM, YYYY"
export function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Render the terms as a page view, no header, with a top and bottom "← Back to Dashboard" button
export default function TermsAndConditions() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex justify-center flex-1">
        <div className="w-full max-w-3xl px-4 py-10 sm:px-8 bg-white rounded-2xl shadow-md my-12">
          {/* Top Back Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-blue-700 hover:underline text-sm font-medium"
            >
              <span aria-hidden="true" className="text-lg">←</span> Back to Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-extrabold mb-1 text-center text-gray-900 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <div className="text-center text-gray-400 text-xs mb-7">
            Last Updated: <span>{getFormattedDate()}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-7">
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Content Resource Management Platform (&quot;Platform&quot;, &quot;Service&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). The Platform enables clients to manage, track, and analyze orders, content, and resources from multiple third‑party marketplaces and platforms such as Amazon, Flipkart, and other integrated services.
            </p>
            <p className="mb-7">
              By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
            </p>
          </div>
          <hr className="my-4 border-dashed" />
          <div>
            {terms.map((section) => (
              <section key={section.title} className="mb-7 last:mb-0">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.title}</h2>
                <div className="text-gray-800 text-[15px]">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
          {/* Bottom Back Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-blue-700 hover:underline text-sm font-medium"
            >
              <span aria-hidden="true" className="text-lg">←</span> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
