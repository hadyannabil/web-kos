export type Testimonial = {
    name: string;
    role: string;
    quote: string;
    initials: string;
};

// Temporary photography is kept in one place so it can later be replaced with
// local files such as /images/home/hero-residence.jpg without changing layouts.
export const homeImages = {
    hero: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85',
    cta: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
};

export const testimonials: Testimonial[] = [
    {
        name: 'Andi Pratama',
        role: 'Mahasiswa UPN',
        quote: 'Tempatnya nyaman, bersih, dan tenang. WiFi cepat bikin belajar jadi lebih fokus.',
        initials: 'AP',
    },
    {
        name: 'Siti Aisyah',
        role: 'Mahasiswi UGM',
        quote: 'Lokasinya strategis, dekat kampus dan minimarket. Stafnya juga sangat responsif.',
        initials: 'SA',
    },
    {
        name: 'Rizky Maulana',
        role: 'Karyawan Swasta',
        quote: 'Keamanan 24 jam bikin tenang. Fasilitas lengkap dengan harga yang terjangkau.',
        initials: 'RM',
    },
];

export const faqs = [
    {
        question: 'Apakah harga kamar sudah termasuk listrik?',
        answer: 'Biaya sewa sudah termasuk air dan WiFi. Pemakaian listrik dihitung terpisah sesuai meter tiap kamar.',
    },
    {
        question: 'Apakah saya bisa melakukan survey terlebih dahulu?',
        answer: 'Tentu. Pilih jadwal survey melalui WhatsApp dan tim kami akan mendampingi Anda melihat kamar yang tersedia.',
    },
    {
        question: 'Berapa minimal durasi sewa?',
        answer: 'Minimal durasi sewa adalah tiga bulan. Tersedia harga khusus untuk masa sewa enam dan dua belas bulan.',
    },
];
