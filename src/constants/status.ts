import type { Status } from '../types/application';

export const statusLabels: Record<Status, string> = {
  sent: 'Göndərildi',
  interview: 'Müsahibə',
  offer: 'Təklif',
  rejected: 'Rədd',
};

export const statusColors: Record<Status, string> = {
  sent: 'blue',
  interview: 'orange',
  offer: 'green',
  rejected: 'red',
};

export const statusOptions: { value: Status; label: string }[] = [
  { value: 'sent', label: statusLabels.sent },
  { value: 'interview', label: statusLabels.interview },
  { value: 'offer', label: statusLabels.offer },
  { value: 'rejected', label: statusLabels.rejected },
];