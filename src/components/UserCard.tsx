import { FC } from "react";
import { UserProfile } from "../types/userProfile"; // 実際に表示させる userの型情報

type Props = {
  // userという名前で、別ファイルに定義した UserProfile(userの型情報)をまるごと受け取る
  user: UserProfile;
};

export const UserCard: FC<Props> = (props) => {
  const { user } = props;

  const style = {
    border: "solid 1px #ccc",
    borderRadius: "8px",
    padding: "0 16px",
    margin: "8px"
  };

  return (
    <div style={style}>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>メール</dt>
        <dd>{user.email}</dd>
        <dt>住所　</dt>
        <dd>{user.address}</dd>
      </dl>
    </div>
  );
};
