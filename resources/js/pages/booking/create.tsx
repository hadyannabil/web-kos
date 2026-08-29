import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, ChevronRight, CircleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { BookingStepIndicator } from '@/components/booking/booking-step-indicator';
import { BookingSuccess } from '@/components/booking/booking-success';
import { BookingSummaryCard } from '@/components/booking/booking-summary-card';
import { PaymentPlanSelector } from '@/components/booking/payment-plan-selector';
import { PaymentStep } from '@/components/booking/payment-step';
import {
    CUSTOM_DURATION_VALUE,
    MAX_BOOKING_DURATION_MONTHS,
    MIN_BOOKING_DURATION_MONTHS,
    calculateBookingSummary,
    resolveDurationMonths,
} from '@/data/booking';
import type {
    BookingDetails,
    PaymentMethod,
    PaymentPlan,
} from '@/data/booking';
import {
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
    customDuration: string;
    paymentPlan: PaymentPlan | '';
    surveyDate: string;
    surveyTime: string;
    notes: string;
};

type BookingErrors = Partial<Record<keyof BookingForm, string>>;
type BookingStage = 'details' | 'payment' | 'success';

const initialForm: BookingForm = {
    fullName: '',
    email: '',
    whatsapp: '',
    startDate: '',
    duration: '',
    customDuration: '',
    paymentPlan: '',
    surveyDate: '',
    surveyTime: '',
    notes: '',
};

export default function BookingCreate({ slug }: BookingCreateProps) {
    const room = getRoomBySlug(slug);
    const [form, setForm] = useState<BookingForm>(initialForm);
    const [errors, setErrors] = useState<BookingErrors>({});
    const [stage, setStage] = useState<BookingStage>('details');
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [completedPaymentMethod, setCompletedPaymentMethod] =
        useState<PaymentMethod | null>(null);
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

    const durationMonths =
        resolveDurationMonths(form.duration, form.customDuration) ?? 0;
    const previewPaymentPlan = form.paymentPlan || 'monthly';
    const previewCalculation = calculateBookingSummary({
        monthlyPrice: room.price,
        durationMonths,
        paymentPlan: previewPaymentPlan,
    });

    const updateField = <Field extends keyof BookingForm>(
        field: Field,
        value: BookingForm[Field],
    ) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({
            ...current,
            [field]: undefined,
            ...(field === 'duration' ? { customDuration: undefined } : {}),
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateBookingForm(
            form,
            today,
            room.minimumStayMonths,
        );
        const normalizedDuration = resolveDurationMonths(
            form.duration,
            form.customDuration,
        );

        if (
            Object.keys(validationErrors).length > 0 ||
            normalizedDuration === null ||
            !form.paymentPlan
        ) {
            setErrors(validationErrors);
            document
                .getElementById('booking-form-title')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

            return;
        }

        setErrors({});
        setBooking({
            bookingNumber: `BOOK-KOS-${String(room.id).padStart(4, '0')}`,
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            whatsapp: form.whatsapp.trim(),
            startDate: form.startDate,
            durationMonths: normalizedDuration,
            paymentPlan: form.paymentPlan,
            surveyDate: form.surveyDate,
            surveyTime: form.surveyTime,
            notes: form.notes.trim(),
        });
        setCompletedPaymentMethod(null);
        setStage('payment');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (stage === 'payment' && booking) {
        return (
            <PaymentStep
                room={room}
                booking={booking}
                onBack={() => {
                    setStage('details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onComplete={(paymentMethod) => {
                    setCompletedPaymentMethod(paymentMethod);
                    setStage('success');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            />
        );
    }

    if (stage === 'success' && booking && completedPaymentMethod) {
        return (
            <BookingSuccess
                room={room}
                booking={booking}
                calculation={calculateBookingSummary({
                    monthlyPrice: room.price,
                    durationMonths: booking.durationMonths,
                    paymentPlan: booking.paymentPlan,
                })}
                paymentMethod={completedPaymentMethod}
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
                                className="scroll-mt-20 text-2xl font-bold text-[#1F2A24]"
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
                                    <option value={CUSTOM_DURATION_VALUE}>
                                        Durasi lainnya...
                                    </option>
                                </select>
                            </FormField>

                            {form.duration === CUSTOM_DURATION_VALUE && (
                                <FormField
                                    id="custom-duration"
                                    label="Durasi lainnya"
                                    error={errors.customDuration}
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <input
                                            id="custom-duration"
                                            type="number"
                                            min={MIN_BOOKING_DURATION_MONTHS}
                                            max={MAX_BOOKING_DURATION_MONTHS}
                                            step="1"
                                            inputMode="numeric"
                                            value={form.customDuration}
                                            onChange={(event) =>
                                                updateField(
                                                    'customDuration',
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={Boolean(
                                                errors.customDuration,
                                            )}
                                            aria-describedby={
                                                errors.customDuration
                                                    ? 'custom-duration-error'
                                                    : undefined
                                            }
                                            className={`${inputClass(Boolean(errors.customDuration))} min-w-0 flex-1`}
                                            placeholder="4"
                                        />
                                        <span className="shrink-0 text-sm font-semibold text-[#5F6B63]">
                                            bulan
                                        </span>
                                    </div>
                                </FormField>
                            )}
                        </div>

                        {durationMonths > 0 && (
                            <>
                                <div className="my-7 border-t border-slate-100" />
                                <PaymentPlanSelector
                                    value={form.paymentPlan}
                                    monthlyPrice={room.price}
                                    durationMonths={durationMonths}
                                    error={errors.paymentPlan}
                                    onChange={(paymentPlan) =>
                                        updateField('paymentPlan', paymentPlan)
                                    }
                                />
                            </>
                        )}

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
                            Lanjut ke Pembayaran
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </button>
                    </form>

                    <BookingSummaryCard
                        roomName={room.name}
                        roomType={roomTypeLabels[room.type]}
                        calculation={previewCalculation}
                        paymentPlan={form.paymentPlan}
                    />
                </div>
            </main>
        </>
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
    const durationMonths = resolveDurationMonths(
        form.duration,
        form.customDuration,
    );

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

    if (!form.duration) {
        errors.duration = 'Durasi sewa wajib dipilih.';
    } else if (form.duration === CUSTOM_DURATION_VALUE) {
        if (!form.customDuration.trim()) {
            errors.customDuration = 'Durasi lainnya wajib diisi.';
        } else if (!/^\d+$/.test(form.customDuration.trim())) {
            errors.customDuration = 'Durasi harus berupa bilangan bulat.';
        } else if (durationMonths === null) {
            errors.customDuration = `Durasi harus antara ${MIN_BOOKING_DURATION_MONTHS}–${MAX_BOOKING_DURATION_MONTHS} bulan.`;
        }
    } else if (durationMonths === null) {
        errors.duration = 'Pilihan durasi tidak valid.';
    }

    if (durationMonths !== null && durationMonths < minimumStayMonths) {
        const message = `Durasi minimum kamar ini adalah ${minimumStayMonths} bulan.`;

        if (form.duration === CUSTOM_DURATION_VALUE) {
            errors.customDuration = message;
        } else {
            errors.duration = message;
        }
    }

    if (durationMonths !== null && !form.paymentPlan) {
        errors.paymentPlan = 'Pilih salah satu skema pembayaran.';
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
