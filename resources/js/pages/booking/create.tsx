import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    CircleAlert,
    Info,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { BookingStepIndicator } from '@/components/booking/booking-step-indicator';
import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import {
    formatRupiah,
    getRoomBySlug,
    roomTypeLabels,
    stayDurationOptions,
} from '@/data/rooms';

type BookingCreateProps = {
    slug: string;
};

type BookingForm = {
    fullName: string;
    email: string;
    whatsapp: string;
    startDate: string;
    duration: string;
    surveyDate: string;
    surveyTime: string;
    notes: string;
};

type BookingErrors = Partial<Record<keyof BookingForm, string>>;

type BookingConfirmation = BookingForm & {
    bookingNumber: string;
};

const initialForm: BookingForm = {
    fullName: '',
    email: '',
    whatsapp: '',
    startDate: '',
    duration: '',
    surveyDate: '',
    surveyTime: '',
    notes: '',
};

export default function BookingCreate({ slug }: BookingCreateProps) {
    const room = getRoomBySlug(slug);
    const [form, setForm] = useState<BookingForm>(initialForm);
    const [errors, setErrors] = useState<BookingErrors>({});
    const [confirmation, setConfirmation] =
        useState<BookingConfirmation | null>(null);
    const today = useMemo(() => getLocalDateInputValue(), []);

    if (!room || room.status !== 'available') {
        return (
            <>
                <Head title="Kamar Tidak Dapat Dipesan" />
                <main className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
                    <div className="max-w-xl text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#F3F7F1] text-[#4F6F52]">
                            <CircleAlert
                                className="size-8"
                                aria-hidden="true"
                            />
                        </span>
                        <h1 className="mt-5 text-3xl font-bold text-[#1F2A24] sm:text-4xl">
                            Kamar tidak dapat dipesan
                        </h1>
                        <p className="mt-4 leading-7 text-[#5F6B63]">
                            Unit tidak ditemukan atau sedang tidak berstatus
                            tersedia. Silakan pilih unit lain dari daftar kamar.
                        </p>
                        <Link
                            href="/kamar"
                            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white transition hover:bg-[#2F4F3E]"
                        >
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            Pilih Kamar Lain
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const selectedDuration = Number(form.duration) || 0;
    const estimatedCost = room.price * selectedDuration;

    const updateField = (field: keyof BookingForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateBookingForm(
            form,
            today,
            room.minimumStayMonths,
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            document
                .getElementById('booking-form-title')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

            return;
        }

        setErrors({});
        setConfirmation({
            ...form,
            bookingNumber: `BOOK-KOS-${String(room.id).padStart(4, '0')}`,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (confirmation) {
        return (
            <BookingSuccess
                room={room}
                confirmation={confirmation}
                estimatedCost={room.price * Number(confirmation.duration)}
            />
        );
    }

    return (
        <>
            <Head title={`Pesan ${room.name}`} />
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
                    <Link
                        href={`/kamar/${room.slug}`}
                        className="hover:text-[#4F6F52]"
                    >
                        {room.roomNumber}
                    </Link>
                    <ChevronRight className="size-4" aria-hidden="true" />
                    <span className="font-semibold text-[#2F4F3E]">Pesan</span>
                </nav>

                <div className="mb-7">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                        Simulasi Pemesanan
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-[#1F2A24] sm:text-4xl">
                        Lengkapi Data &amp; Jadwal Survey
                    </h1>
                    <p className="mt-3 max-w-2xl leading-7 text-[#5F6B63]">
                        Data pada tahap ini hanya disimpan sementara di browser
                        dan tidak dikirim ke database.
                    </p>
                </div>

                <BookingStepIndicator currentStep={2} />

                <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_380px]">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(79,111,82,0.07)] sm:p-7"
                    >
                        <div>
                            <h2
                                id="booking-form-title"
                                className="scroll-mt-24 text-2xl font-bold text-[#1F2A24]"
                            >
                                Data Pemesan
                            </h2>
                            <p className="mt-2 text-sm text-[#5F6B63]">
                                Pastikan informasi dapat dihubungi oleh tim
                                KosKita.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            <FormField
                                id="full-name"
                                label="Nama Lengkap"
                                error={errors.fullName}
                                className="sm:col-span-2"
                            >
                                <input
                                    id="full-name"
                                    type="text"
                                    value={form.fullName}
                                    onChange={(event) =>
                                        updateField(
                                            'fullName',
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="name"
                                    aria-invalid={Boolean(errors.fullName)}
                                    aria-describedby={
                                        errors.fullName
                                            ? 'full-name-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.fullName),
                                    )}
                                    placeholder="Contoh: Andi Pratama"
                                />
                            </FormField>
                            <FormField
                                id="email"
                                label="Email"
                                error={errors.email}
                            >
                                <input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        updateField('email', event.target.value)
                                    }
                                    autoComplete="email"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                        errors.email ? 'email-error' : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.email),
                                    )}
                                    placeholder="nama@email.com"
                                />
                            </FormField>
                            <FormField
                                id="whatsapp"
                                label="Nomor WhatsApp"
                                error={errors.whatsapp}
                            >
                                <input
                                    id="whatsapp"
                                    type="tel"
                                    value={form.whatsapp}
                                    onChange={(event) =>
                                        updateField(
                                            'whatsapp',
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="tel"
                                    aria-invalid={Boolean(errors.whatsapp)}
                                    aria-describedby={
                                        errors.whatsapp
                                            ? 'whatsapp-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.whatsapp),
                                    )}
                                    placeholder="08xxxxxxxxxx"
                                />
                            </FormField>
                            <FormField
                                id="start-date"
                                label="Tanggal Mulai Sewa"
                                error={errors.startDate}
                            >
                                <input
                                    id="start-date"
                                    type="date"
                                    min={today}
                                    value={form.startDate}
                                    onChange={(event) =>
                                        updateField(
                                            'startDate',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(errors.startDate)}
                                    aria-describedby={
                                        errors.startDate
                                            ? 'start-date-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.startDate),
                                    )}
                                />
                            </FormField>
                            <FormField
                                id="duration"
                                label="Durasi Sewa"
                                error={errors.duration}
                            >
                                <select
                                    id="duration"
                                    value={form.duration}
                                    onChange={(event) =>
                                        updateField(
                                            'duration',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(errors.duration)}
                                    aria-describedby={
                                        errors.duration
                                            ? 'duration-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.duration),
                                    )}
                                >
                                    <option value="">Pilih durasi</option>
                                    {stayDurationOptions
                                        .filter(
                                            (duration) =>
                                                duration >=
                                                room.minimumStayMonths,
                                        )
                                        .map((duration) => (
                                            <option
                                                key={duration}
                                                value={duration}
                                            >
                                                {duration} bulan
                                            </option>
                                        ))}
                                </select>
                            </FormField>
                        </div>

                        <div className="my-7 border-t border-slate-100" />

                        <div>
                            <h2 className="text-2xl font-bold text-[#1F2A24]">
                                Jadwal Survey
                            </h2>
                            <p className="mt-2 text-sm text-[#5F6B63]">
                                Pilih waktu yang nyaman untuk melihat kamar.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            <FormField
                                id="survey-date"
                                label="Tanggal Survey"
                                error={errors.surveyDate}
                            >
                                <input
                                    id="survey-date"
                                    type="date"
                                    min={today}
                                    value={form.surveyDate}
                                    onChange={(event) =>
                                        updateField(
                                            'surveyDate',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(errors.surveyDate)}
                                    aria-describedby={
                                        errors.surveyDate
                                            ? 'survey-date-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.surveyDate),
                                    )}
                                />
                            </FormField>
                            <FormField
                                id="survey-time"
                                label="Jam Survey"
                                error={errors.surveyTime}
                            >
                                <select
                                    id="survey-time"
                                    value={form.surveyTime}
                                    onChange={(event) =>
                                        updateField(
                                            'surveyTime',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(errors.surveyTime)}
                                    aria-describedby={
                                        errors.surveyTime
                                            ? 'survey-time-error'
                                            : undefined
                                    }
                                    className={inputClass(
                                        Boolean(errors.surveyTime),
                                    )}
                                >
                                    <option value="">Pilih jam</option>
                                    <option value="09:00">09.00 WIB</option>
                                    <option value="11:00">11.00 WIB</option>
                                    <option value="14:00">14.00 WIB</option>
                                    <option value="16:00">16.00 WIB</option>
                                </select>
                            </FormField>
                            <FormField
                                id="notes"
                                label="Catatan (opsional)"
                                error={errors.notes}
                                className="sm:col-span-2"
                            >
                                <textarea
                                    id="notes"
                                    rows={4}
                                    value={form.notes}
                                    onChange={(event) =>
                                        updateField('notes', event.target.value)
                                    }
                                    className={`${inputClass(false)} resize-y py-3`}
                                    placeholder="Tuliskan kebutuhan atau pertanyaan tambahan..."
                                />
                            </FormField>
                        </div>

                        <button
                            type="submit"
                            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white shadow-md shadow-[#4F6F52]/20 transition hover:bg-[#2F4F3E] sm:w-auto"
                        >
                            Buat Permintaan Booking
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </button>
                    </form>

                    <BookingSummary
                        roomName={room.name}
                        roomType={roomTypeLabels[room.type]}
                        price={room.price}
                        duration={selectedDuration}
                        estimatedCost={estimatedCost}
                    />
                </div>
            </main>
        </>
    );
}

type BookingSuccessProps = {
    room: NonNullable<ReturnType<typeof getRoomBySlug>>;
    confirmation: BookingConfirmation;
    estimatedCost: number;
};

function BookingSuccess({
    room,
    confirmation,
    estimatedCost,
}: BookingSuccessProps) {
    return (
        <>
            <Head title="Booking Berhasil Dibuat" />
            <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
                <BookingStepIndicator currentStep={3} />

                <section className="mt-7 rounded-3xl border border-emerald-200 bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.1)] sm:p-8">
                    <div className="text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <CheckCircle2
                                className="size-9"
                                aria-hidden="true"
                            />
                        </span>
                        <p className="mt-5 text-xs font-bold tracking-[0.16em] text-emerald-700 uppercase">
                            {confirmation.bookingNumber}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-[#1F2A24] sm:text-4xl">
                            Permintaan booking berhasil dibuat
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#5F6B63]">
                            Simulasi booking sudah selesai. Berikut ringkasan
                            data yang kamu masukkan.
                        </p>
                    </div>

                    <dl className="mx-auto mt-8 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-[#DDE8D8] bg-[#DDE8D8] sm:grid-cols-2">
                        <SummaryItem
                            label="Nomor kamar"
                            value={room.roomNumber}
                        />
                        <SummaryItem
                            label="Tipe kamar"
                            value={roomTypeLabels[room.type]}
                        />
                        <SummaryItem
                            label="Nama pemesan"
                            value={confirmation.fullName}
                        />
                        <SummaryItem
                            label="Nomor WhatsApp"
                            value={confirmation.whatsapp}
                        />
                        <SummaryItem
                            label="Tanggal mulai"
                            value={formatDate(confirmation.startDate)}
                        />
                        <SummaryItem
                            label="Durasi"
                            value={`${confirmation.duration} bulan`}
                        />
                        <SummaryItem
                            label="Jadwal survey"
                            value={`${formatDate(confirmation.surveyDate)}, ${confirmation.surveyTime} WIB`}
                        />
                        <SummaryItem
                            label="Estimasi biaya"
                            value={formatRupiah(estimatedCost)}
                        />
                    </dl>

                    <div className="mx-auto mt-6 flex max-w-3xl gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        <Info
                            className="mt-0.5 size-5 shrink-0"
                            aria-hidden="true"
                        />
                        Data ini masih berupa simulasi dan belum tersimpan
                        secara permanen. Tidak ada pembayaran atau data kartu
                        yang diproses.
                    </div>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#DDE8D8] px-6 text-sm font-bold text-[#4F6F52] transition hover:border-[#4F6F52] hover:bg-[#F3F7F1]"
                        >
                            Kembali ke Beranda
                        </Link>
                        <Link
                            href="/kamar"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white transition hover:bg-[#2F4F3E]"
                        >
                            Lihat Kamar Lain
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}

type BookingSummaryProps = {
    roomName: string;
    roomType: string;
    price: number;
    duration: number;
    estimatedCost: number;
};

function BookingSummary({
    roomName,
    roomType,
    price,
    duration,
    estimatedCost,
}: BookingSummaryProps) {
    return (
        <aside className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.12)] sm:p-6 lg:sticky lg:top-24">
            <p className="text-xs font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                Ringkasan Booking
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#1F2A24]">
                {roomName}
            </h2>
            <p className="mt-1 text-sm font-semibold text-[#5F6B63]">
                {roomType}
            </p>
            <RoomStatusBadge status="available" className="mt-4" />

            <dl className="mt-6 space-y-4 border-y border-slate-100 py-5">
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-[#5F6B63]">Harga per bulan</dt>
                    <dd className="text-sm font-bold text-[#1F2A24]">
                        {formatRupiah(price)}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-[#5F6B63]">Durasi</dt>
                    <dd className="text-sm font-bold text-[#1F2A24]">
                        {duration ? `${duration} bulan` : 'Belum dipilih'}
                    </dd>
                </div>
                <div className="flex items-end justify-between gap-4">
                    <dt className="text-sm text-[#5F6B63]">Estimasi</dt>
                    <dd className="text-xl font-bold text-[#4F6F52]">
                        {duration ? formatRupiah(estimatedCost) : '—'}
                    </dd>
                </div>
            </dl>
            <div className="mt-5 flex gap-3 text-xs leading-5 text-[#5F6B63]">
                <Info
                    className="mt-0.5 size-4 shrink-0 text-[#4F6F52]"
                    aria-hidden="true"
                />
                Estimasi hanya simulasi dan belum termasuk listrik atau biaya
                tambahan lain.
            </div>
        </aside>
    );
}

type FormFieldProps = {
    id: string;
    label: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
};

function FormField({ id, label, error, className, children }: FormFieldProps) {
    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-bold text-[#2F4F3E]"
            >
                {label}
            </label>
            {children}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-2 text-xs font-semibold text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

type SummaryItemProps = {
    label: string;
    value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
    return (
        <div className="bg-white p-4 sm:p-5">
            <dt className="text-xs font-semibold text-[#5F6B63]">{label}</dt>
            <dd className="mt-1 text-sm font-bold text-[#1F2A24]">{value}</dd>
        </div>
    );
}

function inputClass(hasError: boolean): string {
    return `min-h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium text-[#1F2A24] outline-none transition placeholder:text-slate-400 ${
        hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-slate-200 focus:border-[#4F6F52] focus:ring-2 focus:ring-[#DDE8D8]'
    }`;
}

function validateBookingForm(
    form: BookingForm,
    today: string,
    minimumStayMonths: number,
): BookingErrors {
    const errors: BookingErrors = {};
    const whatsappDigits = form.whatsapp.replace(/\D/g, '');
    const duration = Number(form.duration);

    if (form.fullName.trim().length < 3) {
        errors.fullName = 'Nama lengkap wajib diisi minimal 3 karakter.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Masukkan alamat email yang valid.';
    }

    if (whatsappDigits.length < 9 || whatsappDigits.length > 15) {
        errors.whatsapp = 'Masukkan nomor WhatsApp yang valid.';
    }

    if (!form.startDate) {
        errors.startDate = 'Tanggal mulai sewa wajib dipilih.';
    } else if (form.startDate < today) {
        errors.startDate = 'Tanggal mulai tidak boleh sebelum hari ini.';
    }

    if (!duration || duration < minimumStayMonths) {
        errors.duration = `Pilih durasi minimal ${minimumStayMonths} bulan.`;
    }

    if (!form.surveyDate) {
        errors.surveyDate = 'Tanggal survey wajib dipilih.';
    } else if (form.surveyDate < today) {
        errors.surveyDate = 'Tanggal survey tidak boleh sebelum hari ini.';
    }

    if (!form.surveyTime) {
        errors.surveyTime = 'Jam survey wajib dipilih.';
    }

    return errors;
}

function getLocalDateInputValue(): string {
    const now = new Date();
    const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60_000,
    );

    return localDate.toISOString().slice(0, 10);
}

function formatDate(date: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
}
