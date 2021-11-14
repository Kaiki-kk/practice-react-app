import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./UseMessage";
import { useLoginUser } from "./UseLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((result) => {
          if (result.data) {
            const isAdmin = result.data.id === 10 ? true : false;
            setLoginUser({ ...result.data, isAdmin });
            history.push("/home");
            showMessage({ title: "ログインしました", status: "success" });
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
          }
        })
        .catch(() =>
          showMessage({ title: "ユーザーが見つかりません", status: "error" })
        )
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );

  return { login, loading };
};
