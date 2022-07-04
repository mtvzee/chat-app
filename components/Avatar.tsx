import Image from 'next/image';
import styles from '../styles/components/Avatar.module.css';

type Props = {
  src: string;
  width?: number;
  height?: number;
};

const Avatar = ({ src, width = 40, height = 40 }: Props) => {
  return <Image src={src} alt="avatar" width={width} height={height} />;
};

export default Avatar;
