import Friend from "./Friend";

export default function FriendsList({
  friendList,
  selectedFriend,
  onSelection,
}) {
  return (
    <ul>
      {friendList.map((item, index) => (
        <Friend
          item={item}
          key={index}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}
