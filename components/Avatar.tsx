import Image from 'next/image';
import styles from '../styles/components/Avatar.module.css';

type Props = {
  src?: string | null;
  width?: number;
  height?: number;
};

const Avatar = ({ src, width = 40, height = 40 }: Props) => {
  return (
    <Image
      src={src ?? '/'}
      className={styles.img}
      alt="avatar"
      width={width}
      height={height}
    />
  );
};

export default Avatar;
