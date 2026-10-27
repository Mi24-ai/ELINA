import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  UserCheck, 
  Play, 
  CheckCircle2, 
  Clock, 
  Star, 
  Calendar, 
  MessageSquare, 
  Download, 
  Sparkles,
  ChevronRight,
  Send
} from 'lucide-react';
import { AcademySubTab, Course, Mentor } from '../types';

interface AcademyViewProps {
  initialSubTab?: AcademySubTab;
  courses: Course[];
  mentors: Mentor[];
  onOpenChatWithMentor: (mentorName: string) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  initialSubTab = 'courses',
  courses,
  mentors,
  onOpenChatWithMentor
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AcademySubTab>(initialSubTab);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  // Mentor Booking Consultation Modal State
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [consultationTopic, setConsultationTopic] = useState('');
  const [consultationDate, setConsultationDate] = useState('2026-09-24');
  const [consultationType, setConsultationType] = useState('Daring (Google Meet)');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Interactive Quiz state inside Course Modal
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingMentor(null);
      setConsultationTopic('');
    }, 3500);
  };

  const handleQuizSubmit = (selectedIndex: number) => {
    setQuizAnswer(selectedIndex);
    if (selectedIndex === 1) {
      setQuizFeedback('Jawaban Benar! Kisaran pH 9.0 - 10.5 sangat penting untuk menjaga ketersediaan karbonat terlarut dan mencegah kontaminasi alga liar.');
    } else {
      setQuizFeedback('Kurang tepat. Spirulina adalah mikroalga obligat alkali yang membutuhkan pH tinggi (9.0 - 10.5) untuk tumbuh optimal.');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">ELINA Academy</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Pelatihan budidaya dan manajemen usaha digital, konsultasi dengan mentor dan ahli spirulina, serta onboarding bagi pembudidaya baru
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-academy-courses"
              onClick={() => setActiveSubTab('courses')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'courses'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Modul Pelatihan ({courses.length})
            </button>

            <button
              id="subtab-academy-progress"
              onClick={() => setActiveSubTab('progress')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'progress'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Learning Progress & Sertifikat
            </button>

            <button
              id="subtab-academy-mentors"
              onClick={() => setActiveSubTab('mentors')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'mentors'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Konsultasi Mentor ({mentors.length})
            </button>
          </div>
        </div>
      </div>

      {/* ======================= SUBTAB 1: COURSES ======================= */}
      {activeSubTab === 'courses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      course.level === 'Pemula'
                        ? 'bg-emerald-100 text-emerald-800'
                        : course.level === 'Menengah'
                        ? 'bg-teal-100 text-teal-800'
                        : course.level === 'Lanjutan'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating} ({course.enrolledStudents} peserta)
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mt-3 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.durationHours} Jam Materi
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {course.modulesCount} Video & Modul
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Progres Belajar</span>
                      <span>{course.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          course.progressPercent === 100 ? 'bg-emerald-600' : 'bg-teal-500'
                        }`}
                        style={{ width: `${course.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">Instruktur</span>
                    <span className="font-bold text-slate-800">{course.instructor}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setQuizAnswer(null);
                      setQuizFeedback(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Buka Materi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: PROGRESS & CERTIFICATES ======================= */}
      {activeSubTab === 'progress' && (
        <div className="space-y-8">
          <div className="bg-linear-to-r from-emerald-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-700/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Kompetensi Budidaya Terverifikasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Sertifikat Kelulusan ELINA Academy</h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                Menyelesaikan modul budidaya dan lulus kuis evaluasi memberikan Anda sertifikat kompetensi resmi 
                yang diakui oleh Asosiasi Mikroalga Indonesia dan Koperasi ELINA untuk jaminan akses pasar ekspor.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="text-xs text-emerald-200 block">Total Jam Belajar Selesai</span>
              <span className="text-3xl font-black text-white mt-1 block">14.5 Jam</span>
              <span className="text-[11px] text-emerald-300 font-medium mt-1 block">1 Sertifikat Diterbitkan</span>
            </div>
          </div>

          {/* Certificate Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-1">
                  SERTIFIKAT KOMPETENSI #ELN-CERT-2026-0429
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Sertifikasi Ahli Budidaya Spirulina Skala Kolam Raceway Terpal
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Diberikan kepada: <strong>Ahmad Fauzi (Mitra Pembudidaya Bantul)</strong> • Tanggal Kelulusan: 15 Agustus 2026
                </p>
              </div>

              <button
                onClick={() => alert('Mengunduh Sertifikat Resmi (PDF Digital Terenkripsi)...')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" /> Unduh Sertifikat (PDF)
              </button>
            </div>

            {/* Curriculum Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Biologi & Bibit Murni</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Lulus Ujian Teori & Praktik Isolasi Bibit</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Formulasi Nutrisi Zarrouk</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Efisiensi Biaya Bahan Kimia & Salinitas</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Higienitas Pascapanen Mesh 300</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Bebas Residu & Standar Keamanan BPOM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 3: MENTORS ======================= */}
      {activeSubTab === 'mentors' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Konsultasi Pakar & Pendampingan Budidaya</h3>
            <p className="text-xs text-slate-500">
              Konsultasikan kendala kolam berbusa, penurunan kadar protein, formula nutrisi murah, ataupun izin BPOM bersama para mentor ahli.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div 
                key={mentor.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{mentor.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{mentor.title}</p>
                      <p className="text-[11px] text-slate-500">{mentor.institution}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {mentor.bio}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {mentor.specialization.map((spec, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Jadwal Tersedia:</span>
                      <span className="font-medium text-slate-800">{mentor.availableDays}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Biaya:</span>
                      <span className="font-bold text-emerald-700">{mentor.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setBookingMentor(mentor)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Jadwalkan Konsultasi
                  </button>
                  <button
                    onClick={() => onOpenChatWithMentor(mentor.name)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs transition-colors cursor-pointer"
                    title="Kirim Pesan Cepat"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Detail & Mini-Quiz Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                  Silabus Kursus • {selectedCourse.level}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedCourse.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Instruktur: {selectedCourse.instructor} ({selectedCourse.role})</p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Placeholder Simulation */}
            <div className="aspect-16/9 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Play className="w-6 h-6 text-white ml-0.5" />
              </div>
              <span className="text-xs font-semibold mt-3 text-emerald-200">
                Putar Video Modul: Keseimbangan pH & Bikarbonat Kolam
              </span>
              <span className="text-[10px] text-slate-400 mt-1">Durasi: 14 menit 30 detik</span>
            </div>

            {/* Topics List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Topik Bahasan Modul:</h4>
              <div className="space-y-1.5 text-xs">
                {selectedCourse.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Quiz */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2.5 text-xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Kuis Mini Evaluasi Pemahaman
              </span>
              <p className="font-bold text-slate-900">
                Berapakah kisaran pH air kolam yang paling ideal untuk budidaya mikroalga Spirulina platensis?
              </p>
              <div className="space-y-1.5">
                {[
                  'A. pH 6.0 - 7.0 (Netral)',
                  'B. pH 9.0 - 10.5 (Alkali Tinggi)',
                  'C. pH 4.5 - 5.5 (Asam Ringan)'
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizSubmit(idx)}
                    className={`w-full text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                      quizAnswer === idx
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizFeedback && (
                <div className={`p-2.5 rounded-lg text-xs font-medium mt-2 ${
                  quizAnswer === 1 ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {quizFeedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Consultation Modal */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Jadwalkan Konsultasi</h3>
              <button onClick={() => setBookingMentor(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Konsultasi Berhasil Dijadwalkan!</h4>
                <p className="text-emerald-800">
                  Tautan Google Meet dan pengingat jadwal telah dikirimkan ke WhatsApp Anda dan diteruskan ke {bookingMentor.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                  <img src={bookingMentor.avatar} alt={bookingMentor.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span className="font-bold text-slate-900 block">{bookingMentor.name}</span>
                    <span className="text-slate-500 text-[11px]">{bookingMentor.title}</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Topik Permasalahan Budidaya</label>
                  <textarea
                    rows={3}
                    required
                    value={consultationTopic}
                    onChange={(e) => setConsultationTopic(e.target.value)}
                    placeholder="Contoh: Kolam Raceway Beta mengalami kenaikan pH di atas 10.8 dan timbul buih tipis pada kincir. Mohon rekomendasi tindakan darurat..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Pilih Tanggal</label>
                    <input
                      type="date"
                      required
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Format Sesi</label>
                    <select
                      value={consultationType}
                      onChange={(e) => setConsultationType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    >
                      <option value="Daring (Google Meet)">Daring (Google Meet)</option>
                      <option value="Kunjungan Lapangan">Kunjungan Lapangan</option>
                      <option value="Panggilan Telepon">Panggilan Telepon</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingMentor(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Konfirmasi Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
