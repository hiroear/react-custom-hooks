import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile"; // 実際に表示させる userの型情報
import { User } from "../types/api/user"; // jsonplaceholderから取得する userの型情報

// 全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false); // 関数実行時一旦初期化
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 取得した jsonplaceholderの userデータを、さらに <UserProfile>の型に成形 → setUserProfilesに入れる
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`, // 名前(ニックネーム) で表示
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}` // city,suite,street の情報を結合させて address を表示
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true); // catchでエラーが起こったら errorを trueに変更
      })
      .finally(() => {
        setLoading(false); // finally: thenや catchで起こる事関係なく、常に最後に実行する
      });
  };

  /* オブジェクトを返す方法と 配列を返す方法がある
    useAllUsers関数の返り値 (getUsers関数、それぞれの state)  */
  return { getUsers, userProfiles, loading, error };
};
