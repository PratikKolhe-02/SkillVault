import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { serverUrl } from '../App'; 

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // We use userData only to check if you are logged in visually
  const { userData } = useSelector((state) => state.user) || {};

  // Load history on mount
  React.useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // We rely on 'credentials: include' to send the cookie
      const response = await fetch(`${serverUrl}/api/resume/history`, {
        method: "GET",
        credentials: 'include', // <--- THIS SENDS THE COOKIE
      });
      const data = await response.json();
      
      if (data.history) {
        setHistory(data.history);
      }
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); 
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a PDF resume first.");
      return;
    }

    setLoading(true);
    setAnalysis("");
    setError("");

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${serverUrl}/api/resume/analyze`, {
        method: 'POST',
        // We do NOT set manual headers. We let the browser send the Cookie.
        credentials: 'include', 
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze resume");
      }

      setAnalysis(data.analysis);
      toast.success("Report Generated & Saved!");
      await fetchHistory(); 
      
    } catch (err) {
      console.error(err);
      setError("Error: " + err.message);
      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* ANALYZER CARD */}
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "10px" }}>AI Resume Analyzer</h1>
          <p style={{ color: "#6b7280", marginBottom: "30px" }}>Upload your resume to get an ATS score and feedback.</p>

          <div style={{ border: "2px dashed #e5e7eb", borderRadius: "12px", padding: "30px", marginBottom: "20px" }}>
             <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "block", margin: "0 auto" }}/>
          </div>

          <button onClick={handleAnalyze} disabled={loading} style={{ width: "100%", padding: "14px", backgroundColor: loading ? "#9ca3af" : "#000000", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Processing..." : "Analyze Profile"}
          </button>

          {error && <div style={{ marginTop: "15px", color: "red" }}>{error}</div>}
        </div>

        {/* RESULT SECTION */}
        {analysis && (
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}>Latest Report</h2>
            <div style={{ lineHeight: "1.7", color: "#374151" }}>
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* HISTORY SECTION */}
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>Past Analyses</h3>
             <button onClick={fetchHistory} style={{ padding: "8px 16px", backgroundColor: "#e5e7eb", border: "none", borderRadius: "6px", cursor: "pointer" }}>↻ Refresh</button>
          </div>

          {history.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "12px", color: "#6b7280" }}>
               {userData ? "No past reports found." : "Please login to see history."}
            </div>
          )}

          {history.map((item) => (
            <div key={item._id} 
                 onClick={() => { setAnalysis(item.analysisResult); window.scrollTo(0, 0); }}
                 style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", marginBottom: "15px", cursor: "pointer", borderLeft: "5px solid #000000", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            >
              <div style={{ fontWeight: "bold", color: "#374151" }}>Resume Analysis</div>
              <div style={{ fontSize: "14px", color: "#9ca3af" }}>{new Date(item.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResumeAnalyzer;