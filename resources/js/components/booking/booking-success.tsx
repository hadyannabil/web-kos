import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Info } from 'lucide-react';
import { BookingStepIndicator } from '@/components/booking/booking-step-indicator';
import {
    formatBookingDate,
    paymentMethodLabels,
    paymentPlanLabels,
} from '@/data/booking';
import type {
    BookingCalculation,
    BookingDetails,
    PaymentMethod,
} from '@/data/booking';
import { formatRupiah, roomTypeLabels } from '@/data/rooms';
import type { Room } from '@/data/rooms';

type BookingSuccessProps = {
    room: Room;
    booking: BookingDetails;
    calculation: BookingCalculation;
    paymentMethod: PaymentMethod;
};

export function BookingSuccess({
    room,
    booking,
    calculation,
    paymentMethod,
}: BookingSuccessProps) {
    return (
        <>
            <Head title="Booking Berhasil Dibuat" />
            <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
                <BookingStepIndicator currentStep={3} allCompleted />

                <section className="mt-7 rounded-3xl border border-emerald-200 bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.1)] sm:p-8">
                    <div className="text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <CheckCircle2
                                className="size-9"
                                aria-hidden="true"
                            />
                        </span>
                        <p className="mt-5 text-xs font-bold tracking-[0.16em] text-emerald-700 uppercase">
                            {booking.bookingNumber}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-[#1F2A24] sm:text-4xl">
                            Permintaan booking berhasil dibuat
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#5F6B63]">
                            Pembayaran DP dan booking berhasil disimulasikan.
                        </p>
                    </div>

                    <dl className="mx-auto mt-8 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-[#DDE8D8] bg-[#DDE8D8] sm:grid-cols-2 lg:grid-cols-3">
                        <SummaryItem
                            label="Kode booking"
                            value={booking.bookingNumber}
                        />
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
                            value={booking.fullName}
                        />
                        <SummaryItem
                            label="Nomor WhatsApp"
                            value={booking.whatsapp}
                        />
                        <SummaryItem
                            label="Tanggal mulai"
                            value={formatBookingDate(booking.startDate)}
                        />
                        <SummaryItem
                            label="Durasi"
                            value={`${booking.durationMonths} bulan`}
                        />
                        <SummaryItem
                            label="Jadwal survey"
                            value={`${formatBookingDate(booking.surveyDate)}, ${booking.surveyTime} WIB`}
                        />
                        <SummaryItem
                            label="Harga per bulan"
                            value={formatRupiah(calculation.monthlyPrice)}
                        />
                        <SummaryItem
                            label="Total kontrak"
                            value={formatRupiah(calculation.totalContract)}
                        />
                        <SummaryItem
                            label="Skema pembayaran"
                            value={paymentPlanLabels[booking.paymentPlan]}
                        />
                        <SummaryItem
                            label="DP yang dikonfirmasi"
                            value={formatRupiah(calculation.bookingDp)}
                        />
                        <SummaryItem
                            label="Metode pembayaran"
                            value={paymentMethodLabels[paymentMethod]}
                        />
                        <SummaryItem
                            label={
                                booking.paymentPlan === 'monthly'
                                    ? 'Sisa bulan pertama'
                                    : 'Sisa pelunasan'
                            }
                            value={formatRupiah(calculation.remainingPayment)}
                        />
                        {booking.paymentPlan === 'monthly' && (
                            <SummaryItem
                                label="Pembayaran berikutnya"
                                value={
                                    calculation.followingMonthsCount > 0
                                        ? `${formatRupiah(calculation.monthlyPrice)} / bulan × ${calculation.followingMonthsCount}`
                                        : 'Tidak ada'
                                }
                            />
                        )}
                    </dl>

                    <div className="mx-auto mt-6 flex max-w-4xl gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        <Info
                            className="mt-0.5 size-5 shrink-0"
                            aria-hidden="true"
                        />
                        Data ini masih berupa simulasi dan belum tersimpan
                        secara permanen. Tidak ada transaksi keuangan nyata yang
                        dilakukan.
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

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="min-w-0 bg-white p-4 sm:p-5">
            <dt className="text-xs font-semibold text-[#5F6B63]">{label}</dt>
            <dd className="mt-1 text-sm font-bold break-words text-[#1F2A24]">
                {value}
            </dd>
        </div>
    );
}
