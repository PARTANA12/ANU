async function pasteLink() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('videoUrl').value = text;
    } catch (err) {
        alert("Gunakan tempel manual jika izin browser tidak aktif.");
    }
}

async function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    const result = document.getElementById('result');
    const btnCheck = document.getElementById('btnCheck');
    const thumb = document.getElementById('thumb');
    const videoTitle = document.getElementById('videoTitle');

    if (!url) return alert("Tempelkan link video dulu!");

    btnCheck.innerText = "Memproses...";
    btnCheck.disabled = true;
    
    try {
        const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const json = await res.json();
        
        if (json.code === 0) {
            const data = json.data;
            result.style.display = "block";
            thumb.src = data.cover;
            videoTitle.innerText = data.title || "Video TikTok";
            
            // Link tombol dibuat sederhana agar tidak berat
            document.getElementById('btnNoWM').href = data.play;
            document.getElementById('btnHD').href = data.hdplay || data.play;
            document.getElementById('btnMP3').href = data.music;

            // OTOMATIS DOWNLOAD TANPA BLOB (Lebih Ringan)
            // Kita pakai trik 'window.location' agar browser langsung proses file-nya
            setTimeout(() => {
                window.location.href = data.hdplay || data.play;
            }, 800);

            result.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Gagal mengambil video. Cek kembali link Anda.");
        }
    } catch (e) {
        alert("Terjadi kesalahan koneksi.");
    } finally {
        btnCheck.innerText = "Mulai Proses";
        btnCheck.disabled = false;
    }
}
