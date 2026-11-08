# MOPANI – Misi Pintar Mengaji

Proyek awal website MOPANI untuk dibuka dan dikembangkan di Visual Studio Code.

## Isi folder
- `index.html` – halaman login dan dashboard.
- `style.css` – tampilan responsif bernuansa kuning lembut.
- `app.js` – alur belajar, materi, kuis, progres, dashboard guru.
- `firebase.js` – koneksi Firebase Authentication dan Cloud Firestore.
- `student-data.js` – membaca progres siswa.
- `firestore.rules` – contoh aturan keamanan awal.

## 1. Masukkan konfigurasi Firebase
Buka `firebase.js`, lalu ganti nilai `ISI_...` pada `firebaseConfig` dengan konfigurasi Web App dari:
Firebase Console → Project settings → Your apps → SDK setup and configuration → Config.

Jangan memasukkan password akun atau service account private key ke file ini.

## 2. Pastikan layanan aktif
Di Firebase Console:
1. Authentication → Sign-in method: aktifkan Anonymous dan Email/Password.
2. Cloud Firestore sudah dibuat.
3. Pastikan akun guru Email/Password sudah dibuat.
4. Pastikan dokumen `teachers/{UID_GURU}` sudah ada dengan field `nama` (string) dan `role` (string) bernilai `admin`.

## 3. Jalankan melalui server lokal
Jangan membuka `index.html` dengan klik ganda (`file://`).
Di VS Code, pasang ekstensi **Live Server**, klik kanan `index.html`, lalu pilih **Open with Live Server**.
Atau gunakan server lokal lain yang melayani file melalui `http://localhost`.

## 4. Catatan keamanan penting
Rules yang ada merupakan aturan awal untuk prototipe. Untuk penggunaan publik, validasi nilai, poin, penyelesaian misi, dan identitas harus diperkuat di backend/Cloud Functions. Jangan menganggap skor yang dihitung di browser sebagai bukti yang tidak dapat dimanipulasi.
Guru hanya dapat membaca daftar siswa jika UID guru terdaftar pada koleksi `teachers`.

## 5. Materi
Konten dan kuis di dalam proyek adalah contoh awal. Mohon guru memeriksa kembali ketepatan tulisan Arab, harakat, tajwid, dan soal sebelum digunakan dalam pembelajaran. Penilaian makhraj dan kelancaran tetap memerlukan penyimakan guru; kuis pilihan ganda tidak cukup untuk menilainya.
