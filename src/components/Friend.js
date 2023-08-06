import Button from "./Button";

export default function Friend({ item, selectedFriend, onSelection }) {
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
