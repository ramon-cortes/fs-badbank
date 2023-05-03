import CardDW from "./carddw";

export default function Withdraw({ status, setStatus }) {
  return (
    <>
      <CardDW action='Withdraw' status={status} setStatus={setStatus} />
    </>
  );
}