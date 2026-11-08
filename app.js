import { cloud } from "./firebase.js";

const curriculum = [
  {name:"Pemula", desc:"Mengenal huruf dan dasar membaca.", missions:[
    ["Mengenal Huruf Hijaiyah","Kenali nama dan bentuk huruf hijaiyah dari Alif sampai Ya.","ا  ب  ت  ث  ج  ح  خ  د  ذ  ر  ز  س  ش  ص  ض  ط  ظ  ع  غ  ف  ق  ك  ل  م  ن  و  ه  لا  ء  ي","Huruf hijaiyah adalah huruf yang digunakan untuk membaca Al-Qur’an. Pelajari bentuk dan nama setiap huruf, lalu ucapkan perlahan."],
    ["Huruf Sambung","Mengenal perubahan bentuk huruf ketika disambung.","بَـ  ـبـ  ـب","Sebagian huruf hijaiyah dapat berubah bentuk ketika berada di awal, tengah, atau akhir kata. Perhatikan posisi huruf dan cara menyambungkannya."],
    ["Memahami Harakat","Mengenal fathah, kasrah, dammah, tanwin, sukun, tasydid, dan mad.","بَ  بِ  بُ  بً  بٍ  بٌ  بْ  بّ  بَا","Harakat membantu menentukan bunyi huruf. Fathah berbunyi a, kasrah berbunyi i, dammah berbunyi u. Pelajari juga tanwin, sukun, tasydid, dan mad."]
  ]},
  {name:"Mulai Paham",desc:"Mengenal tanda baca, waqaf, dan tajwid.",missions:[
    ["Tanda Baca","Mengenali tanda baca yang sering dijumpai dalam mushaf.","َ ِ ُ ْ ّ ٓ","Tanda baca membantu pembaca melafalkan ayat dengan tepat. Amati tanda di atas atau di bawah huruf."],
    ["Tanda Waqaf","Memahami tanda berhenti dan melanjutkan bacaan.","م  لا  ج  صلى  قلى","Tanda waqaf memberi petunjuk kapan pembaca sebaiknya berhenti atau meneruskan bacaan. Praktikkan bersama guru."],
    ["Tajwid","Mengenal dasar ilmu tajwid.","نْ  مْ  ـّ","Tajwid adalah ilmu membaca Al-Qur’an dengan benar. Pelajari makhraj dan sifat huruf serta hukum bacaan secara bertahap."],
    ["Jelajah Bacaan Al-Qur’an: Iqra 3–6","Berlatih membaca bertahap menuju tartil.","بَتَ  كَتَبَ  يَكْتُبُ","Latihan membaca dilakukan bertahap dari Iqra 3, Iqra 4, Iqra 5, hingga Iqra 6. Gunakan buku Iqra bersama pendamping."]
  ]},
  {name:"Paham Membaca",desc:"Menerapkan hukum bacaan dan kelancaran.",missions:[
    ["Mengenal Hukum Bacaan","Mengenali beberapa hukum bacaan dalam Al-Qur’an.","إِظْهَارٌ  إِدْغَامٌ  إِقْلَابٌ  إِخْفَاءٌ","Hukum bacaan perlu dipelajari melalui contoh ayat dan bimbingan guru. Perhatikan huruf, tanda, dan cara melafalkannya."],
    ["Berlatih Kelancaran dengan Tajwid","Membaca potongan ayat dengan tartil.","وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا","Latih kelancaran dengan membaca perlahan, menjaga makhraj, panjang pendek, dan hukum tajwid. Minta guru menyimak bacaan."],
    ["Mengenal Angka Arab dan Bagian Mushaf","Mengenal angka Arab, halaman, juz, dan nama surah.","١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠","Kenali angka Arab serta informasi dalam mushaf seperti nomor halaman, juz, dan nama surah agar lebih mudah menemukan bacaan."]
  ]}
];

