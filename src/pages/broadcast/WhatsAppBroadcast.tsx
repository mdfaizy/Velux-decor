import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AlertTriangle, Plus, Send, X } from "lucide-react";
import {
  Broadcast,
  TemplateSummary,
  getTemplatesApi,
  getWhatsAppStatusApi,
  getMessageStatusApi,
  sendTestMessageApi,
  createBroadcastApi,
  getBroadcastsApi,
} from "../../services/broadcastApi";
import { Offer, getOffersApi } from "../../services/offerApi";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "en_US", label: "English (US)" },
  { code: "hi", label: "Hindi" },
];

const STATUS_CLS: Record<Broadcast["status"], string> = {
  sending: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-600",
};

const WhatsAppBroadcast = () => {
  const [status, setStatus] = useState<{ configured: boolean; optedIn: number } | null>(null);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  // null = list not available, type the template name instead
  const [templates, setTemplates] = useState<TemplateSummary[] | null>(null);

  const [templateName, setTemplateName] = useState("");
  const [language, setLanguage] = useState("en");
  const [params, setParams] = useState<string[]>(["{{name}}", ""]);
  const [headerImage, setHeaderImage] = useState("");
  const [testPhone, setTestPhone] = useState("");

  const [testing, setTesting] = useState(false);
  // delivery of the last test message, as reported by Meta's webhook
  const [testWamid, setTestWamid] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<{ status: string; error?: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [openFailures, setOpenFailures] = useState<string | null>(null);

  const loadStatus = () =>
    getWhatsAppStatusApi()
      .then((res) => setStatus(res.data))
      .catch(() => toast.error("Failed to load WhatsApp status ❌"));

  const loadBroadcasts = () =>
    getBroadcastsApi()
      .then((res) => setBroadcasts(res.data || []))
      .catch((err) => console.log(err));

  useEffect(() => {
    loadStatus();
    loadBroadcasts();
    getOffersApi()
      .then((res) => setOffers(res.data || []))
      .catch((err) => console.log(err));
    getTemplatesApi()
      .then((res) => setTemplates(res.data))
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Couldn't load templates from WhatsApp ❌");
      });
  }, []);

  const selectedTemplate = templates?.find(
    (t) => t.name === templateName && t.language === language
  );

  const selectTemplate = (key: string) => {
    const t = templates?.find((x) => `${x.name}|${x.language}` === key);
    setTemplateName(t?.name || "");
    setLanguage(t?.language || "en");
    setParams(Array(t?.variableCount || 0).fill(""));
    setHeaderImage("");
  };

  // body text with the entered values, for the preview bubble
  const previewBody = selectedTemplate?.body.replace(/\{\{(\d+)\}\}/g, (match, n) => {
    const value = params[Number(n) - 1]?.trim();
    return value ? value.replace(/\{\{\s*name\s*\}\}/gi, "Rahul") : match;
  });

  // follow the test message for up to 1 minute
  useEffect(() => {
    if (!testWamid) return;
    let tries = 0;
    const t = setInterval(async () => {
      tries++;
      try {
        const res = await getMessageStatusApi(testWamid);
        setTestStatus(res.data);
        if (["read", "failed"].includes(res.data.status) || tries >= 20) clearInterval(t);
      } catch {
        clearInterval(t);
      }
    }, 3000);
    return () => clearInterval(t);
  }, [testWamid]);

  // live progress while a broadcast is sending
  const isSending = broadcasts.some((b) => b.status === "sending");
  useEffect(() => {
    if (!isSending) return;
    const t = setInterval(loadBroadcasts, 3000);
    return () => clearInterval(t);
  }, [isSending]);

  const message = {
    templateName: templateName.trim(),
    language,
    params: params.map((p) => p.trim()),
    headerImage: headerImage.trim() || undefined,
  };

  const validate = () => {
    if (!message.templateName) {
      toast.warning("Enter the approved template name ⚠️");
      return false;
    }
    if (message.params.some((p) => !p)) {
      toast.warning("Fill in every variable, or remove the empty ones ⚠️");
      return false;
    }
    if (selectedTemplate?.headerFormat === "IMAGE" && !message.headerImage) {
      toast.warning("This template needs a header image URL ⚠️");
      return false;
    }
    return true;
  };

  const setParam = (i: number, value: string) =>
    setParams(params.map((p, idx) => (idx === i ? value : p)));

  const fillFromOffer = (offerId: string) => {
    const offer = offers.find((o) => o._id === offerId);
    if (!offer) return;
    const text = offer.title ? `${offer.title} – ${offer.text}` : offer.text;
    // put the offer in the first variable that isn't the name
    const idx = params.findIndex((p) => !/\{\{\s*name\s*\}\}/i.test(p));
    setParams(idx === -1 ? [...params, text] : params.map((p, i) => (i === idx ? text : p)));
  };

  const handleTest = async () => {
    if (!validate()) return;
    if (!testPhone.trim()) {
      toast.warning("Enter a number to send the test to ⚠️");
      return;
    }
    try {
      setTesting(true);
      const res = await sendTestMessageApi({ ...message, phone: testPhone });
      toast.success("Accepted by WhatsApp — checking delivery…");
      setTestStatus({ status: "accepted" });
      setTestWamid(res.data?.wamid || null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Test failed ❌", { autoClose: 8000 });
    } finally {
      setTesting(false);
    }
  };

  const handleSendAll = async () => {
    try {
      setSending(true);
      await createBroadcastApi(message);
      toast.success("Sending started 🚀");
      setConfirming(false);
      loadBroadcasts();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to start sending ❌");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";
  const disabled = !status?.configured;

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">WhatsApp Broadcast</h2>
        <p className="text-gray-500 text-sm">
          Send an offer to every customer who opted in to WhatsApp messages, in one click.
        </p>
      </div>

      {/* ===== NOT CONNECTED ===== */}
      {status && !status.configured && (
        <div className="flex gap-3 p-5 rounded-2xl border border-yellow-300 bg-yellow-50 text-sm text-yellow-900">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div className="space-y-2">
            <p className="font-semibold">WhatsApp is not connected yet</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Create a WhatsApp Business account in Meta Business Manager and add your business phone number.</li>
              <li>Create a <b>Marketing</b> message template (e.g. "Hi {"{{1}}"}, {"{{2}}"}") and wait for Meta's approval.</li>
              <li>Add <code>WHATSAPP_TOKEN</code> and <code>WHATSAPP_PHONE_NUMBER_ID</code> to the server's environment settings and restart it.</li>
            </ol>
          </div>
        </div>
      )}

      {/* ===== COMPOSE ===== */}
      <div className="bg-white p-8 rounded-2xl shadow border space-y-6">
        {templates ? (
          <div>
            <label className="text-sm font-medium text-gray-700">
              Message Template <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedTemplate ? `${selectedTemplate.name}|${selectedTemplate.language}` : ""}
              onChange={(e) => selectTemplate(e.target.value)}
              className={inputCls}
            >
              <option value="">Choose an approved template…</option>
              {templates.map((t) => (
                <option key={`${t.name}|${t.language}`} value={`${t.name}|${t.language}`}>
                  {t.name} · {t.language} · {t.category.toLowerCase()}
                  {t.variableCount ? ` · ${t.variableCount} variable${t.variableCount > 1 ? "s" : ""}` : ""}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Only templates approved by Meta are listed. Create new ones in WhatsApp Manager.
            </p>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Approved Template Name <span className="text-red-500">*</span>
            </label>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. festive_offer"
              className={inputCls}
            />
            <p className="text-xs text-gray-500 mt-1">Exactly as shown in Meta WhatsApp Manager</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Template Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label} ({l.code})</option>
              ))}
            </select>
          </div>
        </div>
        )}

        {/* WHATSAPP-STYLE PREVIEW */}
        {selectedTemplate && (
          <div className="rounded-xl p-4" style={{ background: "#E5DDD5" }}>
            <div className="max-w-sm bg-white rounded-lg shadow-sm p-3 text-sm space-y-2">
              {selectedTemplate.headerFormat === "IMAGE" && (
                headerImage ? (
                  <img src={headerImage} className="w-full h-36 object-cover rounded" />
                ) : (
                  <div className="w-full h-24 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    Header image
                  </div>
                )
              )}
              {selectedTemplate.header && <p className="font-semibold">{selectedTemplate.header}</p>}
              <p className="whitespace-pre-line text-gray-800">{previewBody}</p>
              {selectedTemplate.footer && <p className="text-xs text-gray-500">{selectedTemplate.footer}</p>}
            </div>
            <p className="text-xs text-gray-600 mt-2">Preview — {"{{name}}"} is shown as "Rahul"</p>
          </div>
        )}

        {/* VARIABLES */}
        {(!templates || (selectedTemplate && selectedTemplate.variableCount > 0)) && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <p className="text-sm font-medium text-gray-700">Template Variables</p>
            {offers.length > 0 && (
              <select
                value=""
                onChange={(e) => fillFromOffer(e.target.value)}
                className="border px-3 py-1.5 rounded-lg text-sm"
              >
                <option value="">Fill from an offer…</option>
                {offers.map((o) => (
                  <option key={o._id} value={o._id}>{o.title || o.text}</option>
                ))}
              </select>
            )}
          </div>
          <div className="space-y-2">
            {params.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-12 text-sm font-mono text-gray-500 shrink-0">{`{{${i + 1}}}`}</span>
                <input
                  value={p}
                  onChange={(e) => setParam(i, e.target.value)}
                  placeholder="Value"
                  className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {/* variable count is fixed when the template comes from Meta */}
                {!templates && (
                  <button
                    type="button"
                    onClick={() => setParams(params.filter((_, idx) => idx !== i))}
                    className="p-2 rounded hover:bg-red-50 text-red-600"
                    aria-label="Remove variable"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!templates && (
            <button
              type="button"
              onClick={() => setParams([...params, ""])}
              className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <Plus size={14} /> Add variable
            </button>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {templates ? "Fill in each blank of the template." : "Add one value per variable in your template, in order."}{" "}
            Type <code>{"{{name}}"}</code> to insert each customer's first name.
          </p>
        </div>
        )}

        {(!templates || selectedTemplate?.headerFormat === "IMAGE") && (
        <div>
          <label className="text-sm font-medium text-gray-700">
            Header Image URL{" "}
            {templates ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="text-gray-400 font-normal">(only if your template has an image header)</span>
            )}
          </label>
          <input
            value={headerImage}
            onChange={(e) => setHeaderImage(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className={inputCls}
          />
        </div>
        )}

        {/* TEST */}
        <div className="p-4 rounded-xl bg-gray-50 border">
          <p className="text-sm font-medium text-gray-700 mb-2">1. Send yourself a test first</p>
          <div className="flex flex-wrap gap-2">
            <input
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="Your WhatsApp number"
              className="flex-1 min-w-[180px] border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            />
            <button
              onClick={handleTest}
              disabled={disabled || testing}
              className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              {testing ? "Sending..." : "Send test"}
            </button>
          </div>
          {testStatus && (
            <p
              className={`mt-2 text-sm ${
                testStatus.status === "failed"
                  ? "text-red-600"
                  : ["delivered", "read"].includes(testStatus.status)
                  ? "text-green-700"
                  : "text-gray-600"
              }`}
            >
              {{
                accepted: "⏳ Accepted by WhatsApp, waiting for delivery report…",
                sent: "⏳ Sent, waiting for the phone to receive it…",
                delivered: "✅ Delivered to the phone",
                read: "✅ Delivered and read",
                failed: `❌ Not delivered — ${testStatus.error}`,
              }[testStatus.status] || testStatus.status}
            </p>
          )}
        </div>

        {/* SEND ALL */}
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-sm font-medium text-gray-700 mb-1">2. Send to all opted-in customers</p>
          <p className="text-xs text-gray-600 mb-3">
            {status ? status.optedIn.toLocaleString() : "…"} customers have opted in.{" "}
            <Link to="/dashboard/customers" className="text-blue-600 hover:underline">Manage customers</Link>
          </p>

          {!confirming ? (
            <button
              onClick={() => validate() && setConfirming(true)}
              disabled={disabled || !status?.optedIn || isSending}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              <Send size={16} />
              {isSending ? "A broadcast is sending…" : `Send to ${status?.optedIn.toLocaleString() ?? 0} customers`}
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-800">
                Send "{message.templateName}" to {status?.optedIn.toLocaleString()} customers now? This can't be undone.
              </span>
              <button
                onClick={handleSendAll}
                disabled={sending}
                className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {sending ? "Starting..." : "Yes, send"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="px-5 py-2 rounded-lg border bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== HISTORY ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recent Broadcasts</h3>
        </div>
        {broadcasts.length === 0 ? (
          <p className="px-5 py-6 text-center text-sm text-gray-500">Nothing sent yet</p>
        ) : (
          <div className="divide-y">
            {broadcasts.map((b) => {
              const done = b.sent + b.failed;
              const pct = b.total ? Math.round((done / b.total) * 100) : 0;
              return (
                <div key={b._id} className="p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-800">{b.templateName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(b.createdAt).toLocaleString()}
                        {b.createdBy?.name && ` · by ${b.createdBy.name}`}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_CLS[b.status]}`}>
                      {b.status === "failed" && done < b.total ? "Interrupted" : b.status}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden flex">
                    <div className="bg-green-500" style={{ width: `${b.total ? (b.sent / b.total) * 100 : 0}%` }} />
                    <div className="bg-red-400" style={{ width: `${b.total ? (b.failed / b.total) * 100 : 0}%` }} />
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    <span>{pct}% done</span>
                    <span className="text-green-700">{b.sent.toLocaleString()} sent</span>
                    <span className="text-green-700">{(b.delivered || 0).toLocaleString()} delivered</span>
                    <span className="text-blue-700">{(b.read || 0).toLocaleString()} read</span>
                    <span className="text-red-600">{b.failed.toLocaleString()} failed</span>
                    <span>{b.total.toLocaleString()} total</span>
                    {b.failures.length > 0 && (
                      <button
                        onClick={() => setOpenFailures(openFailures === b._id ? null : b._id)}
                        className="text-blue-600 hover:underline"
                      >
                        {openFailures === b._id ? "Hide errors" : "Show errors"}
                      </button>
                    )}
                  </div>

                  {openFailures === b._id && (
                    <ul className="text-xs bg-red-50 border border-red-100 rounded-lg p-3 space-y-1 max-h-48 overflow-y-auto">
                      {b.failures.map((f, i) => (
                        <li key={i}><span className="font-mono">+{f.phone}</span> — {f.error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppBroadcast;
