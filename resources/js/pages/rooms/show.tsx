import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CalendarRange,
    Check,
    ChevronRight,
    CircleAlert,
    Ruler,
} from 'lucide-react';
import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import { formatRupiah, getRoomBySlug, roomTypeLabels } from '@/data/rooms';

type RoomShowProps = {
    slug: string;
};

export default function RoomShow({ slug }: RoomShowProps) {
    const room = getRoomBySlug(slug);

    if (!room) {
        return (
            <>
                <Head title="Kamar Tidak Ditemukan" />
                <main className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
                    <div className="max-w-xl text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#F3F7F1] text-[#4F6F52]">
                            <CircleAlert
                                className="size-8"
                                aria-hidden="true"
                            />
                        </span>
                        <p className="mt-5 text-sm font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                            Kamar tidak ditemukan
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-[#1F2A24] sm:text-4xl">
                            Unit yang kamu cari tidak tersedia
                        </h1>
                        <p className="mt-4 leading-7 text-[#5F6B63]">
                            Slug kamar mungkin tidak valid atau unit sudah tidak
                            ada di data simulasi kami.
                        </p>
                        <Link
                            href="/kamar"
                            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white transition hover:bg-[#2F4F3E]"
                        >
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            Kembali ke Daftar Kamar
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const galleryImages = room.images ?? [room.image];
    const isAvailable = room.status === 'available';

    return (
        <>
            <Head title={room.name}>
                <meta name="description" content={room.description} />
            </Head>
            <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#5F6B63]"
                >
                    <Link href="/" className="hover:text-[#4F6F52]">
                        Beranda
                    </Link>
                    <ChevronRight className="size-4" aria-hidden="true" />
                    <Link href="/kamar" className="hover:text-[#4F6F52]">
                        Kamar
                    </Link>
                    <ChevronRight className="size-4" aria-hidden="true" />
                    <span className="font-semibold text-[#2F4F3E]">
                        {room.roomNumber}
                    </span>
                </nav>

                <section aria-label={`Galeri ${room.name}`}>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr] lg:grid-rows-2">
                        <img
                            src={galleryImages[0]}
                            alt={`Tampilan utama ${room.name}`}
                            className="aspect-[16/10] h-full w-full rounded-3xl object-cover sm:col-span-2 lg:col-span-1 lg:row-span-2"
                        />
                        {galleryImages.slice(1, 3).map((image, index) => (
                            <img
                                key={image}
                                src={image}
                                alt={`Tampilan ${index + 2} ${room.name}`}
                                className="aspect-[16/10] h-full w-full rounded-2xl object-cover lg:aspect-auto"
                            />
                        ))}
                    </div>
                </section>

                <div className="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_380px]">
                    <article className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(79,111,82,0.07)] sm:p-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-[#F3F7F1] px-3 py-1 text-xs font-bold text-[#4F6F52]">
                                        {roomTypeLabels[room.type]}
                                    </span>
                                    <RoomStatusBadge status={room.status} />
                                </div>
                                <h1 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#1F2A24] sm:text-4xl">
                                    {room.name}
                                </h1>
                            </div>
                            <p className="text-2xl font-bold text-[#4F6F52] sm:text-right">
                                {formatRupiah(room.price)}
                                <span className="block text-xs font-medium text-[#5F6B63]">
                                    per bulan
                                </span>
                            </p>
                        </div>

                        <div className="mt-7 grid gap-3 sm:grid-cols-3">
                            <InfoItem
                                icon={Building2}
                                label="Lantai"
                                value={String(room.floor)}
                            />
                            <InfoItem
                                icon={Ruler}
                                label="Ukuran"
                                value={room.size}
                            />
                            <InfoItem
                                icon={CalendarRange}
                                label="Minimum sewa"
                                value={`${room.minimumStayMonths} bulan`}
                            />
                        </div>

                        <section
                            aria-labelledby="description-title"
                            className="mt-8"
                        >
                            <h2
                                id="description-title"
                                className="text-xl font-bold text-[#1F2A24]"
                            >
                                Tentang Kamar
                            </h2>
                            <p className="mt-3 leading-7 text-[#5F6B63]">
                                {room.description}
                            </p>
                        </section>

                        <section
                            aria-labelledby="facilities-detail-title"
                            className="mt-8"
                        >
                            <h2
                                id="facilities-detail-title"
                                className="text-xl font-bold text-[#1F2A24]"
                            >
                                Fasilitas Lengkap
                            </h2>
                            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {room.facilities.map((facility) => (
                                    <li
                                        key={facility}
                                        className="flex items-center gap-3 rounded-xl bg-[#F3F7F1] px-4 py-3 text-sm font-semibold text-[#2F4F3E]"
                                    >
                                        <span className="grid size-6 place-items-center rounded-full bg-[#DDE8D8] text-[#4F6F52]">
                                            <Check
                                                className="size-3.5"
                                                strokeWidth={3}
                                                aria-hidden="true"
                                            />
                                        </span>
                                        {facility}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                            <CircleAlert
                                className="mt-0.5 size-5 shrink-0"
                                aria-hidden="true"
                            />
                            Harga dan ketersediaan pada halaman ini masih berupa
                            simulasi. Biaya listrik dan biaya tambahan lain
                            belum diperhitungkan.
                        </div>
                    </article>

                    <aside className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.12)] sm:p-6 lg:sticky lg:top-24">
                        <p className="text-xs font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                            Ringkasan Pilihan
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-[#1F2A24]">
                            {room.name}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-[#5F6B63]">
                            {roomTypeLabels[room.type]}
                        </p>
                        <div className="my-5 border-y border-slate-100 py-5">
                            <p className="text-3xl font-bold text-[#4F6F52]">
                                {formatRupiah(room.price)}
                            </p>
                            <p className="mt-1 text-xs text-[#5F6B63]">
                                per bulan
                            </p>
                        </div>
                        <RoomStatusBadge status={room.status} />
                        {isAvailable ? (
                            <Link
                                href={`/kamar/${room.slug}/pesan`}
                                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white shadow-md shadow-[#4F6F52]/20 transition hover:bg-[#2F4F3E]"
                            >
                                Pilih Kamar
                                <ArrowRight
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            </Link>
                        ) : (
                            <span
                                aria-disabled="true"
                                className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-100 px-6 text-sm font-bold text-slate-400"
                            >
                                Kamar Belum Tersedia
                            </span>
                        )}
                        <Link
                            href="/kamar"
                            className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm font-bold text-[#2F4F3E] hover:text-[#4F6F52]"
                        >
                            Lihat Kamar Lain
                        </Link>
                    </aside>
                </div>
            </main>
        </>
    );
}

type InfoItemProps = {
    icon: typeof Building2;
    label: string;
    value: string;
};

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
    return (
        <div className="rounded-2xl bg-[#F3F7F1] p-4">
            <Icon className="size-5 text-[#4F6F52]" aria-hidden="true" />
            <span className="mt-3 block text-xs text-[#5F6B63]">{label}</span>
            <strong className="mt-1 block text-sm text-[#1F2A24]">
                {value}
            </strong>
        </div>
    );
}
