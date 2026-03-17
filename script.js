async function pasteLink() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('videoUrl').value = text;
    } catch (err) {
        alert('Gagal menempel link. Izinkan akses clipboard atau tempel manual.');
    }
}

async function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    const btn = document.getElementById('btnCheck');
    const resultDiv = document.getElementById('result');

    if (!url) {
        alert('Masukkan link TikTok dulu, Bro!');
        return;
    }

    btn.innerText = 'Memproses...';
    btn.disabled = true;

    try {
        // Ganti URL API ini dengan API yang Bro pakai (misal Tikwm/Awn)
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.code === 0) {
            document.getElementById('thumb').src = data.data.cover;
            document.getElementById('videoTitle').innerText = data.data.title;
            document.getElementById('btnNoWM').href = data.data.play;
            document.getElementById('btnHD').href = data.data.hdplay;
            document.getElementById('btnMP3').href = data.data.music;
            
            resultDiv.style.display = 'block';
        } else {
            alert('Video tidak ditemukan. Pastikan link benar.');
        }
    } catch (error) {
        alert('Terjadi kesalahan koneksi.');
    } finally {
        btn.innerText = 'Mulai Proses';
        btn.disabled = false;
    }
}
