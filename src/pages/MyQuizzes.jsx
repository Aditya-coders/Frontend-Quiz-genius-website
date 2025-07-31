

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import './MyQuizzes.css'; // ✅ External stylesheet

const MyQuizzes = () => {
  const [results, setResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pageLimit, setPageLimit] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuizTitle, setSelectedQuizTitle] = useState('All');

  const rowsPerPage = 25;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/results/all');
        setResults(res.data);
        setSortedResults(res.data);
      } catch (err) {
        console.error('Failed to fetch results');
      }
    };
    fetchResults();
  }, []);

  const getUniqueQuizTitles = () => {
    const titles = results
      .map((r) => r.quizId?.title)
      .filter((title, index, self) => title && self.indexOf(title) === index);
    return ['All', ...titles];
  };

  useEffect(() => {
    let filtered = [...results];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((r) => {
        const dateFormatted = formatDate(r.createdAt).toLowerCase();
        return (
          r.name?.toLowerCase().includes(term) ||
          r.email?.toLowerCase().includes(term) ||
          dateFormatted.includes(term)
        );
      });
    }

    // Quiz title filter
    if (selectedQuizTitle !== 'All') {
      filtered = filtered.filter((r) => r.quizId?.title === selectedQuizTitle);
    }

    // Sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let valA = sortField === 'quizTitle' ? a.quizId?.title || '' : a[sortField];
        let valB = sortField === 'quizTitle' ? b.quizId?.title || '' : b[sortField];
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
      });
    }

    setSortedResults(filtered);
  }, [sortField, sortOrder, results, searchTerm, selectedQuizTitle]);

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const time = d.toLocaleTimeString();
    return `${dd}/${mm}/${yyyy}, ${time}`;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const data = sortedResults.map((r) => [
      r.name,
      r.email,
      r.quizId?.title || 'N/A',
      r.score,
      r.total,
      formatDate(r.createdAt),
    ]);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const pagesToInclude =
      pageLimit === 'all' ? totalPages : Math.min(parseInt(pageLimit), totalPages);

    for (let i = 0; i < pagesToInclude; i++) {
      if (i > 0) doc.addPage();
      const pageData = data.slice(i * rowsPerPage, (i + 1) * rowsPerPage);
      doc.text(`All Quiz Attempts (Page ${i + 1})`, 14, 15);
      autoTable(doc, {
        head: [['Name', 'Email', 'Quiz Title', 'Score', 'Out Of', 'Date']],
        body: pageData,
        startY: 20,
        styles: { fontSize: 10 },
      });
    }

    doc.save('quiz_results.pdf');
  };

  return (
    <div className="dashboard-myquizzes-container">
      <h2 className="dashboard-myquizzes-title">All Quiz Attempts</h2>

      <div className="dashboard-myquizzes-controls">
        <input
          type="text"
          placeholder="Search by name, email, or date (dd/mm/yyyy)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard-myquizzes-input"
        />

        <div className="dashboard-myquizzes-selects">
          <select value={selectedQuizTitle} onChange={(e) => setSelectedQuizTitle(e.target.value)}>
            {getUniqueQuizTitles().map((title, idx) => (
              <option key={idx} value={title}>
                {title}
              </option>
            ))}
          </select>

          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="">Sort by Field</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="quizTitle">Quiz Title</option>
            <option value="score">Score</option>
            <option value="total">Total</option>
            <option value="createdAt">Date</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>

          <select value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
            <option value="all">All Pages</option>
            <option value="1">1 Page</option>
            <option value="2">2 Pages</option>
            <option value="3">3 Pages</option>
            <option value="4">4 Pages</option>
            <option value="5">5 Pages</option>
          </select>

          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      </div>

      {sortedResults.length === 0 ? (
        <p className="dashboard-myquizzes-empty">No quiz attempts found.</p>
      ) : (
        <div className="dashboard-myquizzes-table-wrapper">
          <table className="dashboard-myquizzes-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Quiz Title</th>
                <th>Score</th>
                <th>Out Of</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.quizId?.title || 'N/A'}</td>
                  <td>{r.score}</td>
                  <td>{r.total}</td>
                  <td>{formatDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import autoTable from 'jspdf-autotable';
// import './MyQuizzes.css'; // ✅ External stylesheet

// const MyQuizzes = () => {
//   const [results, setResults] = useState([]);
//   const [sortedResults, setSortedResults] = useState([]);
//   const [sortField, setSortField] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [pageLimit, setPageLimit] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuizTitle, setSelectedQuizTitle] = useState('All');

//   const rowsPerPage = 25;

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await axios.get('https://quiz-genius-website.onrender.com/api/results/all');
//         setResults(res.data);
//         setSortedResults(res.data);
//       } catch (err) {
//         console.error('Failed to fetch results');
//       }
//     };
//     fetchResults();
//   }, []);

//   const getUniqueQuizTitles = () => {
//     const titles = results
//       .map((r) => r.quizId?.title)
//       .filter((title, index, self) => title && self.indexOf(title) === index);
//     return ['All', ...titles];
//   };

//   useEffect(() => {
//     let filtered = [...results];

//     // Search filter
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter((r) => {
//         const dateFormatted = formatDate(r.createdAt).toLowerCase();
//         return (
//           r.name?.toLowerCase().includes(term) ||
//           r.email?.toLowerCase().includes(term) ||
//           dateFormatted.includes(term)
//         );
//       });
//     }

//     // Quiz title filter
//     if (selectedQuizTitle !== 'All') {
//       filtered = filtered.filter((r) => r.quizId?.title === selectedQuizTitle);
//     }

//     // Sorting
//     if (sortField) {
//       filtered.sort((a, b) => {
//         let valA = sortField === 'quizTitle' ? a.quizId?.title || '' : a[sortField];
//         let valB = sortField === 'quizTitle' ? b.quizId?.title || '' : b[sortField];
//         if (typeof valA === 'string') {
//           valA = valA.toLowerCase();
//           valB = valB.toLowerCase();
//         }
//         return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
//       });
//     }

//     setSortedResults(filtered);
//   }, [sortField, sortOrder, results, searchTerm, selectedQuizTitle]);

//   const formatDate = (isoString) => {
//     const d = new Date(isoString);
//     const dd = String(d.getDate()).padStart(2, '0');
//     const mm = String(d.getMonth() + 1).padStart(2, '0');
//     const yyyy = d.getFullYear();
//     const time = d.toLocaleTimeString();
//     return `${dd}/${mm}/${yyyy}, ${time}`;
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     const data = sortedResults.map((r) => [
//       r.name,
//       r.email,
//       r.quizId?.title || 'N/A',
//       r.score,
//       r.total,
//       formatDate(r.createdAt),
//     ]);

//     const totalPages = Math.ceil(data.length / rowsPerPage);
//     const pagesToInclude =
//       pageLimit === 'all' ? totalPages : Math.min(parseInt(pageLimit), totalPages);

//     for (let i = 0; i < pagesToInclude; i++) {
//       if (i > 0) doc.addPage();
//       const pageData = data.slice(i * rowsPerPage, (i + 1) * rowsPerPage);
//       doc.text(`All Quiz Attempts (Page ${i + 1})`, 14, 15);
//       autoTable(doc, {
//         head: [['Name', 'Email', 'Quiz Title', 'Score', 'Out Of', 'Date']],
//         body: pageData,
//         startY: 20,
//         styles: { fontSize: 10 },
//       });
//     }

//     doc.save('quiz_results.pdf');
//   };

//   return (
//     <div className="dashboard-myquizzes-container">
//       <h2 className="dashboard-myquizzes-title">All Quiz Attempts</h2>

//       <div className="dashboard-myquizzes-controls">
//         <input
//           type="text"
//           placeholder="Search by name, email, or date (dd/mm/yyyy)"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="dashboard-myquizzes-input"
//         />

//         <div className="dashboard-myquizzes-selects">
//           <select value={selectedQuizTitle} onChange={(e) => setSelectedQuizTitle(e.target.value)}>
//             {getUniqueQuizTitles().map((title, idx) => (
//               <option key={idx} value={title}>
//                 {title}
//               </option>
//             ))}
//           </select>

//           <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
//             <option value="">Sort by Field</option>
//             <option value="name">Name</option>
//             <option value="email">Email</option>
//             <option value="quizTitle">Quiz Title</option>
//             <option value="score">Score</option>
//             <option value="total">Total</option>
//             <option value="createdAt">Date</option>
//           </select>

//           <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="asc">Asc</option>
//             <option value="desc">Desc</option>
//           </select>

//           <select value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
//             <option value="all">All Pages</option>
//             <option value="1">1 Page</option>
//             <option value="2">2 Pages</option>
//             <option value="3">3 Pages</option>
//           </select>

//           <button onClick={downloadPDF}>Download PDF</button>
//         </div>
//       </div>

//       {sortedResults.length === 0 ? (
//         <p className="dashboard-myquizzes-empty">No quiz attempts found.</p>
//       ) : (
//         <div className="dashboard-myquizzes-table-wrapper">
//           <table className="dashboard-myquizzes-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Quiz Title</th>
//                 <th>Score</th>
//                 <th>Out Of</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedResults.map((r, idx) => (
//                 <tr key={idx}>
//                   <td>{r.name}</td>
//                   <td>{r.email}</td>
//                   <td>{r.quizId?.title || 'N/A'}</td>
//                   <td>{r.score}</td>
//                   <td>{r.total}</td>
//                   <td>{formatDate(r.createdAt)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyQuizzes;
