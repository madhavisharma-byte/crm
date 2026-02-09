import React from "react";
import { X, FileText } from "lucide-react";

export default function ImportFileModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Import File</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <button className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95">
                        <FileText size={20} />
                        Choose File
                    </button>

                    <div className="text-[13px]">
                        <span className="text-gray-500 font-medium mr-1.5">Download</span>
                        <button className="text-[#f59e0b] hover:text-[#d97706] font-semibold underline underline-offset-4 decoration-1">
                            Template & Instructions
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-8 py-6 bg-white border-t border-gray-50">
                    <button className="text-[#2b6cee] text-[13px] font-semibold px-4 py-2 rounded-lg bg-[#f0f9ff] hover:bg-[#e0f2fe] transition-colors">
                        Need Help ?
                    </button>

                    <button
                        onClick={onClose}
                        className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1e5bc7] transition-all"
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
}