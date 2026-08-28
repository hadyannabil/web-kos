export const roomTypes = ['standard', 'premium', 'deluxe'] as const;
export const roomStatuses = ['available', 'occupied', 'maintenance'] as const;
export const roomSortOptions = [
    'price-asc',
    'price-desc',
    'room-number',
] as const;
export const stayDurationOptions = [1, 3, 6, 12] as const;

export type RoomType = (typeof roomTypes)[number];
export type RoomStatus = (typeof roomStatuses)[number];
export type RoomSort = (typeof roomSortOptions)[number];

export interface Room {
    id: number;
    slug: string;
    roomNumber: string;
    type: RoomType;
    name: string;
    description: string;
    price: number;
    status: RoomStatus;
    floor: number;
    size: string;
    minimumStayMonths: number;
    facilities: string[];
    image: string;
    images?: string[];
    availableFrom?: string;
}

export type RoomFilters = {
    type?: RoomType;
    maxPrice?: number;
    duration?: number;
    status: RoomStatus | 'all';
    facility?: string;
    sort: RoomSort;
};

export const roomTypeLabels: Record<RoomType, string> = {
    standard: 'Standard',
    premium: 'Premium',
    deluxe: 'Deluxe',
};

export const roomStatusLabels: Record<RoomStatus, string> = {
    available: 'Tersedia',
    occupied: 'Terisi',
    maintenance: 'Perawatan',
};

const existingRoomImages = {
    standard:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=82',
    premium:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=82',
    deluxe: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=82',
};

// These are the same placeholder photographs used by the homepage room cards.
// Replace each set with local /images/rooms/... assets when real photos arrive.
export const roomImageSets: Record<RoomType, string[]> = {
    standard: [
        existingRoomImages.standard,
        existingRoomImages.premium,
        existingRoomImages.deluxe,
    ],
    premium: [
        existingRoomImages.premium,
        existingRoomImages.deluxe,
        existingRoomImages.standard,
    ],
    deluxe: [
        existingRoomImages.deluxe,
        existingRoomImages.standard,
        existingRoomImages.premium,
    ],
};

const facilitiesByType: Record<RoomType, string[]> = {
    standard: ['Kasur & lemari', 'Meja belajar', 'Kipas angin', 'WiFi'],
    premium: ['Kasur & lemari', 'Meja belajar', 'AC', 'WiFi'],
    deluxe: [
        'Kasur & lemari',
        'Meja belajar',
        'AC',
        'WiFi',
        'Kamar mandi dalam',
    ],
};

const descriptions: Record<RoomType, string> = {
    standard:
        'Kamar fungsional dan nyaman untuk kebutuhan harian, dilengkapi area istirahat dan belajar yang tertata rapi.',
    premium:
        'Kamar ber-AC dengan ruang yang lega, cocok untuk penghuni yang mengutamakan kenyamanan dan produktivitas.',
    deluxe: 'Kamar paling luas dengan kamar mandi dalam dan fasilitas lengkap untuk pengalaman tinggal yang lebih privat.',
};

function makeRoom(
    id: number,
    roomNumber: string,
    type: RoomType,
    price: number,
    status: RoomStatus,
    floor: number,
    availableFrom?: string,
): Room {
    const images = roomImageSets[type];
    const size =
        type === 'standard'
            ? '3 × 4 m'
            : type === 'premium'
              ? '3.5 × 4 m'
              : '4 × 5 m';

    return {
        id,
        slug: roomNumber.toLowerCase(),
        roomNumber,
        type,
        name: `Kamar ${roomNumber}`,
        description: descriptions[type],
        price,
        status,
        floor,
        size,
        minimumStayMonths: type === 'standard' ? 1 : 3,
        facilities: facilitiesByType[type],
        image: images[0],
        images,
        availableFrom,
    };
}