const quizBank = [
  [{q:"Huruf pertama dalam urutan hijaiyah adalah ...",a:["Alif","Ba","Ta"],c:0},{q:"Huruf setelah Alif adalah ...",a:["Jim","Ba","Dal"],c:1},{q:"Huruf hijaiyah digunakan untuk membaca ...",a:["Al-Qur’an","Angka Romawi","Not musik"],c:0},{q:"Salah satu huruf hijaiyah adalah ...",a:["ب","A","7"],c:0},{q:"Belajar huruf sebaiknya dilakukan dengan ...",a:["Tergesa-gesa","Teliti dan berulang","Ditebak"],c:1}],
  [{q:"Huruf sambung adalah huruf yang ...",a:["Berdiri sendiri saja","Terhubung dengan huruf lain","Tidak dibaca"],c:1},{q:"Bentuk huruf dapat berubah menurut ...",a:["Posisinya","Warna buku","Ukuran kertas"],c:0},{q:"Huruf di awal kata berada pada ...",a:["Posisi awal","Posisi akhir","Luar kata"],c:0},{q:"Saat belajar sambung, kita perlu ...",a:["Mengamati bentuk","Mengabaikan huruf","Menebak"],c:0},{q:"Latihan huruf sambung perlu ...",a:["Dihindari","Diulang","Dipercepat"],c:1}],
  [{q:"Fathah berbunyi ...",a:["a","i","u"],c:0},{q:"Kasrah berbunyi ...",a:["a","i","u"],c:1},{q:"Dammah berbunyi ...",a:["a","i","u"],c:2},{q:"Sukun menandakan huruf ...",a:["Mati","Bertasydid","Panjang"],c:0},{q:"Mad berkaitan dengan bacaan ...",a:["Panjang","Sangat cepat","Berbisik"],c:0}]
];

let currentUser=null, profile=null, progress={points:0,badges:0,completed:[],scores:{}}, activeLevel=0, activeMission=null;
const $=id=>document.getElementById(id);
const show=(id)=>$(id).hidden=false, hide=(id)=>$(id).hidden=true;
const msg=(id,text)=>$(id).textContent=text;

