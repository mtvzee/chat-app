import { signOut } from 'firebase/auth';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { auth } from '../firebase';

const Dropdown = () => {
  
  return (
    <div onClick={() => signOut(auth)}>
      <BsThreeDotsVertical />
    </div>
  );
};

export default Dropdown;
