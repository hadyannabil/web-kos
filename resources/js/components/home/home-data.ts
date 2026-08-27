export type Room = {
    name: string;
    image: string;
    imageAlt: string;
    features: string[];
    price: string;
};

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

export const rooms: Room[] = [
    {
        name: 'Kamar Standard',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Contoh interior kamar Standard KosKita Residence',
        features: ['Kasur & lemari', 'Meja belajar', 'Kipas angin'],
        price: 'Rp 1.250.000',
    },
    {
        name: 'Kamar Premium',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Contoh interior kamar Premium KosKita Residence',
        features: ['Kasur & lemari', 'Meja belajar', 'AC'],
        price: 'Rp 1.750.000',
    },
    {
        name: 'Kamar Deluxe',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Contoh interior kamar Deluxe KosKita Residence',
        features: ['Kasur & lemari', 'AC', 'Kamar mandi dalam'],
        price: 'Rp 2.250.000',
    },
];

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
