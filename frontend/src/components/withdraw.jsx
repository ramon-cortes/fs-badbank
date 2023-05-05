import CardDW from "./carddw";

export default function Withdraw({ status, setStatus }) {
  return (
    <div className="card-wrapper">
      <CardDW action='Withdraw' status={status} setStatus={setStatus} />
    </div>
  );
}