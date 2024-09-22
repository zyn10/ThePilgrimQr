document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
    const qrResult = document.getElementById('qr-result');
    qrResult.innerHTML = '';

    if (text) {
        const qrSize = 600; // High resolution for the QR code
        const padding = 50; // Padding size in pixels

        const qr = new QRious({
            value: text,
            size: qrSize,
            background: '#fff',
            foreground: '#000',
            level: 'H'
        });

        // Create a canvas to add padding
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = qrSize + padding * 2;
        canvas.height = qrSize + padding * 2;

        // Fill the canvas with white background
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the QR code onto the canvas with padding
        const img = new Image();
        img.src = qr.toDataURL();
        img.onload = () => {
            context.drawImage(img, padding, padding, qrSize, qrSize);

            // Create an image element to display the padded QR code
            const paddedImg = document.createElement('img');
            paddedImg.src = canvas.toDataURL();
            paddedImg.alt = 'QR Code with Padding';
            paddedImg.style.width = '170px'; // Display size
            paddedImg.style.height = '170px'; // Display size
            qrResult.appendChild(paddedImg);

            // Extract filename from the URL or use a default name
            let filename = 'qr-code.png';
            try {
                const url = new URL(text);
                let pathname = url.pathname;
                pathname = pathname.replace(/\/+$/, ""); // Remove trailing slashes if any exist
                const lastSlashIndex = pathname.lastIndexOf('/');
                filename = pathname.substr(lastSlashIndex + 1) + '.png';
            } catch (e) {
                console.error("Invalid URL format");
            }

            // Create the download button with the padded image data URL
            const downloadButton = document.createElement('a');
            downloadButton.href = canvas.toDataURL();
            downloadButton.download = filename;
            downloadButton.textContent = 'Download QR Code';
            qrResult.appendChild(downloadButton);
        };
    }
});
