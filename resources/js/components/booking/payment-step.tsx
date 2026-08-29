import { Head } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Copy,
    Info,
    QrCode,
} from 'lucide-react';
import { useState } from 'react';
import { BookingStepIndicator } from '@/components/booking/booking-step-indicator';
import {
    BOOKING_DP_PERCENTAGE,
    calculateBookingSummary,
    formatBookingDate,
    paymentPlanLabels,
} from '@/data/booking';
import type { BookingDetails, PaymentMethod } from '@/data/booking';
import { formatRupiah, roomTypeLabels } from '@/data/rooms';
import type { Room } from '@/data/rooms';

type PaymentStepProps = {
    room: Room;
    booking: BookingDetails;
    onBack: () => void;
    onComplete: (paymentMethod: PaymentMethod) => void;
};

const SIMULATED_BANK_ACCOUNT = '1234567890';

const paymentMethods: Array<{
    value: PaymentMethod;
    label: string;
    description: string;
    icon: typeof QrCode;
}> = [
    {
        value: 'qris',
        label: 'QRIS',
        description: 'Pindai QR prototype untuk simulasi pembayaran DP.',
        icon: QrCode,
    },
    {
        value: 'bank-transfer',
        label: 'Transfer Bank',
        description: 'Gunakan informasi rekening simulasi yang tersedia.',
        icon: Building2,
    },
];

