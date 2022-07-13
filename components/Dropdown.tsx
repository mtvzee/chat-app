import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  theme,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';
import { auth } from '../firebase';

const Dropdown = () => {
  return (
    <Menu>
      <MenuButton as={Button} bg="transparent">
        <BsThreeDotsVertical size="20" />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<BiTrash size="25" />} fontSize="1.25rem">
          友達を削除
        </MenuItem>
        <MenuItem
          icon={<TbLogout size="25" />}
          fontSize="1.25rem"
          onClick={() => signOut(auth)}
        >
          ログアウト
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
