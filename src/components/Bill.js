import { useState } from "react";
import Button from "./Button";

export default function Bill({ friend, onSplitBill }) {
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