export function PaymentStep({
    room,
    booking,
    onBack,
    onComplete,
}: PaymentStepProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
    const [hasConfirmedPayment, setHasConfirmedPayment] = useState(false);
    const [hasCopiedAccount, setHasCopiedAccount] = useState(false);
    const calculation = calculateBookingSummary({
        monthlyPrice: room.price,
        durationMonths: booking.durationMonths,
        paymentPlan: booking.paymentPlan,
    });
    const canConfirm = Boolean(paymentMethod && hasConfirmedPayment);

    const copyAccountNumber = async () => {
        try {
            await navigator.clipboard.writeText(SIMULATED_BANK_ACCOUNT);
            setHasCopiedAccount(true);
        } catch {
            setHasCopiedAccount(false);
        }
    };

    const confirmPayment = () => {
        if (paymentMethod && hasConfirmedPayment) {
            onComplete(paymentMethod);
        }
    };

    return (
        <>
            <Head title={`Pembayaran DP ${room.name}`} />
            <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
                <div className="mb-7">
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                        Menunggu Pembayaran
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#1F2A24] sm:text-4xl">
                        Bayar DP &amp; Konfirmasi
                    </h1>
                    <p className="mt-3 max-w-2xl leading-7 text-[#5F6B63]">
                        Selesaikan pembayaran DP untuk mengamankan kamar
                        pilihanmu.
                    </p>
                </div>

                <BookingStepIndicator currentStep={3} />

                <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_400px]">
                    <section className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(79,111,82,0.07)] sm:p-7">
                        <div className="rounded-2xl bg-[#F3F7F1] p-5 text-center sm:p-6">
                            <p className="text-sm font-semibold text-[#5F6B63]">
                                Jumlah DP yang harus dibayar
                            </p>
                            <p className="mt-2 text-3xl font-bold text-[#4F6F52] sm:text-4xl">
                                {formatRupiah(calculation.bookingDp)}
                            </p>
                            <p className="mt-2 text-xs text-[#5F6B63]">
                                {BOOKING_DP_PERCENTAGE}% dari harga sewa satu
                                bulan
                            </p>
                        </div>

                        <div className="mt-5 rounded-2xl border border-[#DDE8D8] p-4">
                            <p className="text-xs font-bold tracking-[0.12em] text-[#4F6F52] uppercase">
                                {paymentPlanLabels[booking.paymentPlan]}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#5F6B63]">
                                Setelah DP,{' '}
                                {booking.paymentPlan === 'monthly'
                                    ? `sisa pembayaran bulan pertama ${formatRupiah(calculation.firstMonthRemaining)}.`
                                    : `sisa pelunasan ${formatRupiah(calculation.upfrontRemaining)}.`}
                            </p>
                        </div>

                        <fieldset className="mt-7">
                            <legend className="text-xl font-bold text-[#1F2A24]">
                                Metode Pembayaran DP
                            </legend>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    const isSelected =
                                        paymentMethod === method.value;

                                    return (
                                        <label
                                            key={method.value}
                                            className={`cursor-pointer rounded-2xl border p-4 transition ${
                                                isSelected
                                                    ? 'border-[#4F6F52] bg-[#F3F7F1] ring-2 ring-[#DDE8D8]'
                                                    : 'border-slate-200 hover:border-[#4F6F52]'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value={method.value}
                                                checked={isSelected}
                                                onChange={() => {
                                                    setPaymentMethod(
                                                        method.value,
                                                    );
                                                    setHasConfirmedPayment(
                                                        false,
                                                    );
                                                }}
                                                className="sr-only"
                                            />
                                            <Icon
                                                className="size-6 text-[#4F6F52]"
                                                aria-hidden="true"
                                            />
                                            <strong className="mt-3 block text-sm text-[#1F2A24]">
                                                {method.label}
                                            </strong>
                                            <span className="mt-1 block text-xs leading-5 text-[#5F6B63]">
                                                {method.description}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {paymentMethod === 'qris' && (
                            <div className="mt-5 rounded-2xl border border-[#DDE8D8] bg-[#F3F7F1] p-5 text-center">
                                <p className="font-bold text-[#1F2A24]">
                                    QRIS Simulasi
                                </p>
                                <div className="mx-auto mt-4 grid aspect-square w-44 place-items-center rounded-2xl border-8 border-white bg-[#1F2A24] text-white shadow-sm">
                                    <QrCode
                                        className="size-28"
                                        strokeWidth={1.5}
                                        aria-label="Placeholder QRIS simulasi"
                                    />
                                </div>
                                <p className="mt-4 text-xl font-bold text-[#4F6F52]">
                                    {formatRupiah(calculation.bookingDp)}
                                </p>
                                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#5F6B63]">
                                    QR ini hanya digunakan untuk prototype dan
                                    tidak dapat menerima pembayaran sungguhan.
                                </p>
                            </div>
                        )}

                        {paymentMethod === 'bank-transfer' && (
                            <div className="mt-5 rounded-2xl border border-[#DDE8D8] bg-[#F3F7F1] p-5">
                                <p className="font-bold text-[#1F2A24]">
                                    Rekening Simulasi
                                </p>
                                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                                    <PaymentInfo label="Bank" value="BCA" />
                                    <PaymentInfo
                                        label="Nomor Rekening"
                                        value={SIMULATED_BANK_ACCOUNT}
                                    />
                                    <PaymentInfo
                                        label="Atas Nama"
                                        value="KosKita Residence"
                                    />
                                </dl>
                                <button
                                    type="button"
                                    onClick={copyAccountNumber}
                                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4F6F52] px-4 text-sm font-bold text-[#4F6F52] transition hover:bg-white"
                                >
                                    {hasCopiedAccount ? (
                                        <CheckCircle2
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Copy
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {hasCopiedAccount
                                        ? 'Nomor Rekening Disalin'
                                        : 'Salin Nomor Rekening'}
                                </button>
                                <p className="mt-3 text-xs leading-5 text-[#5F6B63]">
                                    Informasi rekening ini sepenuhnya dummy dan
                                    tidak dapat menerima transfer nyata.
                                </p>
                            </div>
                        )}
                    </section>

                    <PaymentSummary
                        room={room}
                        booking={booking}
                        calculation={calculation}
                    />

                    <div className="w-full max-w-full min-w-0 rounded-3xl border border-[#DDE8D8] bg-white p-5 sm:p-6 lg:col-start-1">
                        <label className="flex min-w-0 cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={hasConfirmedPayment}
                                onChange={(event) =>
                                    setHasConfirmedPayment(event.target.checked)
                                }
                                disabled={!paymentMethod}
                                className="mt-0.5 size-5 shrink-0 accent-[#4F6F52] disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <span className="min-w-0 text-sm leading-6 font-semibold break-words text-[#2F4F3E]">
                                Saya telah melakukan pembayaran DP sesuai
                                nominal di atas.
                            </span>
                        </label>

                        <div className="mt-5 flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:justify-between">
                            <button
                                type="button"
                                onClick={onBack}
                                className="inline-flex min-h-12 w-full max-w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-[#DDE8D8] px-5 text-center text-sm font-bold text-[#2F4F3E] transition hover:border-[#4F6F52] hover:bg-[#F3F7F1] lg:w-auto"
                            >
                                <ArrowLeft
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                Kembali ke Data Pemesan
                            </button>
                            <button
                                type="button"
                                onClick={confirmPayment}
                                disabled={!canConfirm}
                                className="inline-flex min-h-12 w-full max-w-full min-w-0 items-center justify-center rounded-xl bg-[#4F6F52] px-6 text-center text-sm font-bold text-white transition hover:bg-[#2F4F3E] disabled:cursor-not-allowed disabled:bg-slate-300 lg:w-auto"
                            >
                                Konfirmasi Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

function PaymentSummary({
    room,
    booking,
    calculation,
}: {
    room: Room;
    booking: BookingDetails;
    calculation: ReturnType<typeof calculateBookingSummary>;
}) {
    return (
        <aside className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.1)] sm:p-6 lg:sticky lg:top-20">
            <p className="text-xs font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                Ringkasan Pembayaran
            </p>
            <dl className="mt-5 space-y-3 border-b border-slate-100 pb-5">
                <PaymentSummaryRow label="Kamar" value={room.name} />
                <PaymentSummaryRow
                    label="Tipe kamar"
                    value={roomTypeLabels[room.type]}
                />
                <PaymentSummaryRow
                    label="Harga per bulan"
                    value={formatRupiah(room.price)}
                />
                <PaymentSummaryRow
                    label="Durasi"
                    value={`${booking.durationMonths} bulan`}
                />
                <PaymentSummaryRow
                    label="Total kontrak"
                    value={formatRupiah(calculation.totalContract)}
                />
                <PaymentSummaryRow
                    label="Skema"
                    value={paymentPlanLabels[booking.paymentPlan]}
                />
                <PaymentSummaryRow
                    label="DP"
                    value={formatRupiah(calculation.bookingDp)}
                    accent
                />
                <PaymentSummaryRow
                    label={
                        booking.paymentPlan === 'monthly'
                            ? 'Sisa bulan pertama'
                            : 'Sisa pelunasan'
                    }
                    value={formatRupiah(calculation.remainingPayment)}
                />
            </dl>

            <dl className="mt-5 space-y-3">
                <PaymentSummaryRow
                    label="Nama pemesan"
                    value={booking.fullName}
                />
                <PaymentSummaryRow label="WhatsApp" value={booking.whatsapp} />
                <PaymentSummaryRow
                    label="Tanggal mulai"
                    value={formatBookingDate(booking.startDate)}
                />
                <PaymentSummaryRow
                    label="Jadwal survey"
                    value={`${formatBookingDate(booking.surveyDate)}, ${booking.surveyTime} WIB`}
                />
            </dl>

            <PaymentSchedulePreview
                calculation={calculation}
                paymentPlan={booking.paymentPlan}
            />
        </aside>
    );
}

function PaymentSchedulePreview({
    calculation,
    paymentPlan,
}: {
    calculation: ReturnType<typeof calculateBookingSummary>;
    paymentPlan: BookingDetails['paymentPlan'];
}) {
    return (
        <div className="mt-5 rounded-2xl bg-[#F3F7F1] p-4">
            <div className="flex gap-2">
                <Info
                    className="mt-0.5 size-4 shrink-0 text-[#4F6F52]"
                    aria-hidden="true"
                />
                <div className="min-w-0 text-xs leading-5 text-[#5F6B63]">
                    <p className="font-bold text-[#2F4F3E]">
                        {paymentPlan === 'monthly'
                            ? 'Jadwal Pembayaran'
                            : 'Ringkasan Pelunasan'}
                    </p>
                    {paymentPlan === 'monthly' ? (
                        <>
                            <p className="mt-2">
                                Bulan pertama: sisa{' '}
                                {formatRupiah(calculation.firstMonthRemaining)}{' '}
                                setelah DP.
                            </p>
                            {calculation.followingMonthsCount > 0 && (
                                <p className="mt-1">
                                    Bulan berikutnya:{' '}
                                    {formatRupiah(calculation.monthlyPrice)} ×{' '}
                                    {calculation.followingMonthsCount} bulan.
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="mt-2">
                            Total {formatRupiah(calculation.totalContract)}, DP{' '}
                            {formatRupiah(calculation.bookingDp)}, sisa{' '}
                            {formatRupiah(calculation.upfrontRemaining)}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function PaymentInfo({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs text-[#5F6B63]">{label}</dt>
            <dd className="mt-1 font-bold break-words text-[#1F2A24]">
                {value}
            </dd>
        </div>
    );
}

function PaymentSummaryRow({
    label,
    value,
    accent = false,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-3">
            <dt className="text-xs text-[#5F6B63]">{label}</dt>
            <dd
                className={`max-w-[60%] text-right text-xs font-bold break-words ${accent ? 'text-[#4F6F52]' : 'text-[#1F2A24]'}`}
            >
                {value}
            </dd>
        </div>
    );
}
