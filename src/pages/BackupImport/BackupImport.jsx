import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { MdBackup, MdDriveFolderUpload } from "react-icons/md";
import { FaDatabase, FaUpload } from "react-icons/fa";
import { LiaFileImportSolid } from "react-icons/lia";

const BackupImport = () => {
  const [activeTab, setActiveTab] = useState("backup");
  const [mongoUrl, setMongoUrl] = useState("mongodb://localhost:27017");
  const [dbName, setDbName] = useState("");
  const [importMongoUrl, setImportMongoUrl] = useState("mongodb://localhost:27017");
  const [importDbName, setImportDbName] = useState("");
  const [collectionsData, setCollectionsData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [importResults, setImportResults] = useState(null);

  const showStatus = (message, type) => {
    setStatus({ message, type });
  };

  const hideStatus = () => {
    setStatus({ message: "", type: "" });
  };

  const updateStats = () => {
    const selected = collectionsData.filter((c) => c.selected);
    const totalDocs = selected.reduce((sum, c) => sum + c.count, 0);
    return { selected: selected.length, total: collectionsData.length, totalDocs };
  };

  const stats = updateStats();

  const handleConnect = async () => {
    if (!mongoUrl.trim() || !dbName.trim()) {
      showStatus("❌ Please enter both MongoDB URL and Database Name", "error");
      return;
    }

    setLoading(true);
    showStatus("Connecting to database and loading collections...", "loading");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/api/get-collections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mongoUrl, dbName }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.collections.length === 0) {
          showStatus("⚠️ No collections found in database", "error");
          return;
        }

        showStatus(
          `✅ Connected successfully! Found ${data.totalCollections} collections with ${data.totalDocuments.toLocaleString()} total documents.`,
          "success"
        );

        setCollectionsData(data.collections);
      } else {
        showStatus(`❌ ${data.error || "Failed to connect"}`, "error");
      }
    } catch (error) {
      showStatus(`❌ Connection error: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBackup = async () => {
    const selectedCollections = collectionsData
      .filter((c) => c.selected)
      .map((c) => c.name);

    if (selectedCollections.length === 0) {
      showStatus("❌ Please select at least one collection to backup", "error");
      return;
    }

    setLoading(true);
    const selectedCount = selectedCollections.length;
    const totalDocs = collectionsData
      .filter((c) => c.selected)
      .reduce((sum, c) => sum + c.count, 0);

    showStatus(
      `Creating backup of ${selectedCount} collections (${totalDocs.toLocaleString()} documents)...`,
      "loading"
    );

    

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/api/backup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mongoUrl,
          dbName,
          selectedCollections,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Backup failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${dbName}_backup_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showStatus(
        `✅ Backup completed successfully! Check your downloads folder for the ZIP file.`,
        "success"
      );
    } catch (error) {
      showStatus(`❌ Backup failed: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.name.endsWith(".zip")) {
      setSelectedFile(file);
      hideStatus();
      setImportResults(null);
    } else {
      showStatus("❌ Please select a valid ZIP file", "error");
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      showStatus("❌ Please select a ZIP file to import", "error");
      return;
    }

    if (!importMongoUrl.trim() || !importDbName.trim()) {
      showStatus("❌ Please enter MongoDB URL and Database Name", "error");
      return;
    }

    setLoading(true);
    setImportResults(null);
    showStatus("Importing database... This may take a while for large files.", "loading");

    try {
      const formData = new FormData();
      formData.append("zipFile", selectedFile);
      formData.append("mongoUrl", importMongoUrl);
      formData.append("dbName", importDbName);

      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/api/import`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Import failed");
      }

      showStatus(
        `✅ Import completed successfully! ${data.successfulImports} of ${data.totalCollections} collections imported.`,
        "success"
      );

      setImportResults(data);
    } catch (error) {
      showStatus(`❌ Import failed: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleCollection = (index) => {
    const updated = [...collectionsData];
    updated[index].selected = !updated[index].selected;
    setCollectionsData(updated);
  };

  const selectAll = () => {
    setCollectionsData(collectionsData.map((c) => ({ ...c, selected: true })));
  };

  const deselectAll = () => {
    setCollectionsData(collectionsData.map((c) => ({ ...c, selected: false })));
  };

  const toggleMasterCheckbox = () => {
    const allSelected = collectionsData.every((c) => c.selected);
    if (allSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  const masterChecked = collectionsData.length > 0 && collectionsData.every((c) => c.selected);
  const masterIndeterminate =
    collectionsData.length > 0 &&
    !collectionsData.every((c) => c.selected) &&
    collectionsData.some((c) => c.selected);

  return (
    <>
      <PageTitle title="MongoDB Backup & Import | SmartTechnica" />
      <DefaultLayout>
        <Breadcrumb pageName="MongoDB Backup & Import" />
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 mt-4 dark:bg-boxdark dark:border-slate-700 dark:text-white dark:text-slate-400">

          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2 dark:text-white dark:text-slate-400"><span className="text-blue-600"><MdBackup size={28} /></span> MongoDB Backup & Import Tool</h1>
          <p className="text-slate-600 mb-3 text-sm dark:text-white dark:text-slate-400">Export and Import MongoDB databases with ease</p>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-slate-300 dark:border-slate-700">
            <button
              className={`px-6 py-3 font-semibold text-sm border-b-3 transition-all dark:text-white dark:text-slate-400 ${
                activeTab === "backup"
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-600 border-transparent hover:text-indigo-500"
              }`}
              onClick={() => setActiveTab("backup")}
            >
              <div className="flex items-center gap-2">
              <span className="text-blue-600"><FaDatabase size={20} /></span>
              Backup Database
              </div>
            </button>
            <button
              className={`px-6 py-3 font-semibold text-sm border-b-3 transition-all dark:text-white dark:text-slate-400  dark:border-indigo-600 ${
                activeTab === "import"
                  ? "text-indigo-600 border-indigo-600 dark:text-white dark:text-slate-400"
                  : "text-gray-600 border-transparent hover:text-indigo-500 dark:text-white dark:text-slate-400"
              } dark:border-indigo-600  `}
              onClick={() => setActiveTab("import")}
            >
              <div className="flex items-center gap-2">
              <span className="text-blue-600"><LiaFileImportSolid  size={20} /></span> Import Database
              </div>
            </button>
          </div>

          {/* Backup Tab */}
          {activeTab === "backup" && (
            <div>
              {/* Step 1: Connection */}
              <div className="mb-6 pb-6 border-b border-slate-300 dark:border-slate-700">
                <div className="text-lg font-semibold text-indigo-600 mb-4 dark:text-white dark:text-slate-400">Step 1: Database Connection</div>

                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm dark:text-white dark:text-slate-400">
                    MongoDB Connection URL
                  </label>
                  <input
                    type="text"
                    value={mongoUrl}
                    onChange={(e) => setMongoUrl(e.target.value)}
                    placeholder="mongodb://localhost:27017 or mongodb+srv://..."
                    className="w-full px-4 py-3 border border-slate-900 bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-md transition-all dark:bg-boxdark dark:border-slate-700 dark:text-white"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm dark:text-white dark:text-slate-400">Database Name</label>
                  <input
                    type="text"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    placeholder="myDatabase"
                    className="w-full px-4 py-3 border border-slate-900 bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-md transition-all dark:bg-boxdark dark:border-slate-700 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleConnect}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-blue-600 w-full text-center text-white hover:bg-blue-700 rounded-md transition-all text-md font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                >
                  Connect & Load Collections
                </button>

                {status.message && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-sm dark:bg-boxdark dark:text-white dark:text-slate-400 ${
                      status.type === "loading"
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : status.type === "success"
                        ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                        : "bg-red-50 text-red-700 border-l-4 border-red-500"
                    }`}
                  >
                    {status.type === "loading" && (
                      <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: status.message }} />
                  </div>
                )}
              </div>

              {/* Step 2: Select Collections */}
              {collectionsData.length > 0 && (
                <div className="mb-8">
                  <div className="text-lg font-semibold text-indigo-600 mb-4 dark:text-white dark:text-slate-400">Step 2: Select Collections to Backup</div>

                  <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-white dark:text-slate-400">
                      <strong>{stats.selected}</strong> of <strong>{stats.total}</strong> collections selected (
                      <strong>{stats.totalDocs.toLocaleString()}</strong> total documents)
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={selectAll}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-semibold hover:bg-gray-300 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-gray-300"
                      >
                        Select All
                      </button>
                      <button
                        onClick={deselectAll}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-semibold hover:bg-gray-300 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-gray-300"
                      >
                        Deselect All
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-slate-700">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-50 dark:bg-boxdark dark:text-white dark:text-slate-400">
                        <tr>
                          <th className="p-3 text-left text-xs font-semibold text-gray-600 w-12">
                            <input
                              type="checkbox"
                              checked={masterChecked}
                              ref={(input) => {
                                if (input) input.indeterminate = masterIndeterminate;
                              }}
                              onChange={toggleMasterCheckbox}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </th>
                          <th className="p-3 text-left text-xs font-semibold text-gray-600 dark:text-white dark:text-slate-400">Collection Name</th>
                          <th className="p-3 text-right text-xs font-semibold text-gray-600 dark:text-white dark:text-slate-400">Document Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {collectionsData.map((collection, index) => (
                          <tr key={index} className="hover:bg-gray-50 border-b border-gray-100 dark:bg-boxdark dark:text-white dark:text-slate-400">
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={collection.selected}
                                onChange={() => toggleCollection(index)}
                                className="w-4 h-4 cursor-pointer"
                              />
                            </td>
                            <td className="p-3 font-semibold dark:text-white dark:text-slate-400">{collection.name}</td>
                            <td className="p-3 text-right">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                                {collection.count.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={handleBackup}
                    disabled={loading || stats.selected === 0}
                    className="w-full mt-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed dark:bg-green-500 dark:hover:bg-green-600 dark:text-white"
                  >
                    📦 Create Backup ZIP
                  </button>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 leading-relaxed dark:bg-boxdark dark:text-white dark:text-slate-400">
                <strong className="text-gray-800">📝 How it works:</strong>
                <br />
                1. Enter your MongoDB URL and database name
                <br />
                2. Click "Connect" to load all collections with document counts
                <br />
                3. Select which collections you want to backup (all selected by default)
                <br />
                4. Click "Create Backup ZIP" to download selected collections as JSON files
                <br />
                <br />
                <strong className="text-gray-800">Example URL:</strong>
                <div className="text-indigo-600 font-mono bg-white px-2 py-1 rounded mt-2 inline-block dark:bg-white dark:text-indigo-600">
                  mongodb://localhost:27017
                </div>
              </div>
            </div>
          )}

          {/* Import Tab */}
          {activeTab === "import" && (
            <div>
              {/* Step 1: File Upload */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <div className="text-lg font-semibold text-indigo-600 mb-4 dark:text-white dark:text-slate-400">Step 1: Upload Backup ZIP File</div>

                {!selectedFile ? (
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-gray-50 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all dark:border-slate-700 dark:bg-boxdark dark:text-white dark:text-slate-400"
                    onClick={() => document.getElementById("fileInput").click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="text-5xl flex items-center justify-center"><MdDriveFolderUpload size={30} className="text-blue-600" /></div>
                    <div className="text-gray-700 font-semibold mb-2 dark:text-white dark:text-slate-400">
                      <strong>Click to select</strong> or drag and drop your backup ZIP file
                    </div>
                    <div className="text-gray-500 text-xs dark:text-white dark:text-slate-400">Supports ZIP files containing JSON collection data</div>
                  </div>
                ) : (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center justify-between dark:bg-green-50 dark:border-green-500 dark:text-white dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">📁</div>
                      <div>
                        <div className="font-semibold text-green-700 dark:text-green-700">{selectedFile.name}</div>
                        <div className="text-xs text-gray-600 dark:text-white dark:text-slate-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        document.getElementById("fileInput").value = "";
                        hideStatus();
                        setImportResults(null);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".zip"
                  onChange={handleFileInput}
                />
              </div>

              {/* Step 2: Import Configuration */}
              <div className="dark:bg-boxdark dark:text-white dark:text-slate-400">
                <div className="text-lg font-semibold text-indigo-600 mb-4 dark:text-white dark:text-slate-400">Step 2: Target Database Configuration</div>

                <div className="mb-4">
                  <label className="block text-slate-700 font-bold mb-2 text-md dark:text-white dark:text-slate-400">
                    MongoDB Connection URL
                  </label>
                  <input
                    type="text"
                    value={importMongoUrl}
                    onChange={(e) => setImportMongoUrl(e.target.value)}
                    placeholder="mongodb://localhost:27017 or mongodb+srv://..."
                    className="w-full px-4 py-3 border border-slate-900 bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-md transition-all dark:bg-boxdark dark:border-slate-700 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-slate-700 font-bold mb-2 text-md dark:text-white dark:text-slate-400">Target Database Name</label>
                  <input
                    type="text"
                    value={importDbName}
                    onChange={(e) => setImportDbName(e.target.value)}
                    placeholder="myRestoredDatabase"
                    className="w-full px-4 py-3 border border-slate-900 bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-md transition-all dark:bg-boxdark dark:border-slate-700 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleImport}
                  disabled={loading || !selectedFile}
                  className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                >
                  <div className="flex items-center justify-center gap-2"><FaUpload size={16} /> Import Database</div>
                </button>

                {status.message && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-sm dark:bg-boxdark dark:text-white dark:text-slate-400 ${
                      status.type === "loading"
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : status.type === "success"
                        ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                        : "bg-red-50 text-red-700 border-l-4 border-red-500"
                    }`}
                  >
                    {status.type === "loading" && (
                      <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: status.message }} />
                  </div>
                )}

                {importResults && (
                  <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 dark:bg-boxdark dark:text-white dark:text-slate-400">
                    <div className="text-lg font-semibold text-gray-800 mb-4">Import Results</div>
                    <div className="text-sm text-gray-600 mb-4 leading-relaxed dark:text-white dark:text-slate-400">
                      <strong>Database:</strong> {importResults.databaseName}
                      <br />
                      <strong>Total Collections:</strong> {importResults.totalCollections}
                      <br />
                      <strong>Successful:</strong> {importResults.successfulImports}
                      <br />
                      <strong>Documents Imported:</strong> {importResults.totalDocumentsImported.toLocaleString()}
                      <br />
                      <strong>Processing Time:</strong> {(importResults.processingTimeMs / 1000).toFixed(2)} seconds
                    </div>
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="w-full border-collapse text-sm dark:bg-boxdark dark:text-white dark:text-slate-400">
                        <thead className="bg-gray-50 dark:bg-boxdark dark:text-white dark:text-slate-400">
                          <tr>
                            <th className="p-2 text-left font-semibold text-gray-600 dark:text-white dark:text-slate-400">Collection</th>
                            <th className="p-2 text-left font-semibold text-gray-600 dark:text-white dark:text-slate-400">Status</th>
                            <th className="p-2 text-right font-semibold text-gray-600 dark:text-white dark:text-slate-400">Documents Imported</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importResults.results.map((result, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:bg-boxdark dark:text-white dark:text-slate-400">
                              <td className="p-2 font-semibold dark:text-white dark:text-slate-400">{result.collection}</td>
                              <td className="p-2 dark:text-white dark:text-slate-400">
                                {result.status === "success" && (
                                  <span className="text-green-600 font-semibold dark:text-green-600">✅ Success</span>
                                )}
                                {result.status === "error" && (
                                  <span className="text-red-600 font-semibold dark:text-red-600">❌ Error: {result.error}</span>
                                )}
                                {result.status === "skipped" && (
                                  <span className="text-orange-600 font-semibold dark:text-orange-600">⚠️ {result.message}</span>
                                )}
                              </td>
                              <td className="p-2 text-right dark:text-white dark:text-slate-400">
                                {result.documentsImported.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 leading-relaxed dark:bg-boxdark dark:text-white dark:text-slate-400">
                <strong className="text-gray-800">📝 How to import:</strong>
                <br />
                1. Upload a ZIP file containing your MongoDB backup (JSON files)
                <br />
                2. Enter the MongoDB connection URL
                <br />
                3. Specify the target database name (can be different from original)
                <br />
                4. Click "Import Database" to restore all collections
                <br />
                <br />
                <strong className="text-gray-800 dark:text-white dark:text-slate-400">⚠️ Important:</strong> If the database already exists, collections
                will be created/appended. Use a new database name for a clean import.
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default BackupImport;

