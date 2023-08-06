import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
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
        {isAdd && <Form onAddFriend={handleAddFriend} />}
        <Button onClick={toggleAdd}>{isAdd ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && (
        <Bill friend={selectedFriend} onSplitBill={handleBillSplit} />
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FriendsList({ friendList, selectedFriend, onSelection }) {
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

function Friend({ item, selectedFriend, onSelection }) {
  return (
    <li className={item.id === selectedFriend?.id ? "selected" : ""}>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p className={item.balance < 0 ? "red" : item.balance > 0 ? "green" : ""}>
        {item.balance < 0
          ? `${item.name} owes you $${Math.abs(item.balance)}`
          : item.balance > 0
          ? `You owe ${item.name} $${item.balance}`
          : `You and ${item.name} are even`}
      </p>
      <Button onClick={() => onSelection(item)}>
        {selectedFriend?.id === item.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Form({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?u=${id}`, id, balance: 0 };
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Bill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : "";
  const [whoPays, setWhoPays] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !yourExpense) return;
    const balance = whoPays === "you" ? -friendExpense : yourExpense;
    onSplitBill(balance);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {friend.name}</h2>
      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(+e.target.value > bill ? yourExpense : +e.target.value)
        }
      />
      <label>{friend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled />
      <label>Who is paying the bill</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="you">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
