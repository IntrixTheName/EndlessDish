import React, { useEffect, useState } from 'react'
import Notice from '../components/notice'
import DownloadButton from '../components/download_button'

const Admin = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch("/get/submissions")
                if(!response.ok) throw new Error("Failed to fetch submission data")
                const subs = await response.json()
                setSubmissions(subs);
            } catch (error) {
                console.error('Failed to fetch submissions:', error);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div className="admin page">
            <h1>Review Submissions</h1>
            <div className="submissions-list">
                {submissions.length > 0 ? (
                    submissions.map((submission) => (
                        <div key={submission.temp_id} className="submission-entry">
                            <Notice
                                title={[submission.temp_id, submission.title].join(" | ")}
                                body={submission.summary}
                                extra={
                                    <div>
                                        <p>Submitted by: {submission.owner}</p>
                                        <DownloadButton src={`/get/submissions/download/${submission.temp_id}`} text="Download" filename={`${submission.temp_id}.docx`} />
                                    </div>
                                }
                            />
                        </div>
                    ))
                ) : (
                    <p>No submissions available to review.</p>
                )}
            </div>
        </div>
    )
}
export default Admin;
//