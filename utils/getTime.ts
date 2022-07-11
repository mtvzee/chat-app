import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const getTime = (
  timestamp: Timestamp | undefined,
  displayFormat: string
) => {
  if (timestamp != null) {
    return dayjs(
      new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    ).format(displayFormat);
  }
};
