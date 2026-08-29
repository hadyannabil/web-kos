export const BOOKING_DP_PERCENTAGE = 30;
export const CUSTOM_DURATION_VALUE = 'custom';
export const MIN_BOOKING_DURATION_MONTHS = 1;
export const MAX_BOOKING_DURATION_MONTHS = 12;

export type PaymentPlan = 'monthly' | 'upfront';
export type PaymentMethod = 'qris' | 'bank-transfer';

export type BookingDetails = {
    bookingNumber: string;
    fullName: string;
    email: string;
    whatsapp: string;
    startDate: string;
    durationMonths: number;
    paymentPlan: PaymentPlan;
    surveyDate: string;
    surveyTime: string;
    notes: string;
};

export type BookingCalculation = {
    durationMonths: number;
    monthlyPrice: number;
    totalContract: number;
    bookingDp: number;
    paymentPlan: PaymentPlan;
    firstMonthRemaining: number;
    upfrontRemaining: number;
    remainingPayment: number;
    followingMonthsCount: number;
};

export const paymentPlanLabels: Record<PaymentPlan, string> = {
    monthly: 'Bayar Bulanan',
    upfront: 'Bayar Lunas di Muka',
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
    qris: 'QRIS',
    'bank-transfer': 'Transfer Bank',
};

export function resolveDurationMonths(
    durationSelection: string,
    customDuration: string,
): number | null {
    const rawDuration =
        durationSelection === CUSTOM_DURATION_VALUE
            ? customDuration.trim()
            : durationSelection;

    if (!/^\d+$/.test(rawDuration)) {
        return null;
    }

    const durationMonths = Number(rawDuration);

    if (
        !Number.isInteger(durationMonths) ||
        durationMonths < MIN_BOOKING_DURATION_MONTHS ||
        durationMonths > MAX_BOOKING_DURATION_MONTHS
    ) {
        return null;
    }

    return durationMonths;
}

export function calculateBookingSummary({
    monthlyPrice,
    durationMonths,
    paymentPlan,
}: {
    monthlyPrice: number;
    durationMonths: number;
    paymentPlan: PaymentPlan;
}): BookingCalculation {
    const totalContract = monthlyPrice * durationMonths;
    const bookingDp = Math.round(monthlyPrice * (BOOKING_DP_PERCENTAGE / 100));
    const firstMonthRemaining = Math.max(monthlyPrice - bookingDp, 0);
    const upfrontRemaining = Math.max(totalContract - bookingDp, 0);

    return {
        durationMonths,
        monthlyPrice,
        totalContract,
        bookingDp,
        paymentPlan,
        firstMonthRemaining,
        upfrontRemaining,
        remainingPayment:
            paymentPlan === 'monthly' ? firstMonthRemaining : upfrontRemaining,
        followingMonthsCount: Math.max(durationMonths - 1, 0),
    };
}

export function formatBookingDate(date: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
}
