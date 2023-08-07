import { useAllUsers } from "./hooks/useAllUsers"; // カスタムフック (ロジック部分) をインポート
import { UserCard } from "./components/UserCard";
import "./styles.css";

export default function App() {
  // カスタムフック useAllUsersは関数なので、関数を実行して返り値 (関数、state) を受け取る
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  // [データ取得]ボタンを押したら カスタムフック useAllUsers関数内でさらに定義した getUsers関数を実行
  const onClickFetchUser = () => getUsers();

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {/* 三項演算子の中にさらに三項演算子を書いている。error=true の場合、失敗のメッセージを表示。
      error=false、かつ loading=trueの場合に 「Loading...」 を表示
      error=false かつ loading=falseの場合に、user一覧を表示 */}
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
