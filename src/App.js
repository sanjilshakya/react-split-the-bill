import { useState } from "react";
import Button from "./components/Button";
import AddFriendForm from "./components/AddFriendForm";
import FriendsList from "./components/FriendList";
import Bill from "./components/Bill";

const initialFriends = [
  {
    id: 118836,
    name: "Noah",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Luz",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Daniel",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function toggleAdd() {
    setIsAdd((isAdd) => !isAdd);
  }

  function handleSelection(friend) {
    isAdd && setIsAdd(false);
    setSelectedFriend((previousFriend) =>
      previousFriend?.id === friend.id ? null : friend
    );
  }

  function handleAddFriend(newFriend) {
    setFriendList((friends) => [...friends, newFriend]);
    setIsAdd((isAdd) => !isAdd);
  }

  function handleBillSplit(balance) {
    setFriendList(
      friendList.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendList={friendList}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {isAdd && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={toggleAdd}>{isAdd ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && (
        <Bill friend={selectedFriend} onSplitBill={handleBillSplit} />
      )}
    </div>
  );
}