function quizFor(i){return quizBank[i] || [
 {q:"Mengapa tanda waqaf dipelajari?",a:["Membantu berhenti atau lanjut","Menghias halaman","Mengganti huruf"],c:0},
 {q:"Tajwid membantu membaca Al-Qur’an dengan ...",a:["Benar","Terburu-buru","Acak"],c:0},
 {q:"Membaca tartil dilakukan dengan ...",a:["Tergesa","Tenang dan tepat","Menebak"],c:1},
 {q:"Jika belum lancar, sebaiknya ...",a:["Berlatih dan minta bimbingan","Berhenti belajar","Melewati semua"],c:0},
 {q:"Makhraj berkaitan dengan ...",a:["Tempat keluarnya huruf","Warna mushaf","Nomor halaman"],c:0}
];}
function missionId(level,index){return `${level}-${index}`;}
function isUnlocked(level,index){if(index===0)return true;return progress.completed.includes(missionId(level,index-1));}
function renderStats(){$("points").textContent=progress.points;$("completed").textContent=progress.completed.length;$("badges").textContent=progress.badges;}
function renderLevels(){
 const root=$("levels");root.innerHTML="";
 curriculum.forEach((level,i)=>{
  const card=document.createElement("article");card.className="level-card";
  card.innerHTML=`<p class="eyebrow">LEVEL ${i+1}</p><h3>${level.name}</h3><p>${level.desc}</p><button data-level="${i}">Buka Petualangan</button>`;
  card.querySelector("button").addEventListener("click",()=>renderMissions(i));root.append(card);
 });
}
function renderMissions(levelIndex){
 activeLevel=levelIndex;const level=curriculum[levelIndex];const area=$("missionArea");area.hidden=false;
 area.innerHTML=`<p class="eyebrow">PETA MISI · LEVEL ${levelIndex+1}</p><h2>${level.name}</h2><div class="mission-list"></div><div id="lessonDetail"></div>`;
 const list=area.querySelector(".mission-list");
 level.missions.forEach((m,i)=>{
  const unlocked=isUnlocked(levelIndex,i),done=progress.completed.includes(missionId(levelIndex,i));
  const row=document.createElement("div");row.className="mission-item"+(!unlocked?" locked":"");
  row.innerHTML=`<div><strong>${i+1}. ${m[0]}</strong><div class="muted">${done?"✓ Selesai":unlocked?"Siap dipelajari":"🔒 Selesaikan misi sebelumnya"}</div></div><button ${unlocked?"":"disabled"}>${done?"Pelajari lagi":"Buka Misi"}</button>`;
  row.querySelector("button").addEventListener("click",()=>openMission(levelIndex,i));list.append(row);
 });
 area.scrollIntoView({behavior:"smooth",block:"start"});
}
function openMission(levelIndex,index){
 activeMission={levelIndex,index};const m=curriculum[levelIndex].missions[index];const detail=$("lessonDetail");
 detail.innerHTML=`<div class="material"><p class="eyebrow">MATERI BELAJAR</p><h2>${m[0]}</h2><p>${m[1]}</p><div class="arabic">${m[2]}</div><p>${m[3]}</p><p><strong>Petunjuk:</strong> Baca contoh perlahan dan minta guru/orang tua menyimak pelafalan. Setelah memahami materi, kerjakan kuis.</p><button id="startQuiz">Saya sudah belajar – Mulai Kuis</button></div>`;
 $("startQuiz").addEventListener("click",showQuiz);
 detail.scrollIntoView({behavior:"smooth",block:"start"});
}
function showQuiz(){
 const detail=$("lessonDetail"),qz=quizFor(activeMission.index);
 detail.innerHTML=`<h2>Kuis Misi</h2><p class="muted">Jawab 5 pertanyaan. Nilai minimal 80 untuk menuntaskan misi.</p><form id="quizForm">${qz.map((q,i)=>`<div class="quiz-question"><strong>${i+1}. ${q.q}</strong>${q.a.map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}" required> ${a}</label>`).join("")}</div>`).join("")}<button type="submit">Periksa Jawaban</button></form><p id="quizResult" class="message"></p>`;
 $("quizForm").addEventListener("submit",async e=>{
  e.preventDefault();const fd=new FormData(e.currentTarget);let score=0;
  qz.forEach((q,i)=>{if(Number(fd.get(`q${i}`))===q.c)score+=20;});
  const id=missionId(activeMission.levelIndex,activeMission.index);
  progress.scores[id]=Math.max(progress.scores[id]||0,score);
  if(score>=80&&!progress.completed.includes(id)){progress.completed.push(id);progress.points+=20;progress.badges+=1;}
  renderStats();
  try{await cloud.saveStudent(currentUser,profile,progress);msg("quizResult",`Nilai kamu ${score}. ${score>=80?"Hebat! Misi berhasil diselesaikan dan progres tersimpan.":"Belum mencapai 80. Pelajari kembali materi lalu coba lagi."}`);}
  catch(err){msg("quizResult",`Nilai ${score}. Gagal menyimpan ke cloud: ${err.message}. Periksa konfigurasi Firebase dan Rules.`);}
  renderMissions(activeMission.levelIndex);
 });
}
async function startStudent(e){
 e.preventDefault();msg("loginMessage","Menghubungkan ke Firebase...");
 profile={nama:$("studentName").value.trim(),kelas:$("studentClass").value.trim(),sekolah:$("schoolName").value.trim()};
 try{
  currentUser=await cloud.studentSignIn();
  progress={points:0,badges:0,completed:[],scores:{}};
  // Data progres siswa dimuat dari dokumen milik UID yang sedang login bila tersedia.
  const {getStudent}=await import("./student-data.js").catch(()=>({getStudent:async()=>null}));
  const saved=await getStudent(currentUser.uid);
  if(saved){progress={points:saved.poin||0,badges:saved.lencana||0,completed:saved.selesai||[],scores:saved.nilai||{}};profile=saved.identitas||profile;}
  await cloud.saveStudent(currentUser,profile,progress);
  hide("loginView");show("studentView");$("welcomeName").textContent=`Assalamu’alaikum, ${profile.nama}!`;$("studentIdentity").textContent=`${profile.kelas} · ${profile.sekolah}`;
  renderStats();renderLevels();msg("loginMessage","");
 }catch(err){msg("loginMessage",`Belum berhasil masuk: ${err.message}`);}
}
async function teacherLogin(e){
 e.preventDefault();msg("loginMessage","Memeriksa akun guru...");
 try{currentUser=await cloud.teacherSignIn($("teacherEmail").value.trim(),$("teacherPassword").value);hide("loginView");show("teacherView");await loadTeacherDashboard();msg("loginMessage","");}
 catch(err){msg("loginMessage",err.message);}
}
async function loadTeacherDashboard(){
 try{
  const students=await cloud.getStudents();$("totalStudents").textContent=students.length;
  $("totalPoints").textContent=students.reduce((n,s)=>n+(s.poin||0),0);
  $("totalMissions").textContent=students.reduce((n,s)=>n+(s.selesai||[]).length,0);
  $("studentRows").innerHTML=students.length?students.map(s=>`<tr><td>${escapeHtml(s.identitas?.nama||"-")}</td><td>${escapeHtml(s.identitas?.kelas||"-")}</td><td>${escapeHtml(s.identitas?.sekolah||"-")}</td><td>${s.poin||0}</td><td>${(s.selesai||[]).length}</td></tr>`).join(""):`<tr><td colspan="5">Belum ada data siswa.</td></tr>`;
 }catch(err){msg("teacherMessage",`Tidak dapat mengambil data siswa: ${err.message}`);}
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function logout(){try{await cloud.logout();}catch{}location.reload();}
$("studentForm").addEventListener("submit",startStudent);
$("teacherForm").addEventListener("submit",teacherLogin);
$("studentLogout").addEventListener("click",logout);
$("teacherLogout").addEventListener("click",logout);
