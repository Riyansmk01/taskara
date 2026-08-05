"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { MilestoneTracker } from "@/components/shared/MilestoneTracker";
import { Milestone, Message } from "@/types";
import {
  Briefcase,
  MessageSquare,
  FileCheck,
  Send,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Paperclip
} from "lucide-react";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "chat" | "files">("overview");

  // Initial Mock Milestones
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "m-1",
      contract_id: "contract-demo",
      title: "Tahap 1: Draft Video Cuts & First Review",
      description: "Pemotongan footage awal dan pemilihan backsound viral TikTok.",
      amount: 250000,
      status: "approved",
      order_index: 1
    },
    {
      id: "m-2",
      contract_id: "contract-demo",
      title: "Tahap 2: Final Editing 5 Video & Subtitle",
      description: "Penambahan efek teks dinamis, motion grafis, dan ekspor MP4 1080p.",
      amount: 500000,
      status: "submitted",
      order_index: 2
    }
  ]);

  // Initial Realtime Messages State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      conversation_id: "conv-1",
      sender_id: "client-3",
      sender: {
        id: "client-3",
        username: "agus_distro",
        full_name: "Agus Setiawan (Klien)",
        role: "client",
        is_verified: true,
        is_active: true,
        created_at: "2025-01-01"
      },
      message_type: "text",
      content: "Halo Mas Rizky! Video draf tahap 1 kemarin sudah bagus banget. Untuk tahap 2 ditunggu ya subtitlenya.",
      created_at: "10:15"
    },
    {
      id: "msg-2",
      conversation_id: "conv-1",
      sender_id: "f-3",
      sender: {
        id: "f-3",
        username: "rizky_video",
        full_name: "Rizky Ramadhan (Freelancer)",
        role: "freelancer",
        is_verified: true,
        is_active: true,
        created_at: "2025-01-01"
      },
      message_type: "text",
      content: "Siap Pak Agus! Hasil editan 5 video tahap 2 sudah selesai saya submit di bagian Milestone. Mohon dicek ya pak.",
      created_at: "10:30"
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: "conv-1",
      sender_id: "f-3",
      sender: {
        id: "f-3",
        username: "rizky_video",
        full_name: "Rizky Ramadhan (Anda)",
        role: "freelancer",
        is_verified: true,
        is_active: true,
        created_at: "2025-01-01"
      },
      message_type: "text",
      content: inputMessage,
      created_at: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
  };

  const handleMilestoneAction = (milestoneId: string, action: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          if (action === "submit") return { ...m, status: "submitted" };
          if (action === "approve") return { ...m, status: "released" };
        }
        return m;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      
      {/* Workspace Header Bar */}
      <div className="border-b border-border bg-surface px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="rounded-xl p-2 text-text-muted hover:bg-surface-soft">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <span className="rounded-pill bg-surface-purple px-2 py-0.5 text-[10px] font-bold text-primary">
                Workspace Proyek Active
              </span>
              <h1 className="font-extrabold text-base text-text-primary mt-0.5">
                Editing 5 Video Short/Reels Promosi Produk Fashion Distro
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-success bg-success-soft px-3 py-1.5 rounded-pill flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Escrow Terisi: {formatRupiah(750000)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-surface/50 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl gap-6 font-semibold text-xs text-text-muted">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 transition border-b-2 ${
              activeTab === "overview" ? "border-primary text-primary" : "border-transparent hover:text-text-primary"
            }`}
          >
            Overview & Milestone
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`py-3 transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "chat" ? "border-primary text-primary" : "border-transparent hover:text-text-primary"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" /> Room Chat Interaktif ({messages.length})
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
                <MilestoneTracker
                  milestones={milestones}
                  userRole="client"
                  onAction={handleMilestoneAction}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-3 text-xs">
                <h4 className="font-bold text-text-primary">Anggota Kontrak</h4>
                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-text-muted">Klien</span>
                  <span className="font-bold text-text-primary">Agus Setiawan</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-text-muted">Freelancer Mahasiswa</span>
                  <span className="font-bold text-primary">Rizky Ramadhan</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === "chat" && (
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface shadow-md overflow-hidden flex flex-col h-[550px]">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-surface-soft flex items-center justify-between">
              <span className="font-bold text-xs text-text-primary">Diskusi Proyek Realtime</span>
              <span className="text-[10px] text-success font-semibold flex items-center gap-1">
                ● Klien Online
              </span>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-soft/30">
              {messages.map((m) => {
                const isMe = m.sender_id === "f-3";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[10px] text-text-muted mb-1 px-1">
                      {m.sender?.full_name} • {m.created_at}
                    </span>
                    <div
                      className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                        isMe
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface border border-border text-text-primary"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-surface flex items-center gap-2">
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white hover:bg-primary-hover transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>
        )}

      </div>

    </div>
  );
}