export const rooms: Room[] = [
    makeRoom(1, 'A-101', 'standard', 1_250_000, 'available', 1),
    makeRoom(2, 'A-102', 'standard', 1_250_000, 'occupied', 1, '2026-10-01'),
    makeRoom(3, 'A-103', 'standard', 1_300_000, 'available', 1),
    makeRoom(4, 'A-104', 'standard', 1_300_000, 'available', 1),
    makeRoom(5, 'B-201', 'premium', 1_750_000, 'available', 2),
    makeRoom(6, 'B-202', 'premium', 1_750_000, 'occupied', 2, '2026-11-01'),
    makeRoom(7, 'B-203', 'premium', 1_850_000, 'available', 2),
    makeRoom(8, 'B-204', 'premium', 1_850_000, 'available', 2),
    makeRoom(9, 'C-301', 'deluxe', 2_250_000, 'available', 3),
    makeRoom(10, 'C-302', 'deluxe', 2_250_000, 'maintenance', 3, '2026-09-15'),
    makeRoom(11, 'C-303', 'deluxe', 2_350_000, 'available', 3),
    makeRoom(12, 'C-304', 'deluxe', 2_350_000, 'available', 3),
];

export const roomFacilities = Array.from(
    new Set(rooms.flatMap((room) => room.facilities)),
).sort((first, second) => first.localeCompare(second));

export const defaultRoomFilters: RoomFilters = {
    status: 'available',
    sort: 'price-asc',
};

export function parseRoomFilters(url: string): RoomFilters {
    const query = url.includes('?') ? url.slice(url.indexOf('?') + 1) : '';
    const params = new URLSearchParams(query.split('#')[0]);
    const type = params.get('type');
    const maxPrice = parsePositiveInteger(params.get('maxPrice'));
    const duration = parsePositiveInteger(params.get('duration'));
    const status = params.get('status');
    const facility = params.get('facility');
    const sort = params.get('sort');

    return {
        type: isRoomType(type) ? type : undefined,
        maxPrice,
        duration:
            duration && stayDurationOptions.includes(duration as 1 | 3 | 6 | 12)
                ? duration
                : undefined,
        status: status === 'all' || isRoomStatus(status) ? status : 'available',
        facility:
            facility && roomFacilities.includes(facility)
                ? facility
                : undefined,
        sort: isRoomSort(sort) ? sort : 'price-asc',
    };
}

export function buildRoomQuery(filters: RoomFilters): string {
    const params = new URLSearchParams();

    if (filters.type) {
        params.set('type', filters.type);
    }

    if (filters.maxPrice) {
        params.set('maxPrice', String(filters.maxPrice));
    }

    if (filters.duration) {
        params.set('duration', String(filters.duration));
    }

    if (filters.status !== 'available') {
        params.set('status', filters.status);
    }

    if (filters.facility) {
        params.set('facility', filters.facility);
    }

    if (filters.sort !== 'price-asc') {
        params.set('sort', filters.sort);
    }

    return params.toString();
}

export function filterAndSortRooms(
    sourceRooms: Room[],
    filters: RoomFilters,
): Room[] {
    const filtered = sourceRooms.filter((room) => {
        if (filters.status !== 'all' && room.status !== filters.status) {
            return false;
        }

        if (filters.type && room.type !== filters.type) {
            return false;
        }

        if (filters.maxPrice && room.price > filters.maxPrice) {
            return false;
        }

        if (filters.duration && room.minimumStayMonths > filters.duration) {
            return false;
        }

        if (filters.facility && !room.facilities.includes(filters.facility)) {
            return false;
        }

        return true;
    });

    return filtered.sort((first, second) => {
        if (filters.sort === 'price-desc') {
            return second.price - first.price;
        }

        if (filters.sort === 'room-number') {
            return first.roomNumber.localeCompare(second.roomNumber);
        }

        return first.price - second.price;
    });
}

export function getRoomBySlug(slug: string): Room | undefined {
    return rooms.find((room) => room.slug === slug.toLowerCase());
}

export function getFeaturedRooms(): Room[] {
    return roomTypes
        .map((type) =>
            rooms.find(
                (room) => room.type === type && room.status === 'available',
            ),
        )
        .filter((room): room is Room => Boolean(room));
}

export function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

function parsePositiveInteger(value: string | null): number | undefined {
    if (!value || !/^\d+$/.test(value)) {
        return undefined;
    }

    const parsed = Number(value);

    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function isRoomType(value: string | null): value is RoomType {
    return roomTypes.includes(value as RoomType);
}

function isRoomStatus(value: string | null): value is RoomStatus {
    return roomStatuses.includes(value as RoomStatus);
}

function isRoomSort(value: string | null): value is RoomSort {
    return roomSortOptions.includes(value as RoomSort);
}
