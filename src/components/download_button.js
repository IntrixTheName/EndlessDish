function DownloadButton(props) {
  const handleDownload = async () => {
    try {
      const response = await fetch(props.src, {
        method: 'GET', headers: { 'Content-Type': 'application/json', }
      });

      if (response.ok) {
        const file = await response.blob()
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(file)
        a.href = url
        a.download = props.filename
        document.body.appendChild(a)
        a.click(); a.remove();
        window.URL.revokeObjectURL(url)
      } else { console.log("Failed to download file") }
    } catch (err) {
      console.error('An error occured while downloading file', err)
    }
  }

  return (
    <button onClick={handleDownload}>{props.text}</button>
  )
}

export default DownloadButton