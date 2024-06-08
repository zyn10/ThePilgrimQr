document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
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
        qrResult.appendChild(img);

        // Extract filename from the URL
        const url = new URL(text);
        const pathnameParts = url.pathname.split('/');
        const filename = pathnameParts[pathnameParts.length - 1].replace(/\//g, '-') + '.png';

        // Create the download button
        const downloadButton = document.createElement('a');
        downloadButton.id = 'download-button';
        downloadButton.href = qr.toDataURL();
        downloadButton.download = filename;
        downloadButton.textContent = 'Download QR Code';
        downloadButton.textContent = 'Download';
        qrResult.appendChild(downloadButton);
    }
});