document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('text').value;// Clean the input
    const qrResult = document.getElementById('qr-result');
    qrResult.innerHTML = '';

    if (text) {
        const qr = new QRious({
            value: text,
            size: 150,
            background: '#fff',
            foreground: '#000',
            level: 'H'
        });

        // Create the image element
        const img = document.createElement('img');
        img.src = qr.toDataURL();
        img.alt = 'QR Code';
        img.style.width = '170px';  // Ensure the image is 150px wide
        img.style.height = '170px'; // Ensure the image is 150px high
        qrResult.appendChild(img);

        // Extract filename from the URL or use a default name
        const url = new URL(text);
        let pathname = url.pathname;
        // Remove trailing slashes if any
        pathname = pathname.replace(/\/+$/, "");
        const lastSlashIndex = pathname.lastIndexOf('/');
        const filename = pathname.substr(lastSlashIndex + 1) + '.png';

        // Use html2canvas to capture the QR code with styles
        html2canvas(img, { width: 190, height: 190 }).then(canvas => {
            const dataURL = canvas.toDataURL();
            const downloadButton = document.createElement('a');
            downloadButton.href = dataURL;
            downloadButton.download = filename;
            downloadButton.textContent = 'Download QR Code';
            qrResult.appendChild(downloadButton);
        });
    }
});
