import React, { memo, useCallback, VFC } from "react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/UseAllUsers";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/UseSelectUser";
import { useLoginUser } from "../../hooks/UseLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { selectedUser, onSelectUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users]
  );

  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users?.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imgUrl={"https://source.unsplash.com/random"}
                userName={user.name}
                fullName={user.username}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        onClose={onClose}
        isOpen={isOpen}
        isAdmin={loginUser.isAdmin}
        user={selectedUser}
      />
    </>
  );
});
