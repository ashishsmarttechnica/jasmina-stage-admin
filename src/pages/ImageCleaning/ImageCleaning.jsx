import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const path = {
  basename: (p) => {
    if (!p) return "";
    return p.split(/[\\/]/).pop() || "";
  },
};

const ImageCleaning = () => {
  const [mongoUrl, setMongoUrl] = useState("mongodb://localhost:27017");
  const [dbName, setDbName] = useState("");
  const [storageType, setStorageType] = useState("local");
  const [storagePath, setStoragePath] = useState("E:/Smarttechnica-Backend/uploads");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [deleteEndpoint, setDeleteEndpoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [resultError, setResultError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedOrphans, setSelectedOrphans] = useState([]);

  const results = resultData?.results || [];
  const orphanFiles = resultData?.orphanFiles || [];
  const stats = useMemo(() => {
    if (resultData?.stats) return resultData.stats;
    return {
      totalCollections: 0,
      totalDocuments: 0,
      totalDbPaths: results.length,
      validFiles: results.filter((r) => r.exists).length,
      missingFiles: results.filter((r) => !r.exists).length,
      orphanFiles: orphanFiles.length,
      totalStorageFiles: 0,
      matchPercentage: 0,
    };
  }, [resultData, results, orphanFiles]);

  const effectiveStorageType = resultData?.storageType || storageType;

  const handleStorageTypeChange = (type) => {
    setStorageType(type);
    if (type === "local") {
      setStoragePath((prev) => prev || "E:/Smarttechnica-Backend/uploads");
    } else {
      setStoragePath((prev) => (prev.startsWith("http") ? prev : "http://"));
    }
  };

  const toggleAdvanced = () => setShowAdvanced((prev) => !prev);

  const startScan = async () => {
    setResultError("");
    setResultData(null);
    setSelectedOrphans([]);

    const trimmedDb = dbName.trim();
    const trimmedPath = storagePath.trim();

    if (!trimmedDb || !trimmedPath) {
      setResultError("⚠️ Warning: Please enter both Database name and Storage path.");
      return;
    }

    if (
      storageType === "remote" &&
      !trimmedPath.startsWith("http://") &&
      !trimmedPath.startsWith("https://")
    ) {
      setResultError("⚠️ Warning: Remote storage path must start with http:// or https://");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SERVERURL}/api/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mongoUrl: mongoUrl.trim(),
          dbName: trimmedDb,
          storagePath: trimmedPath,
        }),
      });

      const data = await resp.json().catch(() => {
        throw new Error("Invalid JSON response from server");
      });

      if (!data || !data.success) {
        throw new Error(data?.error || "Unknown server error");
      }

      setResultData(data);
      setResultError("");
    } catch (err) {
      setResultError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrphans(orphanFiles.map((f) => f.relativePath || "").filter(Boolean));
    } else {
      setSelectedOrphans([]);
    }
  };

  const handleOrphanToggle = (value, checked) => {
    setSelectedOrphans((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return Array.from(next);
    });
  };

  const deleteSelectedOrphans = async () => {
    if (!selectedOrphans.length) {
      alert("No files selected");
      return;
    }

    if (
      !window.confirm(
        `⚠️ WARNING: Only delete media files (images, videos, audio). Do not delete any other files.\n\nDelete ${selectedOrphans.length} orphan file(s)? This cannot be undone.`
      )
    ) {
      return;
    }

    setDeleteLoading(true);

    try {
      const payload = {
        storagePath: storagePath.trim(),
        files: selectedOrphans,
      };

      if (deleteEndpoint.trim()) {
        payload.deleteEndpoint = deleteEndpoint.trim();
      }

      const resp = await fetch(`${import.meta.env.VITE_SERVERURL}/api/delete-orphans`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!data.success) {
        throw new Error(data.error || "Delete failed");
      }

      let message = `✅ Successfully deleted: ${data.stats.deleted} file(s)`;
      if (data.stats.failed > 0) {
        message += `\n\n❌ Failed to delete: ${data.stats.failed} file(s)`;
        if (data.failed?.length) {
          message +=
            "\n\nFailed files:\n" +
            data.failed.map((f) => `• ${f.file}: ${f.reason || "Unknown error"}`).join("\n");
        }
      }

      alert(message);
      setSelectedOrphans([]);
      if (data.stats.deleted > 0) {
        startScan();
      }
    } catch (err) {
      alert("Delete error: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const allOrphansSelected =
    orphanFiles.length > 0 && selectedOrphans.length === orphanFiles.filter((f) => f.relativePath).length;

  return (
    <>
      <PageTitle title="Image Cleaning | SmartTechnica" />
      <DefaultLayout>
        <Breadcrumb pageName="Image Cleaning" />
        <div className="">
          <div className="mx-auto max-w-4xl rounded-sm dark:bg-boxdark bg-white/95 p-6 shadow-md sm:p-10">
            <div className="border-b border-slate-200 pb-6 text-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">📊 MongoDB File Scanner</h2>
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-white">
                Scan your MongoDB database for file references and verify storage integrity
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-white">MongoDB Connection URL</label>
                <input
                  type="text"
                  placeholder="mongodb://localhost:27017"
                  value={mongoUrl}
                  onChange={(e) => setMongoUrl(e.target.value)}
                  className="w-full rounded-2xl dark:bg-boxdark border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:text-white transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-white">Database Name</label>
                <input
                  type="text"
                  placeholder="Enter your database name"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="w-full rounded-2xl dark:bg-boxdark border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:text-white transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-white">Storage Type</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleStorageTypeChange("local")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition ${storageType === "local"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
                      }`}
                  >
                    📁 Local Storage
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStorageTypeChange("remote")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition ${storageType === "remote"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                      : "border-slate-200 dark:bg-boxdark bg-slate-50 text-slate-600 dark:text-white hover:border-indigo-300"
                      }`}
                  >
                    🌐 Remote Storage (HTTP/HTTPS)
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-white">
                  Storage Base Path{" "}
                  <span className="text-xs font-medium text-slate-500 dark:text-white">
                    {storageType === "local"
                      ? "(e.g., E:/uploads or /var/www/uploads)"
                      : "(e.g., http://example.com/uploads)"}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={
                    storageType === "local" ? "E:/Smarttechnica-Backend/uploads" : "http://example.com/uploads"
                  }
                  value={storagePath}
                  onChange={(e) => setStoragePath(e.target.value)}
                  className="w-full rounded-2xl dark:bg-boxdark border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:text-white transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="rounded-2xl border border-slate-100 dark:bg-boxdark bg-slate-50/60 p-5">
                <button
                  type="button"
                  onClick={toggleAdvanced}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-indigo-600 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    {showAdvanced ? "▼" : "▶"} Advanced Options
                  </span>
                  <span className="text-xs text-slate-500 dark:text-white">Optional</span>
                </button>

                <div className={`mt-4 space-y-4 ${showAdvanced ? "block" : "hidden"}`}>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-white">
                      Custom Delete Endpoint{" "}
                      <span className="text-xs font-medium text-slate-500 dark:text-white">
                        (Optional - for remote storage with custom delete API)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder={`${import.meta.env.VITE_SERVERURL}/api/delete-file`}
                      value={deleteEndpoint}
                      onChange={(e) => setDeleteEndpoint(e.target.value)}
                      className="w-full rounded-2xl border-2 border-slate-200 dark:bg-boxdark bg-white px-4 py-3 text-sm text-slate-700 dark:text-white transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="rounded-2xl border-l-4 border-sky-500 dark:bg-boxdark bg-sky-50/80 p-4 text-sm text-sky-800 dark:text-white">
                    <strong>💡 Tip:</strong> If your server doesn&apos;t support HTTP DELETE, provide your custom endpoint
                    here. The scanner will automatically try multiple deletion methods.
                  </div>
                </div>
              </div>

              <button
                onClick={startScan}
                disabled={loading}
                className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-blue-600 w-full text-center text-white hover:bg-blue-700 rounded-md transition-all text-md font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    <span>Scanning database and storage…</span>
                  </>
                ) : (
                  <>
                    <span role="img" aria-label="search">
                      🔍
                    </span>
                    <span>Start Scan</span>
                  </>
                )}
              </button>

              {loading && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:bg-boxdark bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-white">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 dark:border-indigo-200 border-t-indigo-500 dark:border-t-indigo-500" />
                  <span>Scanning database and storage — this may take a while for large datasets...</span>
                </div>
              )}

              {resultError && (
                <div className="rounded-2xl border-l-4 border-rose-500 dark:bg-boxdark bg-rose-50 p-4 text-sm font-semibold text-rose-600 dark:text-white">
                  {resultError}
                </div>
              )}

              {resultData && (
                <div className="mt-10 space-y-8">
                  <div className="rounded-3xl border-l-4 border-indigo-500 dark:bg-boxdark bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-lg">
                    <div className="text-xl font-bold text-slate-800">📊 Scan Summary</div>

                    <div className="mt-5 rounded-2xl dark:bg-boxdark bg-white/80 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-6">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white">Database</div>
                          <div className="text-lg font-bold text-slate-800">
                            {stats.totalCollections} Collections • {stats.totalDocuments} Documents
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white">
                            Storage Type
                          </div>
                          <div className="text-lg font-bold text-slate-800 dark:text-white">
                            {effectiveStorageType === "remote" ? "🌐 Remote" : "📁 Local"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white">
                            Match Rate
                          </div>
                          <div
                            className={`text-lg font-bold dark:text-white ${stats.matchPercentage >= 80
                              ? "text-emerald-600"
                              : stats.matchPercentage >= 50
                                ? "text-amber-600"
                                : "text-rose-600"
                              }`}
                          >
                            {stats.matchPercentage}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        { label: "File Refs in DB", value: stats.totalDbPaths, color: "text-indigo-600" },
                        { label: "Matching Files", value: stats.validFiles, color: "text-emerald-600" },
                        { label: "Missing in Storage", value: stats.missingFiles, color: "text-rose-600" },
                        { label: "Total Files in Storage", value: stats.totalStorageFiles, color: "text-purple-600" },
                        { label: "Orphan Files", value: stats.orphanFiles, color: "text-amber-600" },
                        {
                          label: "System Health",
                          value:
                            stats.validFiles === stats.totalDbPaths && stats.orphanFiles === 0 ? "✓ Check" : "⚠️ Warning",
                          color:
                            stats.validFiles === stats.totalDbPaths && stats.orphanFiles === 0
                              ? "text-emerald-600"
                              : "text-slate-500",
                        },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl dark:bg-boxdark bg-white/90 p-4 shadow-sm">
                          <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border-2 border-slate-100 dark:bg-boxdark bg-white p-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">📁 Database File References</h3>
                      <span className="rounded-full bg-indigo-500 px-3 py-1 text-sm font-semibold text-white">
                        {results.length}
                      </span>
                    </div>

                    {!results.length ? (
                      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 dark:bg-boxdark px-6 py-10 text-center text-sm italic text-slate-500 dark:text-white">
                        No file references found in database
                      </div>
                    ) : (
                      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:bg-boxdark">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="bg-slate-900 dark:bg-boxdark text-left text-xs font-semibold uppercase tracking-wide text-white">
                              <th className="px-4 py-3">Collection</th>
                              <th className="px-4 py-3">Field</th>
                              <th className="px-4 py-3">DB Path</th>
                              <th className="px-4 py-3">File Name</th>
                              <th className="px-4 py-3">Server Path</th>
                              <th className="px-4 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.map((r, idx) => {
                              const dbPath = r.dbPath || "";
                              const fileName = r.fileName || path.basename(dbPath);
                              return (
                                <tr
                                  key={idx}
                                  className="border-b border-slate-100 dark:bg-boxdark bg-white text-slate-700 last:border-none hover:bg-slate-50/80"
                                >
                                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{r.collection || ""}</td>
                                  <td className="px-4 py-3">{r.field || ""}</td>
                                  <td className="px-4 py-3">
                                    <span className="font-mono text-xs text-slate-600 dark:text-white">{dbPath}</span>
                                  </td>
                                  <td className="px-4 py-3">{fileName || ""}</td>
                                  <td className="px-4 py-3">
                                    <span className="font-mono text-xs text-slate-600 dark:text-white">{r.serverFilePath || ""}</span>
                                  </td>
                                  <td
                                    className={`px-4 py-3 font-semibold dark:text-white ${r.exists ? "text-emerald-600" : "text-rose-600"
                                      }`}
                                  >
                                    {r.exists ? "✓ Exists" : "✗ Missing"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-800">⚠️ Orphan Files (Not in Database)</h3>
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                        {orphanFiles.length}
                      </span>
                    </div>

                    {!orphanFiles.length ? (
                      <div className="mt-6 rounded-2xl border border-dashed border-amber-200 px-6 py-10 text-center text-sm font-semibold text-emerald-600">
                        ✅ Check: No orphan files found — all storage files are referenced in the database
                      </div>
                    ) : (
                      <div className="mt-6 space-y-4 rounded-2xl bg-white/80 p-4 shadow-inner">
                        <div className="overflow-x-auto rounded-2xl border border-amber-200">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="bg-slate-900 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                <th className="px-4 py-3">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-indigo-600"
                                    checked={allOrphansSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                  />
                                </th>
                                <th className="px-4 py-3">File Name</th>
                                <th className="px-4 py-3">Relative Path</th>
                                <th className="px-4 py-3">Full Path</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orphanFiles.map((file, idx) => {
                                const relativePath = file.relativePath || "";
                                return (
                                  <tr
                                    key={idx}
                                    className="border-b border-amber-100 bg-white last:border-none hover:bg-amber-50/80"
                                  >
                                    <td className="px-4 py-3">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-indigo-600"
                                        checked={selectedOrphans.includes(relativePath)}
                                        onChange={(e) => handleOrphanToggle(relativePath, e.target.checked)}
                                      />
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-slate-800">{file.fileName || ""}</td>
                                    <td className="px-4 py-3">
                                      <span className="font-mono text-xs text-slate-600">{relativePath}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="font-mono text-xs text-slate-600">{file.fullPath || ""}</span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="rounded-2xl border-l-4 border-rose-500 bg-rose-50/80 p-4 text-sm font-semibold text-rose-700">
                          <strong>⚠️ Important Warning:</strong> Please only delete media files (images, videos, audio files). Do not delete any other files except media files. Deleting non-media files may cause system errors.
                        </div>

                        <div className="flex justify-end">
                          <button
                            id="deleteSelectedBtn"
                            onClick={deleteSelectedOrphans}
                            disabled={deleteLoading}
                            className="flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deleteLoading ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" />
                                Deleting…
                              </>
                            ) : (
                              <>
                                <span role="img" aria-label="trash">
                                  🗑️
                                </span>
                                Delete Selected
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ImageCleaning;