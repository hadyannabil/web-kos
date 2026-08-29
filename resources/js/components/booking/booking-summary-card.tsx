import { Info } from 'lucide-react';
import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import { BOOKING_DP_PERCENTAGE, paymentPlanLabels } from '@/data/booking';
import type { BookingCalculation, PaymentPlan } from '@/data/booking';
import { formatRupiah } from '@/data/rooms';

type BookingSummaryCardProps = {
    roomName: string;
    roomType: string;
    calculation: BookingCalculation;
    paymentPlan: PaymentPlan | '';
};

export function BookingSummaryCard({
    roomName,
    roomType,
    calculation,
    paymentPlan,
}: BookingSummaryCardProps) {
    return (
        <aside className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_18px_50px_rgba(79,111,82,0.12)] sm:p-6 lg:sticky lg:top-20">
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
                <SummaryRow
                    label="Harga per bulan"
                    value={formatRupiah(calculation.monthlyPrice)}
                />
                <SummaryRow
                    label="Durasi"
                    value={
                        calculation.durationMonths
                            ? `${calculation.durationMonths} bulan`
                            : 'Belum dipilih'
                    }
                />
                <SummaryRow
                    label="Skema pembayaran"
                    value={
                        paymentPlan
                            ? paymentPlanLabels[paymentPlan]
                            : 'Belum dipilih'
                    }
                />
                <SummaryRow
                    label="Total periode sewa"
                    value={
                        calculation.durationMonths
                            ? formatRupiah(calculation.totalContract)
                            : '—'
                    }
                />
                <SummaryRow
                    label={`DP booking (${BOOKING_DP_PERCENTAGE}%)`}
                    value={formatRupiah(calculation.bookingDp)}
                    accent
                />
                {paymentPlan && calculation.durationMonths > 0 && (
                    <SummaryRow
                        label={
                            paymentPlan === 'monthly'
                                ? 'Sisa bulan pertama'
                                : 'Sisa pelunasan'
                        }
                        value={formatRupiah(calculation.remainingPayment)}
                    />
                )}
            </dl>

            <div className="mt-5 flex gap-3 text-xs leading-5 text-[#5F6B63]">
                <Info
                    className="mt-0.5 size-4 shrink-0 text-[#4F6F52]"
                    aria-hidden="true"
                />
                DP merupakan bagian dari pembayaran sewa, bukan biaya tambahan.
            </div>
        </aside>
    );
}

type SummaryRowProps = {
    label: string;
    value: string;
    accent?: boolean;
};

function SummaryRow({ label, value, accent = false }: SummaryRowProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <dt className="text-sm text-[#5F6B63]">{label}</dt>
            <dd
                className={`text-right text-sm font-bold ${accent ? 'text-[#4F6F52]' : 'text-[#1F2A24]'}`}
            >
                {value}
            </dd>
        </div>
    );
}
